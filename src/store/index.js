import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listFields: [],
    listOrganizations: [],
    listOrganizationsProps: {
      bk: {
        title: 'Bk',

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
    GET_LIST_ORGANIZATIONS(state) {
      for (let item of state.listOrganizations) {
        for (let key of Object.keys(item)) {
          if (state.listOrganizationsProps[key] && state.listOrganizationsProps[key].values)
          item[key] = (state.listOrganizationsProps[key].values.find(mitem => mitem.value == item[key]) != undefined) ?
          state.listOrganizationsProps[key].values.find(mitem => mitem.value == item[key]).title : item[key].title;
        }
      }
      return state.listOrganizations;
    },
    GET_LIST_FIELDS(state) {
      return state.listFields;
    },
  },
  mutations: {
    SET_LIST_ORGANIZATIONS(state, option) {
      state.listOrganizations = option;
    },
    SET_LIST_ORGANIZATIONS_NEXT(state, option) {
      state.listOrganizations.push(...option);
      console.log(state.listOrganizations);
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
    GET_LIST_ORGANIZATIONS(state) {
      console.log('req server..');
      axios
        .get('https://cors-anywhere.herokuapp.com/http://an67.pythonanywhere.com/api/organisations/')
        .then(response => {
          state.commit('SET_LIST_ORGANIZATIONS', response.data.results);
          state.commit('SET_LIST_FIELDS', response.data.results[0]);
        })
        .catch(err => {console.log(err)})
    },
    GET_LIST_ORGANIZATIONS_NEXT(state, page) {
      console.log('req server..');
      axios
        .get(`https://cors-anywhere.herokuapp.com/http://an67.pythonanywhere.com/api/organisations/${page}`)
        .then(response => {
          state.commit('SET_LIST_ORGANIZATIONS_NEXT', response.data.results);
          // state.commit('SET_LIST_FIELDS', response.data.results[0]);
        })
        .catch(err => {console.log(err)})
    },
  },
  modules: {
  }
})
