# build-version-plugin

#### 背景
因为公司产品属于B端的产品，客户有定制产品升级也不一致，而且客户比较强硬，必须在客户版本上解决问题，所以只能根据客户反正解决，导致版本信息比较乱，所以开发本插件
注入插件后，配置一下在浏览器的console里面显示
#### 作用和效果

1. 全部提交后的效果

![image.png](https://cdn.nlark.com/yuque/0/2023/png/21894513/1691832620763-5cddf36c-5106-4dc8-bbe8-fc4b529eee7f.png#averageHue=%23f8f7f6&clientId=uf02b0515-1a4a-4&from=paste&height=126&id=u4413d386&originHeight=126&originWidth=514&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8287&status=done&style=none&taskId=u83f21fbb-ee8e-4ec9-92e2-22ac0a1cbd9&title=&width=514)

2. 漏提交后的效果

![image.png](https://cdn.nlark.com/yuque/0/2023/png/21894513/1691832733329-ca34a7db-6245-428d-bd2f-f30ef41eb990.png#averageHue=%23f8f6f4&clientId=uf02b0515-1a4a-4&from=paste&height=166&id=ucb9dd7bd&originHeight=166&originWidth=522&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10603&status=done&style=none&taskId=u9647a176-ba8a-4656-8f85-d146fd18872&title=&width=522)

3. 无git信息时

![image.png](https://cdn.nlark.com/yuque/0/2023/png/21894513/1691833315964-0aa76118-cce8-4727-8ee4-307c21e5c491.png#averageHue=%23fdfddd&clientId=uf02b0515-1a4a-4&from=paste&height=46&id=uaeb1cd38&originHeight=46&originWidth=342&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2674&status=done&style=none&taskId=u0d98cd5d-ead3-4274-afee-655763ee4ec&title=&width=342)
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
