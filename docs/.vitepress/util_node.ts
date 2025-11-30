/**
 * Utilities that depend on node.
 * @module
 */

import { execFile as _execFile } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { promisify } from 'node:util';

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

export const execFile = promisify(_execFile);
