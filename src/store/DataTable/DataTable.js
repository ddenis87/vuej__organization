import getters from './DataTableGetters.js';
import mutations from './DataTableMutations.js';
import actions from './DataTableActions.js';

export default {
  namespaced: true,
  state: {
    addressApi: 'https://an67.pythonanywhere.com/api/',
    isDataLoad: false,

    "budget-classifications": {
      description: '',
      listOption: [],
      listData: [],
    },
    "organisations" : {
      description: '',
      listOption: [],
      listData: [],
    }
  },
  getters,
  mutations,
  actions,
}