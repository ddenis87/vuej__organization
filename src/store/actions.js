import axios from 'axios';

export default {
  GET_LIST_OPTIONS(state) {
    state.commit('SET_STATUS_LOAD', true);
    state.commit('CLEAR_LIST_DATA');
    axios
      .options(`https://an67.pythonanywhere.com/api/organisations/`)
      .then(response => {
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
}