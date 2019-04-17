/** 2018/10/5
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */
import axios from 'axios'
import qs from 'qs'

// const apiHost = 'http://2s2z045033.iok.la/Admin/'  //测试

const HOST ='http://back.jizhaojk.com/';

// const HOST ='http://xfmfxl.iok.la/';
const apiHost = HOST+'Admin/';

window.apiHost = apiHost;
axios.defaults.baseURL = apiHost;
axios.defaults.timeout = 500000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8','xml';//POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  alert("错误的传参");
  return Promise.reject(error);
});

export {
  axios,
  HOST
}
