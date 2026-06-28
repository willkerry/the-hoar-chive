/**
 * Computes "related articles" for every story in the archive and writes the
 * result to a JSON file that the Astro site imports at build time.
 *
 * This is run BY HAND, once, on your machine:
 *
 *     npx tsx scripts/related-articles.ts
 *
 * It is NOT part of the Astro build. The build only ever reads the JSON file
 * this produces (src/data/related.json). Nothing in the site imports this
 * script or the embedding model, so the build stays fast and has no extra
 * dependencies at runtime.
 *
 * How it works, in plain terms:
 *   1. Read every article out of src/data/out.json.
 *   2. Turn each article's title + body into a short block of clean text
 *      (HTML and image junk removed).
 *   3. Ask a local text-embedding model to turn each block into a list of
 *      1024 numbers (a "vector") that captures what the article is about.
 *      No internet API, no key — the model runs on this machine's CPU.
 *   4. Compare every article against every other one by how similar their
 *      vectors are, and keep the four most similar for each.
 *   5. Write a slug -> [{ slug, score }, ...] map to JSON.
 *
 * Re-running it is reproducible: the model version is pinned (see REVISION),
 * so the same input gives the same output.
 */

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { pipeline } from "@huggingface/transformers";
import articlesData from "../src/data/out.json" with { type: "json" };

// --- Configuration -------------------------------------------------------

// The embedding model. mxbai-embed-large-v1 is a large, high-quality model
// (1024 numbers per article) published in the ONNX format Transformers.js
// needs. It runs comfortably on a fast CPU and, on this archive, gave the most
// on-topic matches of the models tried (clearly beating the smaller bge-base).
// We pin REVISION to an exact commit so a re-run downloads the identical model
// and produces identical numbers. (To intentionally upgrade the model later,
// bump this to a newer commit from
// https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1/commits/main )
const MODEL = "mixedbread-ai/mxbai-embed-large-v1";
const REVISION = "b33106f585b9ce46904ad7443a3b52b7a63e231c";

// How many related articles to keep per story.
const TOP_N = 5;

// Where the finished JSON is written, relative to this script.
const OUTPUT_PATH = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "data",
  "related.json",
);

// --- Types ---------------------------------------------------------------

type Article = {
  slug: string;
  title: string;
  body: string;
};

type Related = { slug: string; score: number };

const articles = articlesData as Article[];

// --- Step 2: turn an article into clean text -----------------------------

/**
 * Strips the HTML body down to the words of the actual story.
 *
 * We remove things that would muddy the "what is this about?" signal:
 *   - <script>/<style>/<iframe> embeds and their contents
 *   - image-credit notes like "(main image via)"
 *   - every HTML tag, which also throws away <img>/<figure> URL noise
 *     (image markup has no story words in it, only links)
 *   - any bare URL left sitting in the text
 *
 * We deliberately KEEP trailing "Trigger Warning" / "P.S." postscripts and
 * image caption jokes, because those are part of the writing, not boilerplate.
 */
function cleanBody(html: string): string {
  return html
    .replace(/<(script|style|iframe)[\s\S]*?<\/\1>/gi, " ") // drop embeds + contents
    .replace(/\(\s*(?:main\s+)?image[^)]*?\bvia\b[^)]*?\)/gi, " ") // "(main image via)" credits
    .replace(/\(\s*via\b[^)]*?\)/gi, " ") // "(via ...)" credits
    .replace(/<[^>]+>/g, " ") // every remaining tag -> space
    .replace(/https?:\/\/\S+/g, " ") // bare URLs left in the text
    .replace(/\s+/g, " ") // collapse runs of whitespace
    .trim();
}

/** The text we actually hand to the model: the headline plus the clean body. */
function textToEmbed(article: Article): string {
  return `${article.title}\n\n${cleanBody(article.body)}`;
}

// --- Step 3 & 4: embed everything, then rank by similarity ---------------

async function main() {
  console.log(`Loading embedding model ${MODEL} (pinned @ ${REVISION})...`);
  console.log("First run downloads ~1.3GB and caches it; later runs are fast.");

  // "feature-extraction" is the task that turns text into a vector.
  const embed = await pipeline("feature-extraction", MODEL, {
    revision: REVISION,
    dtype: "fp32", // full precision; we care about quality, not speed
  });

  console.log(`Embedding ${articles.length} articles...`);

  // Mean pooling + normalisation means each vector has length 1, so the cosine
  // similarity between two vectors is just their dot product (see below).
  // We embed one at a time to keep memory flat and show progress; at a few
  // hundred articles the extra time is irrelevant. Each article is paired with
  // its vector so the ranking step never has to line up two lists by index.
  const embedded: { article: Article; vector: number[] }[] = [];
  for (const [i, article] of articles.entries()) {
    const output = await embed(textToEmbed(article), {
      pooling: "mean",
      normalize: true,
    });
    embedded.push({ article, vector: output.tolist()[0] as number[] });
    if ((i + 1) % 25 === 0 || i === articles.length - 1) {
      console.log(`  embedded ${i + 1}/${articles.length}`);
    }
  }

  // Dot product of two equal-length vectors. Because every vector is
  // normalised, this is exactly the cosine similarity: 1.0 = identical
  // direction (very similar), 0 = unrelated.
  function dot(a: number[], b: number[]): number {
    let sum = 0;
    for (let i = 0; i < a.length; i++) sum += (a[i] ?? 0) * (b[i] ?? 0);
    return sum;
  }

  console.log("Ranking related articles...");
  const result: Record<string, Related[]> = {};

  for (const source of embedded) {
    const scores: Related[] = [];
    for (const other of embedded) {
      if (other.article.slug === source.article.slug) continue; // not itself
      scores.push({
        slug: other.article.slug,
        score: dot(source.vector, other.vector),
      });
    }
    // Most similar first, then keep the top few.
    scores.sort((a, b) => b.score - a.score);
    result[source.article.slug] = scores.slice(0, TOP_N).map((r) => ({
      slug: r.slug,
      score: Number(r.score.toFixed(4)), // 4 d.p. is plenty and keeps the file small
    }));
  }

  // --- Step 5: write the JSON --------------------------------------------

  await writeFile(OUTPUT_PATH, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  console.log(`\nWrote ${Object.keys(result).length} entries to ${OUTPUT_PATH}`);
  console.log("Commit this file. The Astro build imports it directly.");

  // A quick sanity peek so you can eyeball that the matches make sense.
  const sampleSlug = embedded[0]?.article.slug;
  if (sampleSlug) {
    console.log(`\nExample — related to "${sampleSlug}":`);
    for (const r of result[sampleSlug] ?? []) {
      console.log(`  ${r.score}  ${r.slug}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
