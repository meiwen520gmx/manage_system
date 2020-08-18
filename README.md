## 简介
`manage_system`是一个公司后台管理系统，它基于vue和element-ui实现。该系统主要有五种角色分别是：boss,finance,market,personManage,technology。这五种角色对应公司的部门。
路由表是前端生成的，不同角色分别对应不同的路由。
* 使用`router.addRoutes(store.getters.addRouters)`动态添加路由
* 请求数据都使用Mock.js进行模拟

