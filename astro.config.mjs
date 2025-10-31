import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  build: { assets: "_hoard" },
  site: "https://thehoar.org",
  image: {
    domains: ["thehoar.org"],
  },
  redirects: {
    "/blog/[year]/[month]/[day]/[slug]": "/[year]/[month]/[day]/[slug]",
  },
});
