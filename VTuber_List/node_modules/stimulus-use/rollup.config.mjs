import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import filesize from 'rollup-plugin-filesize'
import terser from '@rollup/plugin-terser'
import { readFileSync } from 'fs'

const json = JSON.parse(readFileSync('./package.json'))
const banner = `/*\n * stimulus-use ${json.version}\n */`

const pretty = () => {
  return terser({
    mangle: false,
    compress: false,
    format: {
      comments: "all",
      beautify: true,
      indent_level: 2
    }
  })
}

export default [
  {
    input: 'src/index.ts',
    external: ['@hotwired/stimulus'],
    output: [
      {
        name: 'StimulusUse',
        file: 'dist/index.umd.js',
        format: 'umd',
        banner,
        globals: {
          '@hotwired/stimulus': 'Stimulus'
        }
      },
      {
        file: 'dist/index.js',
        format: 'es',
        banner
      }
    ],
    plugins: [resolve(), typescript(), filesize(), pretty()],
    watch: {
      include: 'src/**'
    }
  },
  {
    input: 'src/hotkeys.ts',
    external: ['@hotwired/stimulus', 'hotkeys-js'],
    output: [
      {
        name: 'StimulusUseHotkeys',
        file: 'dist/hotkeys.umd.js',
        format: 'umd',
        banner,
        globals: {
          '@hotwired/stimulus': 'Stimulus',
          'hotkeys-js': 'hotkeys'
        }
      },
      {
        file: 'dist/hotkeys.js',
        format: 'es',
        banner
      }
    ],
    plugins: [resolve(), typescript(), filesize(), pretty()],
    watch: {
      include: ['src/hotkeys.ts', 'src/use-hotkeys/**/*']
    }
  }
]
