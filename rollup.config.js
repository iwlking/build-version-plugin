/*
 * @Description  :
 * @Author       : 罗肖
 * @Date         : 2021-11-04 11:11:45
 * @LastEditTime : 2022-07-22 14:59:17
 * @LastEditors  : 罗肖
 * @FilePath     : \linkoffice-webpack-plugin\rollup.config.js
 */
import babel from 'rollup-plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import license from 'rollup-plugin-license'
import pkg from './package.json'

const licenseBanner = license({
  banner: {
    content: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */',
    commentStyle: 'none'
  }
})

export default [
  {
    input: 'src/api.mjs',
    output: [
      // config for <script type="module">
      {
        file: pkg.module,
        format: 'esm'
      },
      // config for <script nomodule>
      {
        file: pkg.browser,
        format: 'umd',
        name: 'Tracker',
        noConflict: true,
        banner: ';'
      }
    ],
    plugins: [
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
        externalHelpers: true
      }),
      nodeResolve({
        browser: true
      }),
      commonjs(),
      licenseBanner
    ]
  },
  {
    input: 'src/api.mjs',
    output: [
      // config for <script type="module">
      {
        file: pkg.module.replace('.mjs', '.min.mjs'),
        format: 'esm'
      },
      // config for <script nomodule>
      {
        file: pkg.browser.replace('.js', '.min.js'),
        format: 'umd',
        name: 'Tracker',
        noConflict: true
      }
    ],
    plugins: [
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
        externalHelpers: true
      }),
      nodeResolve({
        browser: true
      }),
      commonjs(),
      terser(),
      licenseBanner, // must be applied after terser, otherwise it's being stripped away...
      filesize()
    ]
  }
]
