import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
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
})