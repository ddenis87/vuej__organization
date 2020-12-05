import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sequenceOverflowBox: 0,
    statusLoad: false,
    optionRequest: {
      currentPage: 1,
      stringFilter: '',
    },
    listFields: [],
    listData: [],
    listDataOptions: {},
    listSortedProps: {
      key: '',
      type: true
    }
  },
  getters: {
    GET_SEQUENCE_OVERFLOW_BOX(state) { return state.sequenceOverflowBox; },
    GET_STATUS_LOAD(state) { return state.statusLoad; },
    GET_OPTIONS_REQUEST(state) { return state.optionRequest; },
    GET_LIST_FIELDS(state) {     
      if (state.listFields.length == 0) {
        Object.keys(state.listDataOptions).forEach(item => {
          state.listFields.push({
            key: item, 
            label: state.listDataOptions[item].label, 
            type: state.listDataOptions[item].type,
            choices: state.listDataOptions[item].choices,
            'read_only': state.listDataOptions[item]['read_only'],
            required: state.listDataOptions[item].required,
          });
        })
      }
      return state.listFields;
    },
    GET_LIST_DATA(state) { return state.listData; },
    
    GET_LIST_FILTER(state) {
      let listFilter = [];
      for (let item of Object.keys(state.listDataOptions)) {
        if ('choices' in state.listDataOptions[item]) {
          listFilter.push({key: item, label: state.listDataOptions[item].label, choices: state.listDataOptions[item].choices});
        }
      }
      return listFilter;
    },
    GET_LIST_SORTED_PROPS(state) { return state.listSortedProps; }
  },
  mutations: {
    INCREMENT_SEQUENCE_OVERFLOW_BOX(state) { state.sequenceOverflowBox++; },
    RESET_SEQUENCE_OVERFLOW_BOX(state) { state.sequenceOverflowBox = 0; },
    SET_STATUS_LOAD(state, status = false) { state.statusLoad = status; },
    SET_OPTIONS_REQUEST(state, option = {}) {
      state.optionRequest.currentPage = ('currentPage' in option) ? option.currentPage : 1;
      state.optionRequest.stringFilter = ('stringFilter' in option) ? option.stringFilter : '';
    },

    SET_LIST_FIELDS(state, option) { state.listFields = option; },
    
    
    SET_LIST_BK(state, option) {
      option.forEach(item => {
        state.listDataOptions.bk.choices.push({
          value: item.id, 
          display_name: `${item.head_code} - ${item.head_name}`,
        });
      });
    },
    SET_LIST_OPTIONS(state, option) {
      state.listDataOptions = option;
      Object.assign(state.listDataOptions.bk, {choices: []});
    },
    CLEAR_LIST_DATA(state) {
      state.listData = [];
      state.optionRequest = {
        currentPage: 1,
        stringFilter: '',
      };
    },
    SET_LIST_DATA(state, option) {
      let optionJoin = option;
      optionJoin.forEach(item => {
        for (let key of Object.keys(item)) {
          if (state.listDataOptions[key].choices && typeof(item[key]) != 'object') {
            item[key] = state.listDataOptions[key].choices.find(mitem => mitem.value == item[key]).display_name;
          }
          if (typeof(item[key]) == 'object') item[key] = `${item[key].head_code} - ${item[key].head_name}`; ///???????????
        }
        state.listData.push(item);
      })
      if (state.listSortedProps.key != '') this.SET_LIST_DATA_SORTED;
    },
    SET_LIST_DATA_SORTED(state) {
      let listSortedProps = state.listSortedProps;

      state.listData.sort(function(a, b) {
        if (listSortedProps.type == false) return a[listSortedProps.key] > b[listSortedProps.key];
        else return b[listSortedProps.key] > a[listSortedProps.key];
      });
    },
    SET_LIST_SORTED_PROPS(state, option) {
      state.listSortedProps.key = ('key' in option) ? option.key : '';
      state.listSortedProps.type = ('type' in option) ? option.type : '';
    }
  },
  actions: {
    GET_LIST_OPTIONS(state) {
      state.commit('SET_STATUS_LOAD', true);
      state.commit('CLEAR_LIST_DATA');
      state.commit('RESET_SEQUENCE_OVERFLOW_BOX');
      axios
        .options(`https://an67.pythonanywhere.com/api/organisations/`)
        .then(response => {
          console.log(JSON.parse(response.request.response).actions.POST);
          state.commit('SET_LIST_OPTIONS', JSON.parse(response.request.response).actions.POST);
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
      state.commit('SET_STATUS_LOAD', true);
      let option = state.getters.GET_OPTIONS_REQUEST;
      axios
        .get(`https://an67.pythonanywhere.com/api/organisations/?page=${option.currentPage}${option.stringFilter}`)
        .then(response => {
          if (response.data.count !== 0) {
            state.commit('SET_LIST_DATA', response.data.results);
          } 
          else if (option.currentPage == 1) {
            state.commit('CLEAR_LIST_DATA');
          }
          state.commit('SET_OPTIONS_REQUEST', { currentPage: ++option.currentPage, stringFilter: option.stringFilter });
        })
        .catch(err => {console.log(err)})
        .finally(() => state.commit('SET_STATUS_LOAD'));
    },
  },
  modules: {

  }
})
