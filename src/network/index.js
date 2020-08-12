import axios from "axios";
import { Message } from "element-ui";
import store from "../store";

//创建axios实例
const service = axios.create({
  timeout: 5000,//请求超时时间
  baseURL: process.env.VUE_APP_BASE_API,//api的base_url
  headers: {//请求的数据格式
    // "Content-Type": "application/json;charset=UTF-8",
    "Content-type": "application/x-www-form-urlencoded",
  },
});

//request拦截器
service.interceptors.request.use(config => {
  if(store.getters.token){
    config.headers['token'] = "djiqewdojewjfewewf";//让每个请求都携带token
  }
  return config;
}, error => {
  //Do something with request error
  return Promise.reject(error);
})

//response拦截器
service.interceptors.response.use(res => {
  return res.data;
}, error => {
  Message({
    message: error.message,
    type: "error",
    duration: 3*1000
  })
  return Promise.reject(error)
})

export default service;