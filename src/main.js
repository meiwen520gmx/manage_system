import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "@/mockjs"

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// router.beforeEach((to, from, next) => {
//   console.log(store.dispatch)
//   if (store.getters.token) {//判断是否有token
//     if (to.path === "/login") {
//       next({ path: "/" });
//     }else{
//       if(store.getters.roles.length === 0){//判断用户是否已经请求完用户信息
        
//       }
//     }
//   }
//   next();
// });
