import getters from './DataTableGetters.js';
import mutations from './DataTableMutations.js';
import actions from './DataTableActions.js';

export default {
  namespaced: true,
  state: {
    addressApi: 'https://an67.pythonanywhere.com/api/',
    isDataLoad: false,

    "budget-classifications": {
      description: null,
      listOption: [],
      listData: [],
    },
    "organisations" : {
      description: null,
      listOption: [],
      listData: [],
    }
  },
  getters,
  mutations,
  actions,
}