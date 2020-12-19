import axios from 'axios';

export default {
  namespaced: true,
  state: {
    isDataLoad: false,
    listDataOption: {},
    listField: [],
    listData: [],
    optionRequest: {
      currentPage: 1,
      stringFilter: '',
    },
    sequenceOverflowBox: 0,
  },
  getters: {
    GET_IS_DATA_LOAD(state) { return state.isDataLoad; },
    GET_SEQUENCE_OVERFLOW_BOX(state) { return state.sequenceOverflowBox; },
    GET_LIST_OPTION(state) { return state.listDataOption; },
    GET_LIST_FIELD(state) {
      if (state.listField.length == 0) {
        Object.keys(state.listDataOption).forEach(item => {
          state.listDataOption[item].key = item;
          state.listField.push( state.listDataOption[item]);
        })
      }
      // console.log()
      return state.listField;
    },
    GET_OPTIONS_REQUEST(state) { return state.optionRequest; },
    GET_LIST_DATA(state) { return state.listData; },
  },
  mutations: {
    SET_IS_DATA_LOAD(state, status = false) { state.isDataLoad = status; },
    INCREMENT_SEQUENCE_OVERFLOW_BOX(state) { state.sequenceOverflowBox++; },
    SET_LIST_OPTION(state, option) {
      state.listDataOption = option;
      Object.assign(state.listDataOption.bk, {choices: []});
    },
    SET_LIST_BK(state, option) {
      option.forEach(item => {
        state.listDataOption.bk.choices.push({
          value: item.id, 
          display_name: `${item.head_code} - ${item.head_name}`,
          // display_name: `${item.head_name}`,
        });
      });
    },
    SET_LIST_DATA(state, option) {
      let optionJoin = option;
      optionJoin.forEach(item => {
        for (let key of Object.keys(item)) {
          if (state.listDataOption[key].choices && typeof(item[key]) != 'object') {
            item[key] = state.listDataOption[key].choices.find(mitem => mitem.value == item[key]).display_name;
          }
          if (typeof(item[key]) == 'object') item[key] = `${item[key].head_code} - ${item[key].head_name}`; ///???????????
          // if (typeof(item[key]) == 'object') item[key] = `${item[key].head_name}`; ///???????????
        }
        state.listData.push(item);
      })
      // if (state.listSortedProps.key != '') this.SET_LIST_DATA_SORTED;
    },
    SET_OPTIONS_REQUEST(state, option = {}) {
      state.optionRequest.currentPage = ('currentPage' in option) ? option.currentPage : 1;
      state.optionRequest.stringFilter = ('stringFilter' in option) ? option.stringFilter : '';
    },
  },
  actions: {
    GET_LIST_OPTION(state) {
      state.commit('SET_IS_DATA_LOAD', true);
      axios
        .options(`https://an67.pythonanywhere.com/api/organisations/`)
        .then(response => {
          // console.log(JSON.parse(response.request.response).actions.POST);
          state.commit('SET_LIST_OPTION', JSON.parse(response.request.response).actions.POST);
          state.dispatch('GET_LIST_BK');
        })
        .catch(err => {console.log(err)})
    },
    GET_LIST_BK(state) {
      axios
        .get(`https://an67.pythonanywhere.com/api/budget-classifications/`)
        .then(response => {
          state.commit('SET_LIST_BK', response.data);
          state.dispatch('GET_LIST_DATA');
        })
        .catch(err => {console.log(err)})
    },
    GET_LIST_DATA(state) {
      state.commit('SET_IS_DATA_LOAD', true);
      let option = state.getters.GET_OPTIONS_REQUEST;
      axios
        .get(`https://an67.pythonanywhere.com/api/organisations/?page=${option.currentPage}${option.stringFilter}`)
        .then(response => {
          // console.log(response.data.results);
          if (response.data.count !== 0) {
            state.commit('SET_LIST_DATA', response.data.results);
          } 
          else if (option.currentPage == 1) {
            state.commit('CLEAR_LIST_DATA');
          }
          state.commit('SET_OPTIONS_REQUEST', { currentPage: ++option.currentPage, stringFilter: option.stringFilter });
        })
        .catch(err => {console.log(err)})
        .finally(() => state.commit('SET_IS_DATA_LOAD'));
    },
  },

}