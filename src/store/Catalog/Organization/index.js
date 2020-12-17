export default Organization = {
  state: {
    isDataLoad: false,
  },
  getters: {
    GET_IS_DATA_LOAD(state) { return state.isDataLoad; },
  },
  mutations: {
    SET_IS_DATA_LOAD(state, status = false) { state.isDataLoad = status; },
  },
  actions: {},
  modules: {}
}