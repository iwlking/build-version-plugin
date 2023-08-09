# version-webpack-plugin 

vue打包版本信息整合插件

#### 用处

在index.html中注入git版本信息



#### 安装

```
npm i build-version-plugin
```

#### VueCli3配置

修改 **vue.config.js**

```javascript

// 引入插件
const BuildVersionPlugin = require('build-version-plugin')
const pkg = require('./package.json')

// 添加注入插件
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'development') {
        config.plugins.push(
          new BuildVersionPlugin(pkg)
        )
    }
}

```

#### VueCli2配置

修改 build 下修改 **webpack.prod.conf.js**

```javascript

// 引入插件
const BuildVersionPlugin = require('build-version-plugin')
const pkg = require('../package.json')

// 添加注入插件
const webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    new BuildVersionPlugin(pkg)
  ]
})

```
