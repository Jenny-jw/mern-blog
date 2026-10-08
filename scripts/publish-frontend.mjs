import { cp, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(repoRoot, "frontend", "vite_blog", "dist");
const publicDir = path.join(repoRoot, "backend", "public");

const skipNames = new Set(["assets", ".vite"]);

const shouldSkip = (name) => skipNames.has(name) || name.includes(" copy");

const publish = async () => {
  let distEntries;
  try {
    distEntries = await readdir(distDir, { withFileTypes: true });
  } catch {
    console.error(
      "Missing frontend build output. Expected frontend/vite_blog/dist after vite build."
    );
    process.exit(1);
  }

  if (!distEntries.some((entry) => entry.name === "index.html")) {
    console.error("frontend/vite_blog/dist/index.html is missing.");
    process.exit(1);
  }

  for (const entry of distEntries) {
    if (shouldSkip(entry.name)) continue;

    const from = path.join(distDir, entry.name);
    const to = path.join(publicDir, entry.name);

    if (entry.isDirectory()) {
      await rm(to, { recursive: true, force: true });
      await cp(from, to, { recursive: true });
      continue;
    }

    await cp(from, to);
  }

  const assetsFrom = path.join(distDir, "assets");
  const assetsTo = path.join(publicDir, "assets");
  await rm(assetsTo, { recursive: true, force: true });
  await cp(assetsFrom, assetsTo, { recursive: true });

  console.log(
    "Published Vite build into backend/public. Left uploads/ and other non-build files in place."
  );
};

publish();
