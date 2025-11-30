/**
 * Utilities that do not depend on node, safe to be imported by client-side modules.
 * @module
 */

import { format as _format } from '@std/fmt/duration';

export const duration_fmt = (ms: number) => _format(ms, { ignoreZero: true });

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
