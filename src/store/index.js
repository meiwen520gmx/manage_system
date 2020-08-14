import Vue from "vue";
import Vuex from "vuex";
// import getters from "./getters";

Vue.use(Vuex);
// const modulesFiles = require.context("./modules", true, /\.js$/); //动态引入modules true表示还要搜索其子目录 如果想引入一个文件夹下面的所有文件，或者引入能匹配一个正则表达式的所有文件，这个功能就会很有帮助
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
//   const value = modulesFiles(modulePath);
//   modules[moduleName] = value.default;
//   return modules;
// }, {});

import user from "./modules/user"
import permission from "./modules/permission"
import menu from "./modules/menu"

const store = new Vuex.Store({
  modules: {
    user,
    permission,
    menu
  },
  getters: {
    token: state => state.user.token,
		roles: state => state.user.roles,
		sidebar: state => state.menu.sidebar,
		isCollapse: state => state.menu.isCollapse,
    isFooter: state => state.menu.isFooter,
    roles: state => state.user.roles,
    name: state => state.user.name,
    avatar: state => state.user.avatar,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters
  }
});
export default store;
