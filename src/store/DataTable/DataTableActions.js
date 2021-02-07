import axios from 'axios';

export default {
  REQUEST_OPTIONS(state, option) {
    if (state.getters.GET_DESCRIPTION(option.tableName)) return;
    let addressApi = state.getters.GET_ADDRESS_API('options', option.tableName);
    state.commit('SET_STATUS_PROCESSING', true);
    let tokenAccess = state.rootGetters['Login/GET_USER_TOKEN_ACCESS'];
    axios.defaults.headers.common = {'Authorization': tokenAccess};
    return new Promise((resolve, reject) => {
      axios
        .options(addressApi)
        .then(response => {
          let mutationOptions = {
            tableName: option.tableName,
            description: response.data.description,
            data: JSON.parse(response.request.response).actions.POST
          };
          state.commit('SET_OPTIONS', mutationOptions);
          resolve();
        })
        .catch(error => {
          console.log(error);
          reject();
        })
        .finally(() => state.commit('SET_STATUS_PROCESSING'));
      });
  },

  REQUEST_DATA(state, option) {
    state.commit('SET_STATUS_PROCESSING', true);
    let filterString = state.getters.GET_FILTER_ALL(option.tableName);
    let addressApi = state.getters.GET_ADDRESS_API('get', option.tableName) + filterString;
    console.log(addressApi);
    
    axios
      .get(addressApi)
      .then(response => {
        let mutationOptions = {
          tableName: option.tableName,
          data: response.data,
          clear: true,
        }
        state.commit('SET_DATA', mutationOptions);
      })
      .catch(error => console.log(error))
      .finally(() => state.commit('SET_STATUS_PROCESSING'));
  },

  REQUEST_DATA_NEXT(state, option) {
    state.commit('SET_STATUS_PROCESSING', true);
    let addressApi = state.getters.GET_ADDRESS_API_PAGE_NEXT(option.tableName);
    console.log(addressApi);
    if (addressApi == null) { state.commit('SET_STATUS_PROCESSING'); return; };
    axios
      .get(addressApi)
      .then(response => {
        let mutationOptions = {
          tableName: option.tableName,
          data: response.data,
          clear: false,
        }
        state.commit('SET_DATA', mutationOptions);
      })
      .catch(error => console.log(error))
      .finally(() => state.commit('SET_STATUS_PROCESSING'));
  },

  REQUEST_DATA_DELETE(state, option) {
    state.commit('SET_STATUS_PROCESSING', true);
    let addressApi = state.getters.GET_ADDRESS_API('delete', option.tableName);
    addressApi += `${option.recordId}`;
    console.log(addressApi);
    return new Promise((resolve, reject) => {
       axios
        .delete(addressApi)
        .then(response => {
          resolve(response);
          state.commit('SET_DATA_CLEAR', { tableName: option.tableName });
          state.dispatch('REQUEST_DATA', {tableName: option.tableName});
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
        .finally(() => state.commit('SET_STATUS_PROCESSING'));
    })
  },
  REQUEST_DATA_ADDING(state, option) {
    state.commit('SET_STATUS_PROCESSING', true);
    let addressApi = state.getters.GET_ADDRESS_API('post', option.tableName);
    // addressApi += `${option.recordId}`;
    let tokenAccess = state.rootGetters['Login/GET_USER_TOKEN_ACCESS'];
    axios.defaults.headers.common = {'Authorization': tokenAccess, 'Content-Type': 'multipart/form-data'};
    // axios.defaults.headers.common = {  };
    axios.data = option.values;
    console.log(addressApi);
    return new Promise((resolve, reject) => {
       axios
        .post(addressApi)
        .then(response => {
          resolve(response);
          state.commit('SET_DATA_CLEAR', { tableName: option.tableName });
          state.dispatch('REQUEST_DATA', {tableName: option.tableName});
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
        .finally(() => state.commit('SET_STATUS_PROCESSING'));
    })
  },
}