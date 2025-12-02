/**
 * Utilities that depend on node.
 * @module
 */

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
