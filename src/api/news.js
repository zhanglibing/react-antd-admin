/** 2018/10/13
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */

import {axios} from './Ajax'

//获取列表
async function getList(option) {
  return new Promise((resolve, reject) => {
    axios.post('NewsHandle/List', option).then(res => {
      let {Code, List} = res.data;
      if (Code === 200) {
        resolve(List);
      }
      reject('error')
    })
  })
}

//删除
async function deleteById(Id) {
  return new Promise((resolve, reject) => {
    axios.post('NewsHandle/Delete', {Id}).then(res => {
      let {Code} = res.data;
      if (Code === 200) {
        resolve('ok');
      }
      reject('error')
    })
  })
}

//获取详情
async function getDetailsById(Id) {
  return new Promise((resolve, reject) => {
    axios.post('NewsHandle/Get_byId', {Id}).then(res => {
      let {Code, Get_byId} = res.data;
      if (Code === 200) {
        resolve(Get_byId);
      }
      reject('error')
    })
  })
}

//保存、更新
async function saveNews(params) {
  let url = params.Id ? 'Edit' : 'Create';
  return new Promise((resolve, reject) => {
    axios.post(`NewsHandle/${url}`, params).then(res => {
      let {Code} = res.data;
      if (Code === 200) {
        resolve('ok');
      }
      reject('error')
    })
  })
}

export default {
  getList,
  deleteById,
  getDetailsById,
  saveNews
}
