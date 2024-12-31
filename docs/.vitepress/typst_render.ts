import MarkdownIt from 'markdown-it';
import { createHash } from 'crypto';
import { writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

function compileTypst(src: string) {
  // 计算源码的 SHA1 哈希值
  const hash = createHash('sha1').update(src).digest('hex').substr(0, 10);
  const outfilename = `docs/generated/${hash}_{n}.png`;
  const template = `#set page(height: 4cm, width: 6cm)
#set text(font: ("New Computer Modern", "Source Han Serif SC"))
<<src>>`;

  // 将源码字符串写入 tmp.typ 文件中
  const tmpFilePath = 'tmp.typ';
  writeFileSync(tmpFilePath, template.replace('<<src>>', src));

  // 替换 {n} 为 1 并判断文件是否存在
  const firstOutFile = outfilename.replace('{n}', "1");
  if (!existsSync(firstOutFile)) {
    // 调用 typst 编译命令
    try {
      execSync(`typst compile ${tmpFilePath} ${outfilename} --font-path fonts`);
    } catch (error) {
      console.error('Error compiling Typst file:', error);
    }
  }

  // 遍历输出文件名，检查文件是否存在
  const outputFiles: string[] = [];
  for (let n = 1; n < 10; n++) {
    const currentOutFile = outfilename.replace('{n}', String(n));
    if (existsSync(currentOutFile)) {
      // remove 'docs/' prefix
      outputFiles.push(currentOutFile.replace('docs/', '/'));
    } else {
      break;
    }
  }
  return outputFiles;
}

function TypstRender(md: MarkdownIt) {
  const defaultRender = md.renderer.rules.fence || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.info.trim() === 'typst') {
      const src = token.content;
      const imgPaths = compileTypst(src);
      const codeHtml = defaultRender(tokens, idx, options, env, self);
      const imagesHtml = imgPaths.map(path => `<img src="${path}" alt="Typst compiled image"/>`).join('');
      return `${codeHtml}${imagesHtml}`;
    }
    return defaultRender(tokens, idx, options, env, self);
  };
}

export default TypstRender;
