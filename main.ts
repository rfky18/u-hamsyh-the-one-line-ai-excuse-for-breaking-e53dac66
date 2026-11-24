// The One-Line AI Excuse for Breaking Production
// make.fun bounty: u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66
//
// Writes exactly one line of text to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt), then reads it back and verifies the
// content is byte-identical before exiting.
//
// Node 22+, TypeScript, stdlib only, deterministic. Uses only erasable
// TypeScript syntax so it runs directly under Node's type stripping.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE: string =
  "I thought 'chmod 777' was a wish. It was, and production granted it.";

const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath: string = join(outputDir, "entry.txt");

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, LINE, { encoding: "utf8" });

const readBack: Buffer = readFileSync(outputPath);
if (!readBack.equals(Buffer.from(LINE, "utf8"))) {
  console.error(`verification failed: ${outputPath} is not byte-identical`);
  process.exit(1);
}

console.log(`wrote ${readBack.length} bytes to ${outputPath}`);
