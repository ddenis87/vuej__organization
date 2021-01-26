import getters from './DataTableGetters.js';
import mutations from './DataTableMutations.js';
import actions from './DataTableActions.js';

export default {
  namespaced: true,
  state: {
    addressApi: 'https://an67.pythonanywhere.com/api/v1/',
    isDataLoad: false,

    "budgetclassification": {
      description: null,
      countRecordLoad: '?page_size=30',
      filterString: '',
      stringSorting: '',
      stringFreeSearch: '',
      count: 0,
      listOption: [],
      listData: [],
    },
    "organization" : {
      description: null,
      countRecordLoad: '?page_size=30',
      filterString: '',
      stringSorting: '',
      stringFreeSearch: '',
      count: 0,
      listOption: {
        id: {value: 'id', label: 'ID', type: 'string'},
        institution_code: {value: 'institution_code', label: 'Код', type: 'string'},
        title: {value: 'title', label: 'Наименование', type: 'string'},
        inn: {value: 'inn', label: 'ИНН', type: 'string'},
        kpp: {value: 'kpp', label: 'КПП', type: 'string'},
        rubpnubp_status: {value: 'rubpnubp_status', label: 'РУПБН', type: 'string'},
        industry_typing: {value: 'industry_typing', label: 'Тип 2', type: 'string'},
        institution_type: {value: 'institution_type', label: 'Тип 1', type: 'string'},
        budget_level: {value: 'budget_level', label: 'Уровень бюджета', type: 'string'},
        egrul_status: {value: 'egrul_status', label: 'ЕГРЮЛ статус', type: 'choice', choices: [
          {display_name: 'Действующий', value: 1},
          {display_name: 'Спец. указания', value: 2},
        ]},
        bk: {value: 'bk', label: 'BK', type: 'nested object'},
      },
      listData: [],
    }
  },
  getters,
  mutations,
  actions,
}