/** 2018/10/5
 *author:zhanglibing
 *email:1053081179@qq.com
 *功能:客户接口
 */
import {axios,HOST} from './Ajax'
//获取微信用户列表
async function getWeChatUserList(params) {
  return new Promise((resolve, reject) => {
    axios.post('CustomerHandle/WxUserList', params).then(res => {
      let {Code, Create} = res.data;
      if (Code === 200) {
        resolve(Create)
      }
      reject('error')
    })
  })
}

// let citys = JSON.parse(sessionStorage.getItem("jizhao_Citys"));
// if (citys) { //缓存有直接返回 反之获取最新数据
//   resolve(citys);
//   return false;
// }
// axios.post('http://back.jizhaojk.com/CustomerHandle/GetPCA').then(res => {
//   let {Code, GetPCA} = res.data;
//   if (Code == 200) {
//     sessionStorage.setItem("jizhao_Citys", JSON.stringify(GetPCA));


//获取用户咨询师列表
async function getCustomerList(flag=false) {
  //flag  false:请求最新数据   true:有缓存用缓存 没有缓存请求最新数据
  let option = {
    Page: 1,
    PageSize: 10000,
    statusForConsultant: 0,
    RoleIds: '9,8'
  }

  return new Promise((resolve, reject) => {
    let users = JSON.parse(localStorage.getItem("jizhao_users"));
    if(users&&!flag){
       resolve(users);
       return false;
    }
    axios.post('CustomerHandle/CustomerList', option).then(res => {
      let {Code, Create} = res.data;
      if (Code === 200) {
        Create.Data=Create.Data.map(val=>{
          let {Id,Username,RealName,NickName,CustomerRoleNames,FromSource}=val;
          return {Id,Username,RealName,NickName,CustomerRoleNames,FromSource}
        })
        let user = Create.Data.filter(val => val.CustomerRoleNames == "用户");
        let Consultant = Create.Data.filter(val => val.CustomerRoleNames != "用户");
        if(option.RoleIds=='9,8'){
          localStorage.setItem("jizhao_users", JSON.stringify({user, Consultant}));
        }
        resolve({user, Consultant})
      }
    })
  })

}

//获取用户列表
async function getUserList(params) {
  return new Promise((resolve, reject) => {
    axios.post('CustomerHandle/CustomerList', params).then(res => {
      let {Code, Create} = res.data;
      if (Code === 200) {
        resolve(Create)
      }
      reject('error')
    })
  })
}

//保存用户 、新建用户
async function saveAddUser(params) {
  let url = params.Id ? 'Edit' : 'Create';
  return new Promise((resolve, reject) => {
    axios.post(`CustomerHandle/${url}`, params).then(res => {
      let {Code, Create} = res.data;
      if (Code === 200) {
        resolve('ok')
      }
      reject(Create)
    })
  })
}

//删除用户
async function deleteUserById(Id) {
  return new Promise((resolve, reject) => {
    axios.post('CustomerHandle/Delete', {Id}).then(res => {
      let {Code} = res.data;
      if (Code === 200) {
        resolve('ok')
      }
      reject('error')
    })
  })
}

//修改用户密码
async function changePsd(params) {
  return new Promise((resolve, reject) => {
    axios.post('CustomerHandle/ChangePassword', params).then(res => {
      let {Code} = res.data;
      if (Code === 200) {
        resolve('ok')
      }
      reject(res.data)
    })
  })
}

//获取用户信息
async function getUserInfo(Id) {
  return new Promise((resolve, reject) => {
    axios.post('CustomerHandle/Get_ById', {Id}).then(res => {
      let {Code, Get_ById} = res.data;
      if (Code === 200) {
        resolve(Get_ById)
      }
      reject('error')
    })
  })
}

//获取用户资金流信息
async function getUserMoney(ConsultantId) {
  return new Promise((resolve, reject) => {
    axios.post('CapitalHandle/GetConsultantMoney_ByConsultantId', {ConsultantId}).then(res => {
      let {Code, GetConsultantMoney_ByConsultantId} = res.data;
      if (Code === 200) {
        resolve(GetConsultantMoney_ByConsultantId)
      }
      reject('error')
    })
  })
}

//咨询师审核通过、不通过
async function PassConsultant(id, type) {
  let url = type == 0 ? 'NotPassConsultant' : 'PassConsultant';
  return new Promise((resolve, reject) => {
    axios.post(`CustomerHandle/${url}`, {id}).then(res => {
      let {Code, Create} = res.data;
      if (Code === 200) {
        resolve('ok')
      }
      reject(Create)
    })
  })
}

/*---------------------------------------用户角色-------------------------------*/
//获取用户角色
async function getRoleList(isGetNew) {
  //isGetNew 判断是否用药获取最新   角色列表新增的时候要获取最新并保存最新数据
  return new Promise((resolve, reject) => {
    let roles = JSON.parse(sessionStorage.getItem("admin_roles"));
    if (roles && !isGetNew) { //缓存有直接返回 反之获取最新数据
      resolve(roles);
      return false;
    }
    axios.post('CustomerRoleHandle/List').then(res => {
      let {Code, List} = res.data;
      if (Code === 200) {
        resolve(List.Data);
        sessionStorage.setItem("admin_roles", JSON.stringify(List.Data));
      } else {
        reject('请求失败');
      }
    })
  });
};

