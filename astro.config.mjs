import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  build: { assets: "_hoard" },
  site: "https://thehoar.org",
  experimental: {
    responsiveImages: true,
  },
  image: {
    domains: ["thehoar.org"],
  },
});
