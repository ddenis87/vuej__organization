import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import DataTable from './DataTable/DataTable.js';
import DataTableControl from './DataTableControl.js';

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    addressApi: 'https://an67.pythonanywhere.com/api/',
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    DataTable,
    DataTableControl,
  },
})
