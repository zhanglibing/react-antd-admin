/** 2018/10/17
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */

import {axios} from './Ajax'

//获取用户余额详情
async function GetCustomerBalanceList(type){
  return new Promise((resolve,reject)=>{
    axios.post('CapitalHandle/GetCustomerBalanceList',{type}).then(res => {
      let {GetCustomerCustomerBalanceList,Code}=res.data;
      if(Code===200){
        resolve(GetCustomerCustomerBalanceList.Data)
      }
      reject('error')
    })
  })
}

//获取资金流列表
async function getCapitalFlows(params){
  return new Promise((resolve,reject)=>{
    axios.post('CapitalHandle/GetCapitalFlows', params).then(res => {
      let {Code, GetCapitalFlow_ByCustomerId} = res.data;
      if (Code === 200) {
        resolve(GetCapitalFlow_ByCustomerId)
      }
      reject('error')
    })
  })
}


//获取资金统计
async function getCapital(params){
  return new Promise((resolve,reject)=>{
    axios.post('CapitalHandle/GetCapital', params).then(res => {
      let {Code, GetCapital} = res.data;
      if (Code === 200) {
        resolve([GetCapital])
      }
      reject('error')
    })
  })
}


//获取体现列表
async function getList(params){
  return new Promise((resolve,reject)=>{
    axios.post('CapitalHandle/List', params).then(res => {
      let {Code, List} = res.data
      if (Code === 200) {
        resolve(List)
      }
      reject('error')
    })
  })
}

//提现状态改变
async function withdrawalStatus(params){
  return new Promise((resolve,reject)=>{
    axios.post('CapitalHandle/Edit', params).then(res => {
      let {Code} = res.data;
      if (Code === 200) {
        resolve('ok')
      }
    })
  })
}

//提现获取上传的凭证
async function getImg(pictureId){
  return new Promise((resolve,reject)=>{
    axios.post('PictureHandle/Get_PictureUrl', {pictureId}).then(res => {
      let {Code, Get_PictureUrl} = res.data;
      if (Code === 200) {
        resolve(Get_PictureUrl)
      }
      reject('error')
    })
  })
}




export default {
  GetCustomerBalanceList,
  getCapitalFlows,
  getCapital,
  getList,
  withdrawalStatus,
  getImg
}
