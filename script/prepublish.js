import path from 'path'
import url from 'url'
import fse from 'fs-extra'
import { execSync } from 'child_process'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const libPath = path.resolve(__dirname, '../lib')

fse.removeSync(libPath)
console.log('Remove lib directory successfully! ✅')

// 执行打包操作
execSync('npm run build')
console.log('Make package successfully! ✅')
console.log()
console.log('Prepare publish package')
console.log()
