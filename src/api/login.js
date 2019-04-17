/** 2018/10/13
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */

import {axios} from './Ajax'


//登录
function login(option){
  return new Promise((resolve,reject)=>{
    axios.post('CustomerHandle/Login', option).then(res => {
      let {Code, Login} = res.data;
      if(Code===200){
        resolve(Login)
      }
      reject(Login)
    })
  })
}

export default {
  login
}
