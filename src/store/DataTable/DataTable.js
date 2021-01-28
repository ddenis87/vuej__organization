import getters from './DataTableGetters.js';
import mutations from './DataTableMutations.js';
import actions from './DataTableActions.js';

export default {
  namespaced: true,
  state: {
    processedStatus: false,
    "budgetclassification": {
      description: null,
      filterDefault: {
        'page_size': 30,
        'is_deleted': false,
      },
      filterString: '',
      sortingString: '',
      freeSearchString: '',
      count: 0,
      listOption: {},
      listData: [],
    },
    "organization" : {
      description: null,
      filterDefault: {
        'page_size': 30,
        'is_deleted': false,
      },
      filterString: '',
      sortingString: '',
      freeSearchString: '',
      count: 0,
      listOption: {},
      listData: [],
    }
  },
  getters,
  mutations,
  actions,
}