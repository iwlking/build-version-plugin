# version-webpack-plugin 

vue打包版本信息整合插件

#### 用处

在index.html中注入git版本信息



#### 安装

```
npm i -D version-webpack-plugin
```

#### VueCli3配置

修改 **vue.config.js**

```javascript

// 引入插件
const WebpackPlugin = require('version-webpack-plugin')
const pkg = require('./package.json')

// 添加注入插件
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'development') {
        config.plugins.push(
          new WebpackPlugin(pkg)
        )
    }
}

```

#### VueCli2配置

修改 build 下修改 **webpack.prod.conf.js**

```javascript

// 引入插件
const VersionWebpackPlugin = require('version-webpack-plugin')
const pkg = require('../package.json')

// 添加注入插件
const webpackConfig = merge(baseWebpackConfig, {
  plugins: [
    // 打包注入版本信息
    new VersionWebpackPlugin(pkg)
  ]
})

```
