import fs from 'node:fs'

export default {
  load() {
    const files = fs.readdirSync('docs/FAQ')
    const mdFiles = files.filter(file => file.endsWith('.md'))
    const filePaths = mdFiles.map(file => {
      const fullPath = 'docs/FAQ/' + file
      const title = fs.readFileSync
        (fullPath, 'utf8')
        .replace(/\r\n/g, '\n')
        .split('\n')[0]
        .replace('# ', '')
      return { path: 'FAQ/' + file.replace('.md', '.html'), title }
    })
    return filePaths
  }
}