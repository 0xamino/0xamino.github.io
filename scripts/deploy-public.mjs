#!/usr/bin/env node
import { execSync } from "node:child_process";

function sh(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

try {
  // Ensure we are at repo root (works even if run from elsewhere)
  sh('git rev-parse --show-toplevel');

  // Sanity checks
  sh('git remote get-url public_deploy > /dev/null');
  sh('test -d dist || (echo "dist/ not found. Run build first." && exit 1)');

  // Create subtree split branch, force push to public repo, then cleanup
  sh('git subtree split --prefix dist -b deploy-dist');
  sh('git push public_deploy deploy-dist:main --force');
  sh('git branch -D deploy-dist');

  console.log("\n✅ Deployed dist/ to public_deploy:main");
} catch (e) {
  console.error("\n❌ Deploy failed.");
  process.exit(1);
}
