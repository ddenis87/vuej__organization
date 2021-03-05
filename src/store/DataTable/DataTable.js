import getters from './DataTableGetters.js';
import mutations from './DataTableMutations.js';
import actions from './DataTableActions.js';

class DataTableBase {
  constructor({relatedModelView = '{id}'}) {
    // this.filterDefault['page_size'] = pageSize;
    // this.filterDefault['is_deleted'] = isDeleted;
    this.relatedModelView = relatedModelView;
  }
  description = null;
  countTotal = 0;
  // apiNext = null;
  // apiPrevious = null;
  isHierarchyMode = false;  // HIERARCHICAL TABLE SET WHEN LOADING OPTIONS
  // filterDefault = {
  //   'page_size': null,
  //   'is_deleted': null,
  //   // 'ordering': '-is_group',
  // };
  // filterPrimitive = '';
  // filterSearch = '';
  // filterSorting = '';
  // filterExtended = '';
  
  // apiFilterParent = '&parent__isnull=true';

  // getterFilterData = {
  //   parent: null,
  // };

  relatedModelView = ''; // шаблон представление таблицы в других таблицах, компонентах, и т.д.
  listOption = {};
  // listDataGroup = [];
  listData = [];

  // isModeAdding = false; // режим добавления элемента в таблицу
  // modeAdding = {
  //   status: false,
  //   index: null,
  //   recordId: null,
  // }
}

export default {
  namespaced: true,
  state: {
    // statusProcessing: false,

    "budgetclassification": new DataTableBase({ relatedModelView: '{head_code} - {head_name}' }),
    "organization": new DataTableBase({ relatedModelView: '{title}' }),
  },
  getters,
  mutations,
  actions,
}