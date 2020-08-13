import request from "../index";

//登录
export function login(params) {
  return request({
    url: '/user/login',
    method: 'get',
    data: params
  });
}

//退出
export function logout(params){
  return request({
    url: '/user/logout',
    method: 'get',
    data: params
  })
}
//获取用户信息
export function getUserInfo(params) {
  return request({
    url: '/user/info/get',
    method: 'get',
    data:params
  })
}
//获取员工列表
export function getUserList(reqData) {
  return request({
    url:'/user/list/get',
    method: 'get',
    data: reqData
  })
}
