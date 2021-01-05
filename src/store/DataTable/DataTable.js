import getters from './DataTableGetters.js';
import mutations from './DataTableMutations.js';
import actions from './DataTableActions.js';

export default {
  namespaced: true,
  state: {
    addressApi: 'https://an67.pythonanywhere.com/api/',
    filterString: '',
    isDataLoad: false,

    "budget-classifications": {
      description: null,
      count: 0,
      listOption: [],
      listData: [],
    },
    "organisations" : {
      description: null,
      count: 0,
      listOption: [],
      listData: [],
    }
  },
  getters,
  mutations,
  actions,
}