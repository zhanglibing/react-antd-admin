/** 2018/10/5
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:测试题接口
 */
import {axios} from './Ajax'

//获取测试列表
async function GetList(option) {
    return new Promise((resolve, reject) => {
        axios.post('PsychtestHandle/GetList', option).then(res => {
            let {Code, GetList} = res.data;
            if (Code === 200) {
                resolve(GetList)
            }
            reject('error')
        })
    })
}

//删除测试题
async function deleteById(Id) {
    return new Promise((resolve, reject) => {
        axios.post('PsychtestHandle/Delete', {Id}).then(res => {
            let {Code} = res.data;
            if (Code === 200) {

                resolve('ok')
            }
            reject('error')
        })
    })
}

//获取测试题详情
async function getViewById(Id) {
    return new Promise((resolve, reject) => {
        axios.post('PsychtestHandle/Get_ById ', {Id}).then(res => {
            let {Code, Get_ById} = res.data;
            if (Code === 200) {
                resolve(Get_ById)
            }
            reject('error')
        })
    })
}

//保存 和 跟新 测试题基本信息
async function saveAndUndate(params) {
    return new Promise((resolve, reject) => {
        let lastUrl = 'Add';
        if (params.Id) {
            lastUrl = 'Update';
        }
        axios.post(`PsychtestHandle/${lastUrl}`, {json: JSON.stringify(params)}).then(res => {
            let {Code} = res.data;
            if (Code === 200) {
                resolve(res)
            }
            reject('error')
        })
    })
}


//保存 和 跟新 测试题题目
async function saveTest(params) {
    return new Promise((resolve, reject) => {
        axios.post('PsychtestHandle/Add_UpdateSubjecs', {json: JSON.stringify(params)}).then(res => {
            let {Code} = res.data;
            if (Code === 200) {
                resolve('ok')
            }
            reject('error')
        })
    })
}

//删除选项
async function deleteOptionsById(SubjectAnswerId) {
    return new Promise((resolve, reject) => {
        axios.post('PsychtestHandle/DeleteSubjectAnswer', {SubjectAnswerId}).then(res => {
            let {Code} = res.data;
            if (Code === 200) {
                resolve('ok')
            }
            reject('error')
        })
    })
}

//删除题目
async function deleteSubjectsById(SubJectId) {
    return new Promise((resolve, reject) => {
        axios.post('PsychtestHandle/DeleteSubjects', {SubJectId}).then(res => {
            let {Code} = res.data;
            if (Code === 200) {
                resolve('ok')
            }
            reject('error')
        })
    })
}

//保存结果
async function saveResult(arr, id) {
    arr.forEach(val => {
        val.PsychtestId = id;
    })
    return new Promise((resolve, reject) => {
        axios.post('PsychtestHandle/Add_UpdateAnswers', {json: JSON.stringify(arr)}).then(res => {
            let {Code} = res.data;
            if (Code === 200) {
                resolve('ok')
            }
            reject('error')
        })
    })
}

//删除单个结果选项
async function deleteResultById(AnswerId) {
    return new Promise((resolve, reject) => {
        axios.post('PsychtestHandle/DeleteAnswer', {AnswerId}).then(res => {
            let {Code} = res.data;
            if (Code === 200) {
                resolve('ok')
            }
            reject('error')
        })
    })
}


/*------------------------------前台-----------------------------*/
let HOST = 'http://back.jizhaojk.com/';
//获取用户测试列表
async function getUserTestList(params) {
    return new Promise((resolve, reject) => {
        axios.post(`${HOST}PsychtestHandle/CustomerAnswers`, params).then(res => {
            let {Code, CustomerAnswers} = res.data;
            if (Code === 200) {
                resolve(CustomerAnswers)
            }
            reject(res)
        })
    })
}


//获取单个测试结果
async function getUserTest(CustomerAnswerId) {
    return new Promise((resolve, reject) => {
        axios.post(`${HOST}PsychtestHandle/GetAnswer_ById`, {CustomerAnswerId}).then(res => {
            let {Code, GetAnswer_ById} = res.data;
            if (Code === 200) {
                resolve(GetAnswer_ById)
            }
            reject(res)
        })
    })
}


export default {
    GetList,
    deleteById,
    getViewById,
    saveAndUndate,
    saveTest,
    deleteOptionsById,
    deleteSubjectsById,
    saveResult,
    deleteResultById,
    getUserTestList,
    getUserTest
}

export {
    GetList,
    deleteById,
    getViewById,
    saveAndUndate,
    saveTest,
    deleteOptionsById,
    deleteSubjectsById,
    saveResult,
    deleteResultById
}
