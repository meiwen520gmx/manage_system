import Mock from "mockjs"

import userApi from "./user"

Mock.setup({
  timeout: "500-1000"//设置全局延时
})

//用户角色相关
Mock.mock(/\/user\/login/, 'get', userApi.login)
Mock.mock(/\/user\/logout/, 'get', userApi.logout)
Mock.mock(/\/user\/info\/get/, 'get', userApi.getUserInfo)
Mock.mock(/\/user\/list\/get/, 'get', userApi.getUserList)
