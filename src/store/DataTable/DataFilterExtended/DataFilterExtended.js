
export default {
  getters: {
    GET_OPTIONS1:(state, getters, rootState, rootGetters) => (tableName) => {
      console.log(state);
      console.log(getters);
      console.log(rootState);
      console.log(rootGetters);
      return []; // rootGetters.GET_OPTIONS(tableName);
    },
  },
  mutations: {},
}