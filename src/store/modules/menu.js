const state = {
  minLeftMenuWidth: 35,
  maxLeftMenuWidth: 180,
  sidebar: {
    opened: true,
    width: 180,
  },
  isCollapse: false, //默认菜单是展开
  isFooter: false,
};

const mutations = {
  HANDLE_LEFT_MENU: (state) => {
    //收缩左侧菜单
    if (state.sidebar.opened) {
      state.sidebar.width = state.minLeftMenuWidth;
    } else {
      state.sidebar.width = state.maxLeftMenuWidth;
    }
    state.sidebar.opened = !state.sidebar.opened;
  },
  INIT_LEFT_MENU: (state) => {
    //初始化左侧菜单
    state.sidebar = state.sidebar;
  },
  SET_LEFT_COLLAPSE: (state) => {
    //改变左侧菜单的收缩宽度
    state.isCollapse = !state.isCollapse;
  },
  SET_FOOTER_SHOW: (state) => {
    //显示隐藏底部layout
    state.isFooter = true;
  },
};

const actions = {
	handleLeftMenu:({commit}) => {
		commit(HANDLE_LEFT_MENU)
	},
	initLeftMenu:({commit}) => {
		commit(INIT_LEFT_MENU)
	},
	setLeftCollapse:({commit}) => {
		commit(SET_LEFT_COLLAPSE)
	}
};

export default {
  namespaced: true, // 为了解决不同模块命名冲突的问题
  state,
  mutations,
  actions,
};
