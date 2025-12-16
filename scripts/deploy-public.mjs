#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";

function sh(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

try {
  // 1. Build the project
  console.log("\n🔨 Building project...");
  sh('npm run build');

  // 2. Ensure dist exists
  if (!fs.existsSync("dist")) {
    throw new Error("dist/ folder not found after build!");
  }

  // 3. Copy README.md into dist/ so it gets uploaded too
  console.log("\n📄 Copying README to dist...");
  fs.copyFileSync("README.md", "dist/README.md");

  // 4. Deploy the folder using gh-pages
  // This initializes a temp repo in 'dist', adds all files (including readme),
  // and force pushes to 'public_deploy'
  console.log("\n🚀 Deploying to public_deploy...");
  sh('npx gh-pages -d dist -r public_deploy');

  console.log("\n✅ Deployed successfully!");

} catch (e) {
  console.error("\n❌ Deploy failed:", e.message);
  process.exit(1);
}