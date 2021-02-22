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

    if ('addingElement' in option) {
      addressApi += `&page_by_id=${option.addingElement.id}`;
    }
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
    state.commit('SET_CLEAR_NEXT_PREV_LINK', {tableName: option.tableName});
    let addressApi = state.getters.GET_ADDRESS_API('post', option.tableName);
    console.log(addressApi);
    return new Promise((resolve, reject) => {
       axios
        .post(addressApi, option.formData)
        .then(response => {
          console.log(response);
          
          state.commit('SET_MODE_ADDING_ID', { tableName: option.tableName, recordId: response.data.id });
          state.commit('SET_DATA_CLEAR', { tableName: option.tableName });
          state.dispatch('REQUEST_DATA', {tableName: option.tableName, addingElement: response.data});
          resolve(response);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
        .finally(() => state.commit('SET_STATUS_PROCESSING'));
    })
  },
  REQUEST_DATA_EDITING(state, option) {
    state.commit('SET_STATUS_PROCESSING', true);
    let addressApi = state.getters.GET_ADDRESS_API('update', option.tableName);
    addressApi += `${option.recordId}/`;
    console.log(addressApi);
    return new Promise((resolve, reject) => {
       axios
        .put(addressApi, option.formData)
        .then(response => {
          resolve(response);
          // state.commit('SET_DATA_CLEAR', { tableName: option.tableName });
          // state.dispatch('REQUEST_DATA', {tableName: option.tableName});
          state.dispatch('REQUEST_DATA_UPDATE_RECORD', {tableName: option.tableName, recordId: option.recordId});
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
        .finally(() => state.commit('SET_STATUS_PROCESSING'));
    })
  },

  REQUEST_DATA_UPDATE_RECORD(state, option) {
    state.commit('SET_STATUS_PROCESSING', true);
    let addressApi = state.getters.GET_ADDRESS_API('get', option.tableName);
    
    addressApi += `&id=${option.recordId}`;
    console.log(addressApi);
    return new Promise((resolve, reject) => {
      axios
        .get(addressApi)
        .then(response => {
          let mutationOptions = {
            tableName: option.tableName,
            data: response.data,
            clear: false,
          }
          console.log(mutationOptions);
          state.commit('SET_DATA_RECORD', mutationOptions);
          resolve(true);
        })
        .catch(error => {
          console.log(error);
          reject(false);
        })
        .finally(() => state.commit('SET_STATUS_PROCESSING'));
    });
  },
  REQUEST_DATA_UPDATE_RECORD_ELEMENT(state, option) {
    state.commit('SET_STATUS_PROCESSING', true);
    let addressApi = state.getters.GET_ADDRESS_API('update', option.tableName);
    addressApi += `${option.recordId}/`;
    console.log(addressApi);
    return new Promise((resolve, reject) => {
       axios
        .put(addressApi, option.formData)
        .then(response => {
          state.dispatch('REQUEST_DATA_UPDATE_RECORD', {tableName: option.tableName, recordId: option.recordId})
            .then(() => resolve(response));
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
        .finally(() => state.commit('SET_STATUS_PROCESSING'));
    })
  },
}