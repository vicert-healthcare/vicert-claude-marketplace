import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

export default defineConfig({
  site: "https://vicert-healthcare.github.io",
  base: "/",
  integrations: [tailwind(), preact({ compat: true })],
  output: "static",
});
