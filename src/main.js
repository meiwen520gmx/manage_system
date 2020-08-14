import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "@/mockjs";
import { getToken } from "./common/auth";
import { getUserInfo } from "./network/api/user";
import { Message } from "element-ui";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf("boss") >= 0) return true;
  if (!permissionRoles) return true;
  return roles.some((role) => permissionRoles.indexOf(role) >= 0);
}
const whiteList = ["/login"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  // 点击登录时，拿到了token并存入了cookie,保证页面刷新时,始终可以拿到token
  if (getToken("token")) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      console.log(store.getters.roles.length);
      if (store.getters.roles.length === 0) {
        let token = getToken("token");
        getUserInfo({ token: token })
          .then((res) => {
            console.log(res);
            // // 根据token拉取用户信息
            let userInfo = res.data.userInfo;
            store.commit("SET_ROLES", userInfo.roles);
            store.commit("SET_NAME", userInfo.name);
            store.commit("SET_AVATAR", userInfo.avatar);
            store
              .dispatch("GenerateRoutes", { roles: userInfo.roles })
              .then(() => {
                console.log(router);
                // 根据roles权限生成可访问的路由表
                router.addRoutes(store.getters.addRouters); //动态添加可访问权限路由表
                console.log(router);
                // next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
              });
          })
          .catch((err) => {
            // store.dispatch("logOut").then(() => {
            //   Message.error(err || "验证失败，请重新登录！");
            //   next({ path: "/login" });
            // });
          });
      } else {
        //     // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        //     if (hasPermission(store.getters.roles, to.meta.roles)) {
        //       next();
        //     } else {
        //       Message.error("401");
        //       // next({ path: "/login" });
        //       // next({ path: '/401', replace: true, query: { noGoBack: true }})
        //     }
      }
    }
  } else {
    next();
    // if (whiteList.indexOf(to.path) !== -1) {
    //   // 点击退出时,会定位到这里
    //   next();
    // } else {
    //   next("/login");
    // }
  }
});
