import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    statusLoad: false,
    optionRequest: {
      currentPage: 1,
      stringFilter: '',
    },
    listFields: [],
    listData: [],
    listDataProps: { // ДОЛЖНО ПОЛУЧАТЬ С API
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
    GET_STATUS_LOAD(state) { return state.statusLoad; },
    GET_OPTIONS_REQUEST(state) { return state.optionRequest; },
    GET_LIST_FIELDS(state) { return state.listFields; }, 
    GET_LIST_FILTER(state) {
      let listFilter = []
      for (let item of Object.keys(state.listDataProps)) {
        if (state.listDataProps[item].values) {
          listFilter.push({key: item, title: state.listDataProps[item].title, values: state.listDataProps[item].values});
        }
      }
      return listFilter;
    },
    GET_LIST_DATA(state) {
      state.listData.forEach(item => {
        for (let key of Object.keys(item)) {
          if (state.listDataProps[key] && state.listDataProps[key].values) {
            if (state.listDataProps[key].values.find(mitem => mitem.value == item[key]) != undefined) {
              item[key] = state.listDataProps[key].values.find(mitem => mitem.value == item[key]).title;
            }
            if (typeof(item[key]) == "object") item[key] = item[key].head_name; ///???????????
          }
        }
      })
      return state.listData;
    },
  },
  mutations: {
    SET_STATUS_LOAD(state, status = false) { state.statusLoad = status; },
    SET_OPTIONS_REQUEST(state, option = {}) {
      ('currentPage' in option) ? state.optionRequest.currentPage = option.currentPage : state.optionRequest.currentPage = 1;
      ('stringFilter' in option) ? state.optionRequest.stringFilter = option.stringFilter : state.optionRequest.stringFilter = '';
    },
    SET_LIST_FIELDS(state, option) {
      let listFields = [];
      for (let key of Object.keys(option)) {
        if (state.listDataProps[key]) {
          listFields.push({text: state.listDataProps[key].title, value: key});
        }
      }
      state.listFields = listFields;
    },
    SET_LIST_BK(state, option) {
      for (let item of option) {
        state.listDataProps.bk.values.push({value: item.id, title: `${item.head_code} : ${item.head_name}`});
      }
    },
    CLEAR_LIST_DATA(state) { state.listData = []; },
    SET_LIST_DATA(state, option) { state.listData.push(...option); },
  },
  actions: {
    GET_LIST_DATA(state) {
      state.commit('SET_STATUS_LOAD', true);
      let option = state.getters.GET_OPTIONS_REQUEST;
      axios
        .get(`https://cors-anywhere.herokuapp.com/http://an67.pythonanywhere.com/api/organisations/?page=${option.currentPage}${option.stringFilter}`)
        .then(response => {
          if (response.data.count !== 0) {
            state.commit('SET_LIST_DATA', response.data.results);
            if (option.currentPage == 1) state.commit('SET_LIST_FIELDS', response.data.results[0]);
          } else {
            state.commit('CLEAR_LIST_DATA');
          }
          state.commit('SET_OPTIONS_REQUEST', { currentPage: ++option.currentPage, stringFilter: option.stringFilter });
        })
        .catch(err => {console.log(err)})
        .finally(() => state.commit('SET_STATUS_LOAD'));
    },
    GET_LIST_BK(state) {
      state.commit('SET_STATUS_LOAD', true);
      state.commit('CLEAR_LIST_DATA');
      axios
        .get(`https://cors-anywhere.herokuapp.com/http://an67.pythonanywhere.com/api/budget-classifications/`)
        .then(response => {
          state.commit('SET_LIST_BK', response.data);
          state.dispatch('GET_LIST_DATA');
        })
        .catch(err => {console.log(err)})
    },
  },
  modules: {

  }
})
