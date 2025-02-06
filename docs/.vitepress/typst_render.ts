import MarkdownIt from 'markdown-it';
import assert from 'node:assert';
import { createHash } from 'node:crypto';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

import { prettify, readToString } from './util';

type CompileResult = {
  /** 输入一系列 PNG 的路径 */
  pages: string[];
  /** typst 生成的日志（通常无任何警告或错误） */
  log?: string;
};

/**
 * 用 typst 编译
 *
 * 若已编译，会复用先前结果。
 *
 * @param src 源文档的内容，不含导言
 * @param info 源文档的位置信息，仅用于报错提示
 * @returns 编译结果
 */
function compileTypst(
  src: string,
  info: { path: string; line_begin?: number },
): CompileResult {
  // 输出设置

  // 计算源码的 SHA1 哈希值
  const hash = createHash('sha1').update(src).digest('hex').slice(0, 10);
  const outPrefix = 'docs/generated/';
  const pageFilePattern = `${outPrefix}${hash}_{n}.png`;
  const logFile = `${outPrefix}${hash}.log`;

  // 输入设置

  const template = `#set page(height: 4cm, width: 6cm)
#set text(font: ("New Computer Modern", "Source Han Serif SC"))
<<src>>`;
  const srcFull = template.replace('<<src>>', src);

  // 编译

  // 若存在文件，不再重复编译
  const compiled = [
    pageFilePattern.replace('{n}', '1'), // 首页
    logFile,
  ].some(existsSync);

  if (!compiled) {
    // 确保输出文件夹存在（若已存在，会忽略）
    mkdirSync(outPrefix, { recursive: true });

    // 编译
    const { stderr, stdout } = spawnSync('typst', [
      'compile',
      '-', // 用 stdin 输入，这样文档多了后容易改成并发
      pageFilePattern,
      '--font-path',
      'fonts',
    ], {
      input: srcFull,
    });

    // 正常应该没有 stdout；不过以防万一，检查一下
    assert(stdout.length === 0);

    // 保存日志
    if (stderr.length > 0) {
      writeFileSync(logFile, stderr);
    }
  }

  // 收集结果

  // 遍历输出文件名，检查文件是否存在
  const pages: string[] = [];
  for (let n = 1; n < 10; n++) {
    const page = pageFilePattern.replace('{n}', String(n));
    if (existsSync(page)) {
      // remove 'docs/' prefix
      pages.push(page.replace('docs/', '/'));
    } else {
      break;
    }
  }

  // 读取日志，适当报错
  const log = readToString(logFile)?.replaceAll(
    // 删除日志中的无用路径（编译时的工作目录）
    /(  ┌─ ).+(<stdin>:)/g,
    '$1$2',
  )?.replaceAll(
    // 删除下载包的记录
    /(^|\n)downloading @preview\/.+\n.+ ETA: 0 s($|\n)/g,
    '',
  )?.trim();
  if (log) {
    let location = info.path;
    if (info.line_begin) {
      location += `:${info.line_begin}`;
    }
    console.error([
      `Error compiling Typst document:`,
      `  Source (starting at ${location}):`,
      prettify(src, { indent: '    ', max_lines: 4 }),
      `  Log (${logFile}):`,
      prettify(log, { indent: '    ', max_lines: 8 }),
    ].join('\n'));
  }

  return { pages, log };
}

function TypstRender(md: MarkdownIt) {
  const defaultRender = md.renderer.rules.fence || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.info.trim() === 'typst') {
      const src = token.content;
      const result = compileTypst(src, {
        path: `docs/${env.relativePath}`,
        // 加四是因为 front matter
        line_begin: token.map ? token.map[0] + 4 : undefined,
      });

      const codeHtml = defaultRender(tokens, idx, options, env, self);

      const imagesHtml = result.pages.map((path) =>
        `<img src="${path}" alt="Typst compiled image"/>`
      ).join('');

      const logHtml = result.log
        // 日志本身可能已经含“```”，故用四个“`”。
        ? md.render(['````log', result.log, '````'].join('\n'))
        : '';

      return `${codeHtml}${imagesHtml}${logHtml}`;
    }
    return defaultRender(tokens, idx, options, env, self);
  };
}

export default TypstRender;
