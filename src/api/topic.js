/** 2018/10/13
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */

import {axios} from './Ajax'

//获取话题列表
async function getList(params) {
  return new Promise((resolve, reject) => {
    axios.post('ForumsHandle/GetAllTopics', params).then(res => {
      let data = res.data;

      if (data.Code === 200) {
        data.GetAllTopics=data.GetAllTopics.map(val => {
          let {ForumTopic, AvatarUrl} = val;
          return {...ForumTopic, AvatarUrl};
        })
        resolve(data)
      }
      reject('error')
    })
  })
}

//获取话题详情
async function getArticleById(TopicId) {
  return new Promise((resolve, reject) => {
    axios.post('ForumsHandle/Topic', {TopicId}).then(res => {
      let {Code, Topic} = res.data;
      if (Code === 200) {
        resolve(Topic)
      }
      reject('error')
    })
  })
}

//审核
async function notOrPassById(topicId, flag) {
  let url = flag == 0 ? 'passTopic' : 'NotpassTopic';
  return new Promise((resolve, reject) => {
    axios.post(`ForumsHandle/${url}`, {topicId}).then(res => {
      let {Code} = res.data;
      if (Code === 200) {
        resolve('ok')
      }
      reject('error')
    })
  })
}


export default {
  getList,
  getArticleById,
  notOrPassById
}
