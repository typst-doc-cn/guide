// 确保输出文件夹存在（若已存在，会忽略）

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { readToString } from '../../util_node.ts';

const CACHE_DIR = 'target/cache';

function cacheFile(filename: string): string {
  return path.join(CACHE_DIR, filename);
}

export class FileCache<T> {
  #cacheFile: string;
  #serializer: (value: T) => string;
  #deserializer: (raw: string) => T;

  #value: T | null;

  constructor(
    filename: string,
    serializer: (value: T) => string,
    deserializer: (raw: string) => T,
  ) {
    this.#cacheFile = cacheFile(filename);
    this.#serializer = serializer;
    this.#deserializer = deserializer;
    this.#value = null;
  }

  get(): T | null {
    if (this.#value === null) {
      const raw = readToString(this.#cacheFile);
      if (raw !== undefined) {
        this.#value = this.#deserializer(raw);
      }
    }

    return this.#value;
  }

  set(value: T): void {
    this.#value = value;
  }

  save(): void {
    if (this.#value !== null) {
      const raw = this.#serializer(this.#value);
      writeFileSync(this.#cacheFile, raw, { encoding: 'utf-8' });
    }
  }
}

export class FileCacheWithInit<T> extends FileCache<T> {
  constructor(
    filename: string,
    serializer: (value: T) => string,
    deserializer: (raw: string) => T,
    init: T,
  ) {
    super(filename, serializer, deserializer);

    this.set(super.get() ?? init);
    this.save();
  }

  get(): T {
    return super.get()!;
  }
}

if (!existsSync(CACHE_DIR)) {
  // Initial setup
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(cacheFile('.gitignore'), '*\n');
  writeFileSync(
    cacheFile('CACHDIR.TAG'),
    `Signature: 8a477f597d28d172789f06886806bc55
# This file is a cache directory tag created by docs/.vitepress/theme/see_also_data/caching.ts.
# For information about cache directory tags, see:
#	https://bford.info/cachedir/
`,
  );
}
