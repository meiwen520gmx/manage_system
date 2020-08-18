const getters = {
  token: (state) => state.user.token,
  roles: (state) => state.user.roles,
  sidebar: (state) => state.menu.sidebar,
  isCollapse: (state) => state.menu.isCollapse,
  isFooter: (state) => state.menu.isFooter,
  roles: (state) => state.user.roles,
  name: (state) => state.user.name,
  avatar: (state) => state.user.avatar,
  permission_routers: (state) => state.permission.routers,
  addRouters: (state) => state.permission.addRouters,
};
export default getters;
