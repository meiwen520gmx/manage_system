import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const Login = () => import("@/views/Login");
const Register = () => import("@/views/Register");
const Home = () => import("@/views/Home");
const Layout = () => import("@/views/Layout");

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

//实例化vue的时候只挂载routes
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: "/permission",
    component: Layout,
    name: "权限测试",
    meta: { role: ["admin", "super_editor"] }, //页面需要的权限
  }
];
