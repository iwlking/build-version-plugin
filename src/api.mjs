/*
 * @Description  :  
 * @Author       : wlking
 * @Date         : 2022-07-22 15:00:36
 * @LastEditTime : 2023-08-09 17:44:01
 * @LastEditors  : wlking
 * @FilePath     : \build-version-plugin\src\api.mjs
 */
import baseInfo from './lib/baseInfo'
const pluginName = 'BuildVersionPlugin'
/**
 * 在生产环境打包的时候，给 html 中插入 vue 相关的静态资源的地址
 * 优化首屏加载速度、还要配置webpack打包的时候，不打包相关的资源
 */
class BuildVersionPlugin {
  constructor(options) {
    this.name = ''
    this.version = ''
    for (const option in options) {
      // eslint-disable-next-line no-prototype-builtins
      if (options.hasOwnProperty(option)) {
        if (options[option]) {
          this[option] = options[option]
        }
      }
    }
    baseInfo.name = this.name
    baseInfo.version = this.version
  }
  apply (compiler) {
    if (compiler.hooks) {
      compiler.hooks.compilation.tap(
        pluginName,
        compilation => {
          compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(
            pluginName,
            this.addVersion
          )
        }
      )
    } else {
      compiler.plugin('compilation', (compilation) => {
        compilation.plugin('html-webpack-plugin-before-html-processing', this.addVersion);
      });
    }

  }

  addVersion (data, callback) {
    let versionMessage = ''
    if (baseInfo.state === 'warning') {
      versionMessage = `
<script>
  console.groupCollapsed('%c Version %c ${baseInfo.name}-${baseInfo.version}%c', 'background:#E6A23C ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#35495e ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff', 'background:transparent')
  console.log('分支名称. . . . . . . . : ${baseInfo.branchName}')
  console.log('本地分支. . . . . . . . : ${baseInfo.localBranchName}')
  console.log('提交哈希. . . . . . . . : ${baseInfo.commitHash}')
  console.log('提交时间. . . . . . . . : ${baseInfo.commitDate}')
  console.log('构建时间. . . . . . . . : ${baseInfo.buildDate}')
  console.log('构建人员. . . . . . . . : ${baseInfo.builder}')
  console.log('本地未提交文件 . . . . . : ${baseInfo.localState}')
  console.groupEnd()
</script>
</head>
`
    } else if(baseInfo.state === 'success') {
      versionMessage = `
<script>
  console.groupCollapsed('%c Version %c ${baseInfo.name}-${baseInfo.version}%c', 'background:#41b883 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#35495e ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff', 'background:transparent')
  console.log('分支名称. . . . . . . . : ${baseInfo.branchName}')
  console.log('本地分支. . . . . . . . : ${baseInfo.localBranchName}')
  console.log('提交哈希. . . . . . . . : ${baseInfo.commitHash}')
  console.log('提交时间. . . . . . . . : ${baseInfo.commitDate}')
  console.log('构建时间. . . . . . . . : ${baseInfo.buildDate}')
  console.groupEnd()
</script>
</head>
`
    } else {
      versionMessage = `
<script>
  console.groupCollapsed('%c Version %c ${baseInfo.name}-${baseInfo.version}%c', 'background:#c41a16 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#35495e ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff', 'background:transparent')
  console.log('构建时间. . . . . . . . : ${baseInfo.buildDate}')
  console.groupEnd()
</script>
</head>
      `
    }

    const newHtml = data.html.replace('</head>', versionMessage)
    data.html = newHtml
    if (callback) {
      callback()
    }
  }

}

module.exports = BuildVersionPlugin
