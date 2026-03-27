import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const README_PATH = new URL("../README.md", import.meta.url);

function readReadme(): string {
  return readFileSync(README_PATH, "utf8");
}

function extractSection(readme: string, heading: string): string {
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sectionPattern = new RegExp(`## ${escapedHeading}\\n\\n([\\s\\S]*?)(?:\\n## |$)`);
  const match = readme.match(sectionPattern);

  if (!match) {
    throw new Error(`Could not find section: ${heading}`);
  }

  return match[1];
}

describe("README quick start contract", () => {
  it("documents the shortest setup path and first success signal", () => {
    const quickStart = extractSection(readReadme(), "Quick Start");

    expect(quickStart).toContain("Create a GitHub App");
    expect(quickStart).toContain("Deploy this repo to Vercel");
    expect(quickStart).toContain("APP_ID");
    expect(quickStart).toContain("PRIVATE_KEY");
    expect(quickStart).toContain("APP_PRIVATE_KEY");
    expect(quickStart).toContain("WEBHOOK_SECRET");
    expect(quickStart).toContain("NODEJS_HELPERS=0");
    expect(quickStart).toContain(".github/hivemoot.yml");
    expect(quickStart).toContain("hivemoot:discussion");
    expect(quickStart).toContain("bot welcome comment");
    expect(quickStart).toContain("Troubleshooting First Run");
  });
});
