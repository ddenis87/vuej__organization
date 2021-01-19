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
      filterString: '',
      count: 0,
      listOption: [],
      listData: [],
    },
    "organisations" : {
      description: null,
      filterString: '',
      count: 0,
      listOption: [],
      listData: [],
    }
  },
  getters,
  mutations,
  actions,
}