/** 2018/10/18
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:
 */

import {axios} from './Ajax'
// import store from '../vuex/store'

//获取分类
async function getClass(type = '') { //type有值时用来筛选器对应子集分类
    return new Promise((resolve, reject) => {
        let option = {
            SearchCategoryName: '',
            Page: 1,
            PageSize: 1000,
        }
        axios.post('ProductHandle/CategoryList', option).then(res => {
            let {Code, CategoryList} = res.data;
            if (Code == 200) {
                let list = CategoryList.Data;
                // store.commit('setClassType',list)
                if (type) {
                    list = list.filter(val => val.ParentCategoryId == type)
                }
                resolve(list);
            }
            reject('error')
        })
    })
}

//获取属性
async function getAttribute(params) { //type有值时用来筛选器对应子集分类
    return new Promise((resolve, reject) => {
        axios.post('ProductHandle/AttributeList', params).then(res => {
            let {Code, AttributeList} = res.data;
            if (Code === 200) {
                resolve(AttributeList)
            }
            reject('error')
        })
    })
}

export default {
    getClass,
    getAttribute
}
