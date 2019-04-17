/** 2018/10/5
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:课程接口
 */

import {axios} from './Ajax'

async function GetList(option={}) {
  let params = {
    Page: 1,
    PageSize: 10000,
    CategoryIds:  '',
    CustomeType: 0,
    ...option
  }
  return new Promise((resolve, reject) => {
    axios.post('CurriculumHandle/GetList', params).then(res => {
      let {Code, GetList} = res.data;
      if (Code === 200) {
        resolve(GetList)
      }
      reject('error')
    })
  })
}

async function deleteById(Id) {
  return new Promise((resolve, reject) => {
    axios.post('CurriculumHandle/Delete', {Id}).then(res => {
      let {Code} = res.data;
      if (Code === 200) {
        resolve('ok')
      }
      reject('error')
    })
  })
}

async function getDetialsById(Id) {
  return new Promise((resolve, reject) => {
    axios.post('CurriculumHandle/get_ById', {Id}).then(res => {
      let {Code, Get_ById} = res.data;
      if (Code === 200) {
        resolve(Get_ById)
      }
      reject('error')
    })
  })
}

//保存/跟新课程
async function saveCourse(params) {
  let url = params.Id ? 'Update' : 'Create';
  return new Promise((resolve, reject) => {
    axios.post(`CurriculumHandle/${url}`, params).then(res => {
      let {Code} = res.data;
      if (Code === 200) {
        resolve('ok')
      }
      reject('error')
    })
  })
}



export default {
  GetList,
  deleteById,
  getDetialsById,
  saveCourse,

}
