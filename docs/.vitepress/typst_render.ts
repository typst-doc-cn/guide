import MarkdownIt from 'markdown-it';
import assert from 'node:assert';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import which from 'which';

import TEMPLATE from './typst_template';
import { prettify, readToString, removePrefix } from './util';

type PreprocessResult = {
  /** 用于显示的版本 */
  display: string;
  /** 用于编译的版本 */
  compiling: string;
};

const AVAILABLE_EXECUTABLES = await Promise.all([
  'typst',
  'typst-0.13.1',
].map((cmd) => which(cmd).then((_) => cmd).catch((_) => null))).then(
  (executables) => executables.filter((cmd) => cmd !== null),
);
assert(
  AVAILABLE_EXECUTABLES.includes('typst'),
  `Failed to find the typst executable in $PATH. Found: ${
    AVAILABLE_EXECUTABLES.join(', ')
  }`,
);
console.log(
  `Found available typst executables: ${AVAILABLE_EXECUTABLES.join(', ')}`,
);

/**
 * 预处理
 *
 * - 添加导言
 * - 以`-- `开头的行在显示时隐藏，在编译时保留
 *
 * @param src 源文档的内容，不含导言
 * @returns 预处理结果
 */
function preprocess(src: string): PreprocessResult {
  const HIDE = '-- ';

  const lines = src.split('\n');

  return {
    display: lines.filter((l) => !l.startsWith(HIDE)).join('\n'),
    compiling: TEMPLATE.replace(
      '<<src>>',
      lines.map((l) => removePrefix(l, HIDE)).join('\n'),
    ),
  };
}

type CompileResult = {
  /** 输出一系列 PNG 的路径，按页面原始顺序 */
  pages: string[];
  /** typst 生成的日志（通常无任何警告或错误） */
  log?: string;
};

/**
 * 用 typst 编译
 *
 * 若已编译，会复用先前结果。
 *
 * @param src 源文档预处理后的内容
 * @param info 源文档的位置信息，仅用于报错提示
 * @returns 编译结果
 */
function compileTypst(
  src: string,
  info: { path: string; line_begin?: number },
  typst_executable: string = 'typst',
): CompileResult {
  // 输出设置

  // 计算源码的 SHA1 哈希值
  const hash = createHash('sha1').update(
    `cache-version: 2025-11-05\0${typst_executable}\0${src}`,
  ).digest('hex').slice(0, 10);
  const outPrefix = 'docs/generated/';
  const pageFilePattern = `${outPrefix}${hash}_{n}.png`;
  const logFile = `${outPrefix}${hash}.log`;

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
    const { stderr, stdout, error } = spawnSync(typst_executable, [
      'compile',
      '-', // 用 stdin 输入，这样文档多了后容易改成并发
      pageFilePattern,
      '--font-path',
      'fonts',
    ], {
      input: src,
    });

    assert(error === undefined, `Failed to call ${typst_executable}: ${error}`);

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

/**
 * 决定选择使用哪个 typst 编译
 * @param lang markdown 代码块中指定的语言标签
 * @returns 选择结果和 markdown 格式提示信息
 */
function determineExecutable(
  lang: string,
): { executable: string; info: string | null } {
  if (lang === 'typst') {
    return { executable: lang, info: null };
  }

  const candidate = lang.replace(' v', '-');
  if (AVAILABLE_EXECUTABLES.includes(candidate)) {
    return {
      executable: candidate,
      info: [
        '::: warning 并非最新版',
        `上例使用 ${lang} 编译，可能不适用于最新版。`,
        ':::',
      ].join('\n'),
    };
  } else {
    return {
      executable: 'typst',
      info: [
        '::: warning 非正常编译',
        `上例应当使用 ${lang} 编译，但实际用最新版编译，结果可能不正常。`,
        ':::',
      ].join('\n'),
    };
  }
}

function TypstRender(md: MarkdownIt) {
  const defaultRender = md.renderer.rules.fence || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];

    const lang = token.info.trim();
    // Language tags:
    // - `typst` (recommended): Compile with the latest typst
    // - `typst v0.13.1`: Compile with typst v0.13.1
    // - `typst no-render`: Skip compilation
    // Other variants are discouraged.

    if (['typst', 'typst v0.13.1'].includes(lang)) {
      const { display, compiling } = preprocess(token.content);
      token.content = display;

      const { executable, info: versionInfo } = determineExecutable(lang);
      const versionHtml = versionInfo !== null ? md.render(versionInfo) : '';

      const result = compileTypst(compiling, {
        path: `docs/${env.relativePath}`,
        // 加四是因为 front matter
        line_begin: token.map ? token.map[0] + 4 : undefined,
      }, executable);

      const codeHtml = defaultRender(tokens, idx, options, env, self);

      const imagesHtml = result.pages.map((path) =>
        `<img src="${path}" alt="Typst compiled image"/>`
      ).join('');

      const logHtml = result.log
        // 日志本身可能已经含“```”，故用四个“`”。
        ? md.render(['````log', result.log, '````'].join('\n'))
        : '';

      return `${codeHtml}${imagesHtml}${versionHtml}${logHtml}`;
    }
    return defaultRender(tokens, idx, options, env, self);
  };
}

export default TypstRender;
