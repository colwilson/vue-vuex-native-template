import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import nodeGlobals from 'rollup-plugin-node-globals'
import butternut from 'rollup-plugin-butternut'
import node from 'rollup-plugin-node-resolve'

const plugins = [
  buble({
    objectAssign: 'Object.assign'
  }),
  nodeResolve({
    jsnext: true,
    main: true,
    browser: false
  }),
  commonjs(),
  nodeGlobals()
]

const config = {
  entry: './socketserver.js',
  dest: './dist/socketserver.js',
  format: 'es',
  plugins: [butternut, node({ module: true })]
}

const isProduction = process.env.NODE_ENV === `production`
const isDevelopment = process.env.NODE_ENV === `development`

if (isProduction) {
  config.sourceMap = false
  config.plugins.push(butternut)
}

if (isDevelopment) {
  config.sourceMap = true
}

export default config
