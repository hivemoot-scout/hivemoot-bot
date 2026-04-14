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
  it("documents the first-run prerequisites and required setup values", () => {
    const quickStart = extractSection(readReadme(), "Quick Start");

    expect(quickStart).toContain("Node.js 22.x");
    expect(quickStart).toContain("nvm use");
    expect(quickStart).toContain("APP_ID");
    expect(quickStart).toContain("PRIVATE_KEY");
    expect(quickStart).toContain("APP_PRIVATE_KEY");
    expect(quickStart).toContain("WEBHOOK_SECRET");
    expect(quickStart).toContain("vercel env add");
    expect(quickStart).toContain(".github/hivemoot.yml");
  });

  it("documents the webhook wiring and install step before the first success check", () => {
    const quickStart = extractSection(readReadme(), "Quick Start");

    expect(quickStart).toContain("/api/github/webhooks");
    expect(quickStart).toContain("webhook URL");
    expect(quickStart).toContain("Install the app on your target repository");
    expect(quickStart).toContain("hivemoot:discussion");
    expect(quickStart).toContain("welcome comment");
    expect(quickStart).toContain("@hivemoot /doctor");
  });
});
