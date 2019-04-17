/** 2019/1/5
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能: 咨询师成长值
 */

import {axios} from './Ajax'

//SourceType  0:认证；1：创建话题；
// 2：发表文章；
// 3：学习课程；
// 4：服务评价；
// 5：平台年限;
// 6:绑定手机号和微信;
// 7:咨询服务
//8:课程论文


//增加积分
async function InsertGrowthValue(params) {
  let option = {
    // CreateId: store.state.userId,
    // SourceType: 8,
    // value: 100,
    ...params
  }
  return new Promise((resolve, reject) => {
    axios.post('customerHandle/InsertGrowthValue', option).then(res => {
      let {Code, Rpoerts} = res.data;
      if (Code == 200) {
        resolve(Rpoerts);
      }
      reject('error')
    })
  })
}

export default {
  InsertGrowthValue
}
