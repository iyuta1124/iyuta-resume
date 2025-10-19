import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Markdownファイルを読み込み
const inputPath = path.join(__dirname, '../docs/index.md');
const outputPath = path.join(__dirname, '../docs/index-pdf.md');

let content = fs.readFileSync(inputPath, 'utf8');

// :::details ブロックを ### 見出しに変換
content = content.replace(
  /:::details\s+\[([^\]]+)\]\(([^)]+)\)\s+\(([^)]+)\)\s*\{open\}/g,
  '### [$1]($2) ($3)'
);

// ::: を削除
content = content.replace(/:::/g, '');

// 変換されたファイルを保存
fs.writeFileSync(outputPath, content, 'utf8');

console.log('PDF用Markdownファイルを生成しました:', outputPath);
