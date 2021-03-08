import getters from './DataTableGetters.js';
import mutations from './DataTableMutations.js';
import actions from './DataTableActions.js';

class DataTableBase {
  constructor({relatedModelView = '{id}'}) {
    this.relatedModelView = relatedModelView;
  }
  description = null;
  countTotal = 0;
  isHierarchyMode = false;  // HIERARCHICAL TABLE SET WHEN LOADING OPTIONS
  relatedModelView = ''; // шаблон представление таблицы в других таблицах, компонентах, и т.д.
  listOption = {};
  listData = [];
}

export default {
  namespaced: true,
  state: {
    "budgetclassification": new DataTableBase({ relatedModelView: '{head_code} - {head_name}' }),
    "organization": new DataTableBase({ relatedModelView: '{title}' }),
  },
  getters,
  mutations,
  actions,
}