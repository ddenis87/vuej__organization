import getters from './DataTableGetters.js';
import mutations from './DataTableMutations.js';
import actions from './DataTableActions.js';

export default {
  namespaced: true,
  state: {
    isDataLoad: false,
    "budgetclassification": {
      description: null,
      filterString: '',
      filterDefault: {
        'page_size': 30,
        'is_deleted': false,
      },
      stringSorting: '',
      count: 0,
      listOption: {},
      listData: [],
    },
    "organization" : {
      description: null,
      filterString: '',
      filterDefault: {
        'page_size': 30,
        'is_deleted': false,
      },
      stringSorting: '',
      count: 0,
      listOption: {},
      listData: [],
    }
  },
  getters,
  mutations,
  actions,
}