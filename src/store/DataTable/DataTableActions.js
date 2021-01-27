import axios from 'axios';

export default {
  GET_LIST_OPTION(state, option) {
    let addressApi = state.getters.GETTING_ADDRESS_API('option', option.tableName);
    if (state.getters.GET_DESCRIPTION_TABLE(option.tableName)) { return; };
    state.commit('SET_IS_DATA_LOAD', true);
    
    let tokenAccess = state.rootGetters['Login/GET_USER_TOKEN_ACCESS'];
    axios.defaults.headers.common = {'Authorization': tokenAccess};
    axios
      .options(addressApi)
      .then(response => {
        console.log(response);
        let mutationOption = {
          tableName: option.tableName,
          description: response.data.description,
          data: JSON.parse(response.request.response).actions.POST
        }
        state.commit('SET_LIST_OPTION', mutationOption);
        state.dispatch('GET_LIST_DATA', {tableName: option.tableName});
      })
      .catch(error => console.log(error))
      .finally(() => state.commit('SET_IS_DATA_LOAD'));
  },
  
  GET_LIST_DATA(state, option) {
    state.commit('SET_IS_DATA_LOAD', true);
    let addressApi = state.getters.GETTING_ADDRESS_API('get', option.tableName);
    console.log(addressApi);
    axios
      .get(addressApi)
      .then(response => {
        let mutationOption = {
          tableName: option.tableName,
          data: response.data,
          clear: true,
        }
        // console.log(mutationOption);
        state.commit('SET_LIST_DATA', mutationOption);
      })
      .catch(error => console.log(error))
      .finally(() => state.commit('SET_IS_DATA_LOAD'));
  },

  GET_LIST_DATA_NEXT(state, option) {
    state.commit('SET_IS_DATA_LOAD', true);
    let filterString = state.getters.GET_FILTER_STRING(option.tableName);
    console.log(state.getters.GET_ADDRESS_API_NEXT(option.tableName) + filterString);
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
