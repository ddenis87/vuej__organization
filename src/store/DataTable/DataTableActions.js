import axios from 'axios';

export default {
  REQUEST_OPTIONS(state, option) {
    let addressApi = state.getters.GET_ADDRESS_API('option', option.tableName);
    if (state.getters.GET_DESCRIPTION(option.tableName)) { return; };
    state.commit('SET_PROCESSED_STATUS', true);
    
    let tokenAccess = state.rootGetters['Login/GET_USER_TOKEN_ACCESS'];
    console.log(tokenAccess);
    axios.defaults.headers.common = {'Authorization': tokenAccess};
    axios
      .options(addressApi)
      .then(response => {
        let mutationOption = {
          tableName: option.tableName,
          description: response.data.description,
          data: JSON.parse(response.request.response).actions.POST
        }
        state.commit('SET_OPTIONS', mutationOption);
        if (!'is_deleted' in mutationOption.data) state.commit('TOGGLE_FILTER_DEFAULT_IS_DELETED', { tableName: option.tableName, value: undefined });
        state.dispatch('REQUEST_DATA', {tableName: option.tableName});
      })
      .catch(error => console.log(error))
      .finally(() => state.commit('SET_PROCESSED_STATUS'));
  },
  
  REQUEST_DATA(state, option) {
    state.commit('SET_PROCESSED_STATUS', true);
    let filterString = state.getters.GET_FILTER_STRING(option.tableName);
    let sortingString = state.getters.GET_SORTING_STRING(option.tableName);
    let addressApi = state.getters.GET_ADDRESS_API('get', option.tableName) + filterString + sortingString;
    console.log(addressApi);
    axios
      .get(addressApi)
      .then(response => {
        let mutationOption = {
          tableName: option.tableName,
          data: response.data,
          clear: true,
        }
        state.commit('SET_DATA', mutationOption);
      })
      .catch(error => console.log(error))
      .finally(() => state.commit('SET_PROCESSED_STATUS'));
  },

  REQUEST_DATA_NEXT(state, option) {
    state.commit('SET_PROCESSED_STATUS', true);
    let addressApi = state.getters.GET_ADDRESS_API_PAGE_NEXT(option.tableName);
    console.log(addressApi);
    if (addressApi == null) { state.commit('SET_PROCESSED_STATUS'); return; };
    axios
      .get(addressApi)
      .then(response => {
        let mutationOption = {
          tableName: option.tableName,
          data: response.data,
          clear: false,
        }
        state.commit('SET_DATA', mutationOption);
      })
      .catch(error => console.log(error))
      .finally(() => state.commit('SET_PROCESSED_STATUS'));
  },

  REQUEST_DATA_DELETE(state, option) {
    state.commit('SET_PROCESSED_STATUS', true);
    let addressApi = state.getters.GET_ADDRESS_API('delete', option.tableName);
    addressApi += `${option.recordId}`;
    console.log(addressApi);
    return new Promise((resolve, reject) => {
       axios
      .delete(addressApi)
      .then(response => {
        resolve(response);
        state.dispatch('REQUEST_DATA', {tableName: option.tableName});
      })
      .catch(err => {
        console.log(err);
        reject(err);
      })
      .finally(() => state.commit('SET_PROCESSED_STATUS'));
    })
  },
}
