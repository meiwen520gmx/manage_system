import axios from "axios";
import { Message, MessageBox } from "element-ui";
import store from "../store";
import { getToken } from "@/common/auth";

//创建axios实例
const service = axios.create({
  timeout: 5000, //请求超时时间
  baseURL: process.env.VUE_APP_BASE_API, //api的base_url
  headers: {
    //请求的数据格式
    // "Content-Type": "application/json;charset=UTF-8",
    "Content-type": "application/x-www-form-urlencoded",
  },
});

//request拦截器
service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers = {
        'Authorization': "token " + getToken("Token"), //携带权限参数
      };
    }
    return config;
  },
  (error) => {
    //Do something with request error
    return Promise.reject(error);
  }
);

//response拦截器
service.interceptors.response.use(
  (response) => {
    /**
     * code:200,接口正常返回;
     */
    const res = response.data;
    if (res.code !== 200) {
      Message({
        message: res.data.message,
        type: "error",
        duration: 3 * 1000,
      });
      // 根据服务端约定的状态码：5001:非法的token; 5002:其他客户端登录了; 5004:Token 过期了;
      if (res.code === 5001 || res.code === 5002 || res.code === 5004) {
        MessageBox.confirm(
          "你已被登出，可以取消继续留在该页面，或者重新登录",
          "确定登出",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          store.dispatch("logOut").then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
      }
      return Promise.reject("error");
    } else {
      //code === 200,正常返回数据
      return response.data;
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: "error",
      duration: 3 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
