import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const publicConfig = {
    format: 'cjs',
    name: 'aservice'
}

const config = defineConfig({
    input: './src/index.ts',
    output: [
        { file: './aservice.js', ...publicConfig },
        { file: './aservice.min.js', ...publicConfig, plugins: [terser()] }
    ],
    plugins: [
        nodeResolve(),
        typescript({
            declaration: false
        })
    ],
    external: ['axios', 'form-data']
})

export default config
