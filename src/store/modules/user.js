import { getToken, setToken, removeToken } from "@/common/auth";
import { logout, getUserInfo } from "@/network/api/user";
const state = {
  token: getToken("token"),
  name: "",
  roles: [],
  avatar: "",
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
};

const actions = {
  //退出登录
  logOut({ commit, reqData }) {
    return new Promise((resolve, reject) => {
      logout(reqData).then((res) => {
        commit("SET_ROLES", []);
        removeToken("token");
        resolve();
      });
    });
  },
  
};

export default {
  namespaced: true, // 为了解决不同模块命名冲突的问题
  state,
  mutations,
  actions,
  // getters
};
