import Vue from "vue";
import VueRouter from "vue-router";
import { Home, Content } from "../Layout"; //页面整体布局

Vue.use(VueRouter);

//默认不需要权限能访问的页面
export const constantRouterMap = [
  {
    path: "",
    component: Home,
    redirect: "/index/index",
    hidden: true,
  },
  {
    path: "/index",
    name: "index",
    component: Home,
    redirect: "/index/index",
    meta: {
      title: "首页",
      icon: "el-icon-s-home",
    },
    noDropdown: true,
    children: [
      {
        path: "index",
        meta: {
          title: "首页",
          icon: "el-icon-s-home",
        },
        component: () => import("@/views/index/index"),
      },
    ],
  },
  {
    path: "/notice",
    name: "notice",
    component: Home,
    redirect: '/notice/companyNotice',
    meta: {
      title: "公司公告",
      icon: "el-icon-s-comment",
    },
    noDropdown: true,
    children: [
      {
        path: "companyNotice",
        meta: {
          title: "公司公告",
          icon: "el-icon-s-comment",
        },
        component: () => import("@/views/notice/CompanyNotice"),
      },
    ],
  },
  {
    path: "/infoManage",
    name: "infoManage",
    component: Home,
    redirect: '/infoManage/personCenter',
    meta: {
      title: "信息管理",
      icon: "el-icon-warning-outline",
    },
    children: [
      {
        path: "personCenter",
        meta: {
          title: "个人中心"
        },
        component: () => import("@/views/infoManage/personCenter"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login"),
    hidden: true,
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    hidden: true,
  },
  // {
  //   path: "/notice",
  //   name: "Notice",
  //   component: () => import("@/views/CompanyNotice"),
  //   hidden: true,
  // },
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
    path: "/finance",
    name: "finance",
    component: Home,
    meta: {
      title: "财务管理",
      icon: "el-icon-s-data",
      roles: ['boss', 'finance']
    },
    children:[
			{
        path:'accounting', 
        name:'accounting',
				meta:{
          title:'会计管理',
          roles: ['boss', 'finance']
				},
				component: () => import('@/views/finance/Accounting'),
      },
      {
        path:'capitalReport', 
        name:'capitalReport',
				meta:{
          title:'总账报表',
          roles: ['boss', 'finance']
				},
				component: () => import('@/views/finance/CapitalReport'),
      },
      {
        path:'filemanage', 
        name:'filemanage',
				meta:{
          title:'档案管理',
          roles: ['boss', 'finance']
				},
				component: () => import('@/views/finance/FileManage'),
			}
		]
  },
  {
    path: "/market",
    name: "market",
    component: Home,
    meta: {
      title: "市场管理",
      icon: "el-icon-s-grid",
      roles: ['boss', 'market']
    },
    children:[
			{
        path:'achievement', 
        name:'achievement',
				meta:{
          title:'业绩表',
          roles: ['boss', 'market']
				},
				component: () => import('@/views/market/Achievement'),
      },
      {
        path:'markePlan', 
        name:'markePlan',
				meta:{
          title:'营销计划',
          roles: ['boss', 'market']
				},
				component: () => import('@/views/market/MakePlan'),
      }
		]
  },
  {
    path: "/personManage",
    name: "personManage",
    component: Home,
    meta: {
      title: "员工管理",
      icon: "el-icon-s-custom",
      roles: ['boss', 'personManage']
    },
    noDropdown:true,
    children:[
			{
        path:'employeeList', 
        name:'employeeList',
				meta:{
          title:'员工管理',
          roles: ['boss', 'personManage']
				},
				component: () => import('@/views/personManage/EmployeeList'),
      }
		]
  },
  {
    path: "/technology",
    name: "technology",
    component: Home,
    meta: {
      title: "项目管理",
      icon: "el-icon-s-cooperation",
      roles: ['boss', 'technology']
    },
    noDropdown:true,
    children:[
			{
        path:'project', 
        name:'project',
				meta:{
          title:'项目管理',
          roles: ['boss', 'technology']
				},
				component: () => import('@/views/technology/Project'),
      }
		]
  },
];
