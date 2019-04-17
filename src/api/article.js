/** 2018/10/13
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */

import {axios} from './Ajax'

//获取文章列表
async function getArticleList(params){
  return new Promise((resolve,reject)=>{
    axios.post('BlogHandle/List', params).then(res => {
      let {Code, List} = res.data;
      if(Code===200){
        resolve(List)
      }
      reject('error')
    })
  })
}

//删除文章
async function deleteArticleById(Id){
  return new Promise((resolve,reject)=>{
    axios.post('BlogHandle/Delete', {Id}).then(res => {
      let {Code} = res.data;
      if(Code===200){
        resolve('ok')
      }
      reject('error')
    })
  })
}
//获取文章详情
async function getArticleById(Id){
  return new Promise((resolve,reject)=>{
    axios.post('BlogHandle/Get_byId', {Id}).then(res => {
      let {Code,Get_ById} = res.data;
      if(Code===200){
        let {BannerPictureUrl,model}=Get_ById;
        resolve({...model,BannerPictureUrl})
      }
      reject('error')
    })
  })
}

//编辑文章
async function editArticle(params){
  return new Promise((resolve,reject)=>{
    axios.post('BlogHandle/Edit', params).then(res => {
      let {Code,Get_ById} = res.data;
      if(Code===200){
        resolve(Get_ById)
      }
      reject('error')
    })
  })
}

//审核文章
async function notOrPassById(Id,flag){
  let url =flag == 0? 'PassBlogPost':'NotPassBlogPost';
  return new Promise((resolve,reject)=>{
    axios.post(`BlogHandle/${url}`, {Id}).then(res => {
      let {Code} = res.data;
      if(Code===200){
        resolve('ok')
      }
      reject('error')
    })
  })
}


export default {
  getArticleList,
  deleteArticleById,
  getArticleById,
  notOrPassById,
  editArticle
}
