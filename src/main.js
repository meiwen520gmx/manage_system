import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "@/mockjs";
import NProgress from "nprogress";//progress进度条
import { getToken } from "./common/auth";
import { getUserInfo } from "./network/api/user";
import { Message } from "element-ui";

Vue.config.productionTip = false;


function hasPermission(roles, permissionRoles) {
  if (roles.indexOf("boss") >= 0) return true;//如果是boss那么所有权限都有，所以返回true
  if (!permissionRoles) return true;//不是动态路由也就是默认路由，直接放过，所以返回true
  return roles.some((role) => permissionRoles.indexOf(role) >= 0);
}
const whiteList = ["/login"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 点击登录时，拿到了token并存入了cookie,保证页面刷新时,始终可以拿到token
  if (getToken("token")) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done() 
    } else {
      if (store.getters.roles.length === 0) {
        let token = getToken("token");
        getUserInfo({ token: token })
          .then((res) => {
            //根据token拉取用户信息
            let userInfo = res.data.userInfo;
            store.commit("SET_ROLES", userInfo.roles);
            store.commit("SET_NAME", userInfo.name);
            store.commit("SET_AVATAR", userInfo.avatar);
            store
              .dispatch("GenerateRoutes", { roles: userInfo.roles })
              .then(() => {
                // 根据roles权限生成可访问的路由表
                router.addRoutes(store.getters.addRouters); //动态添加可访问权限路由表
                // next();
                next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
              });
          })
          .catch((err) => {
            store.dispatch("logOut").then(() => {
              Message.error(err || "验证失败，请重新登录！");
              next({ path: "/" });
            });
          });
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next();
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 点击退出时,会定位到这里
      next();
    } else {
      next("/login");
      NProgress.done()
    }
  }
});

router.afterEach(() => {
  NProgress.done()//结束进度条
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
//在使用 vue-router 模块时，挂载根实例的步骤要放在最后，不然会导致配置不成功