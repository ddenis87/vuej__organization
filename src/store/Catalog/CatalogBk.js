import axios from 'axios';

export default {
  namespaced: true,
  state: {
    isDataLoad: false,
    listDataOption: {},
    listField: [],
    listData: [],
  },
  getters: {
    GET_IS_DATA_LOAD(state) { return state.isDataLoad; },
    GET_LIST_OPTION(state) { return state.listDataOption; },
    GET_LIST_FIELD(state) {
      if (state.listField.length == 0) {
        Object.keys(state.listDataOption).forEach(item => {
          state.listDataOption[item].key = item;
          state.listField.push(state.listDataOption[item]);
        });
      }
      return state.listField;
    },
    GET_LIST_DATA(state) { return state.listData; },
  },
  mutations: {
    SET_IS_DATA_LOAD(state, status = false) { state.isDataLoad = status; },
    SET_LIST_OPTION(state, option) { state.listDataOption = option; },
    SET_LIST_DATA(state, option) { state.listData = option; }
  },
  actions: {
    GET_LIST_OPTION(state) {
      state.commit('SET_IS_DATA_LOAD', true);
      axios
        .options(`https://an67.pythonanywhere.com/api/budget-classifications/`)
        .then(response => {
          console.log(JSON.parse(response.request.response).actions.POST);
          state.commit('SET_LIST_OPTION', JSON.parse(response.request.response).actions.POST);
          state.dispatch('GET_LIST_DATA');
        })
        .catch(err => {console.log(err)})
    },
    GET_LIST_DATA(state) {
      axios
        .get(`https://an67.pythonanywhere.com/api/budget-classifications/`)
        .then(response => {
          console.log(response.data);
          state.commit('SET_LIST_DATA', response.data);
        })
        .catch(err => {console.log(err)})
        .finally(() => state.commit('SET_IS_DATA_LOAD'))
    },
  },
  // modules: {

  // }
}