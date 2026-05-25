import { cpSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const sourceDir = path.join(projectRoot, "node_modules", "mupdf-webviewer", "lib");
const targetDir = path.join(projectRoot, "public", "streamdocs");

if (!existsSync(sourceDir)) {
  console.error(`Missing MuPDF WebViewer source: ${sourceDir}`);
  process.exit(1);
}

mkdirSync(targetDir, { recursive: true });
cpSync(sourceDir, targetDir, { recursive: true });
