import Vue from "vue";
import VueRouter from "vue-router";
import {} from "../Layout";//页面整体布局

Vue.use(VueRouter);
const Login = () => import("@/views/Login");
const Register = () => import("@/views/Register");
const Home = () => import("@/Layout/home");
const Notice = () => import("@/views/CompanyNotice");

//默认不需要权限能访问的页面
export const constantRouterMap = [
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
	{
    path: "/notice",
    name: "Notice",
    component: Notice,
  }
];

//实例化vue的时候只挂载constantRouterMap
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constantRouterMap,
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
