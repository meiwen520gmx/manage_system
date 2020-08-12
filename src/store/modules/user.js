const state = {
  token: "ddheoewhjdfiewfjew",
  name: "admin",
  roles: []
}

const mutations = {
  SET_TOKEN:(state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }

}

const actions = {
  
}
// const getters = {
//   token: state => state.user.token
// }

export default {
  namespaced: true, // 为了解决不同模块命名冲突的问题
  state,
  mutations,
  actions,
  // getters
}