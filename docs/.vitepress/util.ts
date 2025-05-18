import { readFileSync } from 'node:fs';

/**
 * Read a file to string, return `undefined` if not existed
 */
export function readToString(file: string): string | undefined {
  try {
    return readFileSync(file, { encoding: 'utf-8' });
  } catch (err) {
    // If not existed
    if (err.code === 'ENOENT') {
      return;
    } else {
      throw err;
    }
  }
}

/**
 * 格式化`doc`
 * - 每行前加`indent`
 * - 最多显示`max_lines`行，多余时加`…`
 */
export function prettify(
  doc: string,
  { indent, max_lines }: { indent: string; max_lines: number },
): string {
  let lines = doc.split('\n');
  if (lines.length > max_lines) {
    lines = lines.slice(0, max_lines - 1).concat('…');
  }
  return lines.map((l) => `${indent}${l}`).join('\n');
}

/**
 * 若以`prefix`开头，删除之
 */
export function removePrefix(s: string, prefix: string): string {
  if (s.startsWith(prefix)) {
    return s.slice(prefix.length);
  }
  return s;
}
