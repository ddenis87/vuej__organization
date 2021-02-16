import getters from './DataTableGetters.js';
import mutations from './DataTableMutations.js';
import actions from './DataTableActions.js';

class DataTableBase {
  constructor({pageSize = 30, isDeleted = false, relatedModelView = '{id}'}) {
    this.filterDefault['page_size'] = pageSize;
    this.filterDefault['is_deleted'] = isDeleted;
    this.relatedModelView = relatedModelView;
  }
  description = null;
  countTotal = 0;
  filterDefault = {
    'page_size': null,
    'is_deleted': null,
    // 'ordering': '-id',
  };
  filterPrimitive = '';
  filterSearch = '';
  filterSorting = '&ordering=-id';
  filterExtended = '';

  relatedModelView = '' // шаблон представление таблицы в других таблицах, компонентах, и т.д.
  listOption = {};
  listFieldObject = [];
  listData = [];
}

export default {
  namespaced: true,
  state: {
    statusProcessing: false,

    "budgetclassification": new DataTableBase({ relatedModelView: '{head_code} - {head_name}' }),
    "organization": new DataTableBase({}),
  },
  getters,
  mutations,
  actions,
}