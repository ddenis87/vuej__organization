import getters from './DataTableGetters.js';
import mutations from './DataTableMutations.js';
import actions from './DataTableActions.js';

class DataTableBase {
  constructor(pageSize = 30, isDeleted = false) {
    this.filterDefault['page_size'] = pageSize;
    this.filterDefault['is_deleted'] = isDeleted;
  }
  description = null;
  countTotal = 0;
  filterDefault = {
    'page_size': null,
    'is_deleted': null,
  };
  filterPrimitive = '';
  filterSearch = '';
  filterSorting = '';
  filterExtended = {
    string: '',
    list: [],
  };
  listOption = {};
  listData = [];
}

export default {
  namespaced: true,
  state: {
    processedStatus: false,

    "budgetclassification": new DataTableBase(),
    "organization": new DataTableBase(),
    
  },
  getters,
  mutations,
  actions,
}