import { defineConfig } from "astro/config";

const repo = process.env.PUBLIC_GOVEL_REPO ?? "DSeung001/govel";
const repoName = repo.split("/")[1] ?? "govel";

export default defineConfig({
  output: "static",
  site: process.env.PUBLIC_SITE_URL ?? "https://dseung001.github.io",
  base: process.env.PUBLIC_BASE_PATH ?? `/${repoName}`,
});
