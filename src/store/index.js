import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    statusLoad: false,
    listFields: [],
    listOrganizations: [],
    listOrganizationsProps: {
      bk: {
        title: 'Bk',
        values: []
      },
      budget_level: {
        title: 'Уровень бюджета',
        values: [
          {value: "1", title: 'Федеральный бюджет'},
          {value: "2", title: 'Региональный бюджет'},
          {value: "3", title: 'Областной бюджет'},
        ]
      },
      institution_code: {
        title: 'Код учреждения',
      },
      title: {
        title: 'Наименование организации',
      },
      inn: {
        title: 'ИНН',
      },
      kpp: {
        title: 'КПП',
      },
      institution_type: {
        title: 'Тип учреждения',
        values: [
          {value: "1", title: 'Бюджетное'},
          {value: "2", title: 'Автономное'},
        ]
      },
      organisation_type: {
        title: 'Тип организации',
        values: [
          {value: "1", title: 'Учреждение'},
        ]
      },
      egrul_status: {
        title: 'Статус ЕГРЮЛ',
        values: [
          {value: "ACT", title: "Действующее" },
          {value: "LIQ", title: "Ликвидации юридического лица" },
          {value: "ILS", title: "Находится в стадии ликвидации" },
          {value: "DTE", title: "Регистрирующим органом принято решение о предстоящем исключении" },
          {value: "AWE", title: "Юридическое лицо находится в процессе реорганизации в форме присоединения к другому юридическому лицу" },
          {value: "JTE", title: "Юридическое лицо находится в процессе реорганизации в форму присоединения к нему других юридических лиц" },
        ]
      },
      rubpnubp_status: {
        title: 'Статус РУБПНУБП',
        values: [
          {value: "1", title: "Действует"},
          {value: "2", title: "Специальные указания"},
        ]
      },
      industry_typing: {
        title: 'Отраслевая типизация',
        values: [
          {value: "1", title: "Библиотека"},
          {value: "2", title: "ВУЗ"},
          {value: "3", title: "Детский сад"},
          {value: "4", title: "ДПО"},
          {value: "5", title: "Здравоохранение"},
          {value: "6", title: "Культура"},
          {value: "7", title: "Музей"},
          {value: "8", title: "Научное"},
          {value: "9", title: "СПО"},
          {value: "10", title: "Прочие"}
        ],
      },

    },
  },
  getters: {
    GET_LIST_FILTER(state) {
      let listFilter = []
      for (let item of Object.keys(state.listOrganizationsProps)) {
        if (state.listOrganizationsProps[item].values) {
          listFilter.push({key: item, title: state.listOrganizationsProps[item].title, values: state.listOrganizationsProps[item].values});
        }
      }
      // console.log(listFilter);
      return listFilter;
    },

    GET_STATUS_LOAD(state) { return state.statusLoad; },
    // GET_LIST_ORGANIZATIONS_PROPS(state) { return state.listOrganizationsProps; },
    GET_LIST_ORGANIZATIONS(state) {
      for (let item of state.listOrganizations) {
        for (let key of Object.keys(item)) {
          if (state.listOrganizationsProps[key] && state.listOrganizationsProps[key].values) {
            if (state.listOrganizationsProps[key].values.find(mitem => mitem.value == item[key]) != undefined) {
              item[key] = state.listOrganizationsProps[key].values.find(mitem => mitem.value == item[key]).title;
            }
          }
        }
      }
      return state.listOrganizations;
    },

    GET_LIST_FIELDS(state) { return state.listFields; },
  },
  mutations: {
    CLEAR_LIST_ORGANIZATIONS(state) { state.listOrganizations.length = 0; },
    SET_STATUS_LOAD(state, status = false) { state.statusLoad = status; },

    SET_LIST_ORGANIZATIONS(state, option) { state.listOrganizations.push(...option); },

    SET_LIST_BK(state, option) {
      for (let item of option) {
        state.listOrganizationsProps.bk.values.push({value: item.id, title: `${item.head_code} : ${item.head_name}`});
      }
    },

    SET_LIST_FIELDS(state, option) {
      let listFields = [];
      for (let key of Object.keys(option)) {
        if (state.listOrganizationsProps[key]) {
          listFields.push({text: state.listOrganizationsProps[key].title, value: key});
        }
      }
      state.listFields = listFields;
    }
  },
  actions: {
    GET_LIST_ORGANIZATIONS(state, option) {
      // console.log(stringFilter);
      state.commit('SET_STATUS_LOAD', true);
      if (option.stringFilter != '') state.commit('CLEAR_LIST_ORGANIZATIONS');
      console.log(`https://cors-anywhere.herokuapp.com/http://an67.pythonanywhere.com/api/organisations/?page=${option.currentPage}${option.stringFilter}`);

      axios
        .get(`https://cors-anywhere.herokuapp.com/http://an67.pythonanywhere.com/api/organisations/?page=${option.currentPage}${option.stringFilter}`)
        .then(response => {
          state.commit('SET_LIST_ORGANIZATIONS', response.data.results);
          if (option.currentPage == 1) state.commit('SET_LIST_FIELDS', response.data.results[0]);
        })
        .catch(err => {console.log(err)})
        .finally(() => state.commit('SET_STATUS_LOAD'));
    },

    GET_LIST_BK(state) {
      state.commit('SET_STATUS_LOAD', true);
      axios
        .get(`https://cors-anywhere.herokuapp.com/http://an67.pythonanywhere.com/api/budget-classifications/`)
        .then(response => {
          state.commit('SET_LIST_BK', response.data);
          state.dispatch('GET_LIST_ORGANIZATIONS', {currentPage: 1, stringFilter: ''});
        })
        .catch(err => {console.log(err)})
        .finally(() => state.commit('SET_STATUS_LOAD'));
    }
  },
  modules: {
  }
})
