/** 2018/10/6
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能: 合并所有api接口
 */
const files = require.context('.', false, /\.js$/)
const apis = {}

files.keys().forEach(key => {
  if (key === './index.js' || key === './Ajax.js') return
  apis[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default apis