//更新、新增角色
async function saveRole(params) {
  //isGetNew 判断是否用药获取最新   角色列表新增的时候要获取最新并保存最新数据
  return new Promise((resolve, reject) => {
    let url = params.Id ? 'Edit' : 'Create';
    axios.post(`CustomerRoleHandle/${url}`, params).then(res => {
      let {Code} = res.data;
      if (Code === 200) {
        resolve('ok');
      }
      reject('error')
    })

  });
};

//删除角色
async function deleteRoleById(Id) {
  return new Promise((resolve, reject) => {
    axios.post('CustomerRoleHandle/Delete', {Id}).then(res => {
      let {Code} = res.data;
      if (Code === 200) {
        resolve('ok');
      }
      reject('error')
    })

  });
};

/*-------------前台四个接口----------------*/

//获取省市区
async function GetPCA() {//getP 只获取省份
  return new Promise((resolve, reject) => {
    let citys = JSON.parse(sessionStorage.getItem("jizhao_Citys"));
    if (citys) { //缓存有直接返回 反之获取最新数据
      resolve(citys);
      return false;
    }
    axios.post(HOST+'CustomerHandle/GetPCA').then(res => {
      let {Code, GetPCA} = res.data;
      if (Code === 200) {
        sessionStorage.setItem("jizhao_Citys", JSON.stringify(GetPCA));
        resolve(GetPCA);
      } else {
        reject('请求失败');
      }
    })
  });
}

//获取咨询师擅长领域
function getGoodFiel() {
  return new Promise((resolve, reject) => {
    let GoodFiel = JSON.parse(sessionStorage.getItem("jizhao_goods"));
    if (GoodFiel) { //缓存有直接返回 反之获取最新数据
      resolve(GoodFiel);
      return false;
    }
    axios.post(HOST+'CustomerHandle/GetGoodFields').then(res => {
      let {Code, GetGoodFields} = res.data;
      if (Code === 200) {
        sessionStorage.setItem("jizhao_goods", JSON.stringify(GetGoodFields));
        resolve(GetGoodFields);
      } else {
        reject('请求失败');
      }
    })
  });
};

//修改咨询师信息
function setConsultanInfo(option) {
  return new Promise((resolve, reject) => {
    axios.post(HOST+'CustomerHandle/EditConsultanInfo', option).then(res => {
      let {Code} = res.data;
      if (Code === 200) {
        resolve('ok');
      } else {
        reject('请求失败');
      }
    })
  });
};

//获取咨询师信息
function getCustomerInfo(id) {
  return new Promise((resolve, reject) => {
    axios.post(HOST+'CustomerHandle/Get_CustomerId', {id}).then(res => {
      let {Code, Get_CustomerId} = res.data;
      if (Code === 200) {
        resolve(Get_CustomerId);
      } else {
        reject('请求失败');
      }
    })
  });
};

//获取咨询师成长值记录
function getGrowthValueFlowList(option) {
  return new Promise((resolve, reject) => {
    axios.post(HOST+'CustomerHandle/GrowthValueFlowList', option).then(res => {
      let {Code, GrowthValueFlowList} = res.data;
      if (Code === 200) {
        resolve(GrowthValueFlowList);
      } else {
        reject('请求失败');
      }
    })
  });
};

//获取咨询师课程列表
function getCourseList(option) {
  let params = {
    ProductType: 'V',
    ...option
  }
  return new Promise((resolve, reject) => {
    axios.post(HOST+'OrderHandle/GetConsultantOrderList', params).then(res => {
      let {Code, GetConsultantOrderList} = res.data;
      if (Code === 200) {
        resolve(GetConsultantOrderList);
      } else {
        reject('请求失败');
      }
    })
  });
};

//获取订单评价列表
function getOrderComments(orderId) {
  return new Promise((resolve, reject) => {
    axios.post(HOST+'OrderHandle/ListComments', {orderId}).then(res => {
      let {Code, ListComments} = res.data;
      if (Code === 200) {
        resolve(ListComments);
      } else {
        reject('请求失败');
      }
    })
  });
};

//获取随笔记录
async function getRemark(orderId) {
  let option = {
    Page:1,
    PageSize:1000,
    orderId
  }
  console.log(option)
  return new Promise((resolve, reject) => {
    axios.post(HOST+'OrderHandle/GetOrderEssaysRecords_ByOrderId', option).then(res => {
      let {Code,GetOrderEssaysRecords_ByOrderId} = res.data;
      if (Code === 200) {
        resolve(GetOrderEssaysRecords_ByOrderId)
      }
      reject('error')
    })
  })
}

//获取普通用户列表
async function getCustomersList(params) {
  return new Promise((resolve, reject) => {
    axios.post('CustomerHandle/CustomersList', params).then(res => {
      let {Code,CustomersList} = res.data;
      if (Code === 200) {
        resolve(CustomersList)
      }
      reject('error')
    })
  })
}
//获取咨询师用户列表
async function getConsultanterList(params) {
  return new Promise((resolve, reject) => {
    axios.post('CustomerHandle/ConsultanterList', params).then(res => {
      let {Code,ConsultanterList} = res.data;
      if (Code === 200) {
        resolve(ConsultanterList)
      }
      reject('error')
    })
  })
}

export default {
  getWeChatUserList,
  getCustomerList,
  getUserList,
  deleteUserById,
  changePsd,
  getUserInfo,
  getUserMoney,
  getRoleList,
  saveRole,
  deleteRoleById,
  saveAddUser,
  PassConsultant,
  GetPCA,
  getGoodFiel,
  setConsultanInfo,
  getCustomerInfo,
  getGrowthValueFlowList,
  getCourseList,
  getOrderComments,
  getRemark,
  getCustomersList,
  getConsultanterList
}
