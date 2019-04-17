/** 2018/10/18
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */
import {axios} from './Ajax'

//获取订单统计
async function getOrderStatistics(period){
  return new Promise((resolve,reject)=>{
    axios.post('ReportsHandle/LoadOrderStatistics', {period}).then(res => {
      let {Code, Rpoerts} = res.data;
      if (Code === 200) {
        resolve(Rpoerts);
      }
      reject('error')
    })
  })
}

//获取用户统计
async function getUserStatistics(period){
  return new Promise((resolve,reject)=>{
    axios.post('ReportsHandle/LoadCustomerStatistics', {period}).then(res => {
      let {Code, Rpoerts} = res.data;
      if (Code === 200) {
        resolve(Rpoerts)
      }
      reject('error')
    })
  })
}

//获取订单汇总
async function getOrder(period){
  return new Promise((resolve,reject)=>{
    axios.get('ReportsHandle/OrderSummaryReportList').then(res => {
      let {Code, Rpoerts} = res.data;
      if (Code === 200) {
       resolve(Rpoerts)
      }
      reject('error')
    })
  })
}

//获取待处理订单
async function getIncompleteOrder(){
  return new Promise((resolve,reject)=>{
    axios.get('ReportsHandle/OrderIncompleteReportList').then(res => {
      let {Code, Rpoerts} = res.data;
      if (Code === 200) {
        resolve(Rpoerts.Data)
      }
      reject('error')
    })
  })
}

//获取待处理订单
async function getNewOrder(params){
  return new Promise((resolve,reject)=>{
    axios.post('ReportsHandle/OrderList', params).then(res => {
      let {Code, Rpoerts} = res.data;
      if (Code === 200) {
        resolve(Rpoerts)
      }
      reject('error')
    })
  })
}


export default {
  getOrderStatistics,
  getUserStatistics,
  getOrder,
  getIncompleteOrder,
  getNewOrder
}
