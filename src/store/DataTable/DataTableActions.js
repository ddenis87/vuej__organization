import axios from 'axios';
export default {
  GET_LIST_OPTION(state, option) {
    // console.log('activ');
    if (state.getters.GET_DESCRIPTION_TABLE(option.tableName)) { return; };
    state.commit('SET_IS_DATA_LOAD', true);
    axios
      .options(state.getters.GET_ADDRESS_API + option.tableName)
      .then(response => {
        // console.log(response);
        let mutationOption = {
          tableName: option.tableName,
          description: response.data.description,
          data: JSON.parse(response.request.response).actions.POST
        }
        state.commit('SET_LIST_OPTION', mutationOption);
        state.dispatch('GET_LIST_DATA', {tableName: option.tableName});
      })
      .catch(err => {console.log(err)})
      // .finally(() => state.commit('SET_IS_DATA_LOAD'));
  },
  
  GET_LIST_DATA(state, option) {
    state.commit('SET_IS_DATA_LOAD', true);
    let filterString = state.getters.GET_FILTER_STRING;
    axios
      .get(state.getters.GET_ADDRESS_API + option.tableName + filterString)
      .then(response => {
        let mutationOption = {
          tableName: option.tableName,
          data: response.data,
          clear: true,
        }
        state.commit('SET_LIST_DATA', mutationOption);
      })
      .catch(err => {console.log(err)})
      .finally(() => state.commit('SET_IS_DATA_LOAD'));
  },
  GET_LIST_DATA_NEXT(state, option) {
    state.commit('SET_IS_DATA_LOAD', true);
    let filterString = state.getters.GET_FILTER_STRING;
    axios
      .get(state.getters.GET_ADDRESS_API_NEXT(option.tableName) + filterString)
      .then(response => {
        let mutationOption = {
          tableName: option.tableName,
          data: response.data,
          clear: false,
        }
        state.commit('SET_LIST_DATA', mutationOption);
      })
      .catch(err => {console.log(err)})
      .finally(() => state.commit('SET_IS_DATA_LOAD'));
  },
}
