/** 2018/10/6
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能: 心理fm接口
 */

import {axios} from './Ajax'

//获取fm列表
async function getList(option) {
  let params = {
    IsShow: false,
    IsNew: false,
    IsHot: false,
    ...option
  }
  return new Promise((resolve, reject) => {
    axios.post('FMHandle/GetList', params).then(res => {
      let {Code, GetList} = res.data;
      if (Code == 200) {
        resolve(GetList)
      }
      reject('error')
    })
  })
}

//删除fm
async function deleteById(Id) {
  return new Promise((resolve, reject) => {
    axios.post('FMHandle/Delete', {Id}).then(res => {
      let {Code} = res.data;
      if (Code == 200) {
        resolve('ok')
      }
      reject('error')
    })
  })
}

//获取fm详情
async function getDetailsById(Id) {
  return new Promise((resolve, reject) => {
    axios.post('FMHandle/get_ById', {Id}).then(res => {
      let {Code,Create} = res.data;
      if (Code == 200) {
        resolve(Create)
      }
      reject('error')
    })
  })
}

//保存fm
async function saveFm(params) {
  let url = params.Id ? 'Update' : 'Create';
  return new Promise((resolve, reject) => {
    axios.post(`FMHandle/${url}`, params).then(res => {
      let {Code} = res.data;
      if (Code == 200) {
        resolve('ok')
      }
      reject('error')
    })
  })
}

export default {
  getList,
  deleteById,
  getDetailsById,
  saveFm
}
