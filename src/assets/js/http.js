import axios from 'axios'

// 建议通过定义插件的配置来扩展 Vue 本身
// 1.定义一个插件
const httpPlugin = {}

// 2.为插件对象添加一个成员： install
// install 是一个函数
// 该函数接受两个参数： Vue、options
httpPlugin.install = function (Vue, options) {
// 3.添加实例方法
  Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  })
}

// 4.导出插件对象
export default httpPlugin

// 5.在入门文件模块main.js 加载插件生效
// Vue.use（httpPlugin）
