/** 2018/10/18
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能: 订单接口汇总
 */
import {axios} from './Ajax'

async function getOrderList(params){
  return new Promise((resolve,reject)=>{
    axios.post('OrderHandle/OrderList', params).then(res => {
      let {Code, OrderList} = res.data;
      if (Code === 200) {
        resolve(OrderList)
      }
      reject('error')
    })
  })
}

//删除订单
async function deleteOrderById(id){
  return new Promise((resolve,reject)=>{
    axios.post('OrderHandle/Delete', {id}).then(res => {
      let {Code} = res.data;
      if (Code === 200) {
        resolve('ok')
      }
      reject('error')
    })
  })
}

//改变订单状态
async function changeOrderStatus(status,OrderId){
  let obj = {
    10: 'OrderHandle/CancelOrder', //取消订单
    12: 'AXBcallHandle/BindXZ',
    13: 'OrderHandle/ConsultingStatus',
    14: 'OrderHandle/CompleteOrderStauts',
    15: 'OrderHandle/ClosedOrder', //交易关闭
  }
  return new Promise((resolve,reject)=>{
    axios.post(obj[status], {OrderId}).then(res => {
      let {Code, ConsultingStatus} = res.data;
      if (Code === 200) {
        resolve('ok')
      } else {
        reject(ConsultingStatus)
      }
    })
  })
}

//关闭订单
async function closeOrder(params){
  return new Promise((resolve,reject)=>{
    axios.post('OrderHandle/ClosedOrder', params).then(res => {
      let {Code, ConsultingStatus} = res.data;
      if (Code === 200) {
        resolve('ok')
      } else {
        reject(ConsultingStatus)
      }
    })
  })
}

//修改订单价格
async function changeOrderPrice(option){
  return new Promise((resolve,reject)=>{
    axios.post('OrderHandle/Modify_Price', option).then(res => {
      let {Code, Modify_Price} = res.data;
      if (Code === 200) {
       resolve('ok')
      }
      reject(Modify_Price)
    })
  })
}
export default {
  getOrderList,
  deleteOrderById,
  changeOrderStatus,
  changeOrderPrice,
  closeOrder
}
