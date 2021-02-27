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

  REQUEST_DATA_RECORD(state, option) {
    option.data.forEach(element => {
      for (let elementKey of Object.keys(element)) {
        let elementOption = state.state[option.tableName].listOption[elementKey];
        switch(elementOption.type) {
          case 'field': {
            if (element[elementKey]) {  // ЕСЛИ ЗНАЧЕНИЕ НЕ NULL
              let relatedModelName = elementOption['related_model_name'];
              if (typeof(element[elementKey]) == 'object') {  // ЕСЛИ В ПОЛЕ FIELD ОБЪЕКТ
                if (!state.state[relatedModelName].listData.find(item => item.id == element[elementKey].id)) {
                  if (relatedModelName == option.tableName) { // ЕСЛИ ОБЪЕКТ ПРИНАДЛЕЖИТ ТЕКУЩЕЙ ТАБЛИЦЕ
                    
                    state.dispatch('REQUEST_DATA_RECORD', {
                      data: [element[elementKey]],
                      tableName: relatedModelName
                    })
                  } else {  // ЕСЛИ ОБЪЕКТ ПРИНАДЛЕЖИТ ДРУГОЙ ТАБЛИЦЕ
                    console.log('add linking relate 1 - ', element[elementKey]);
                    state.commit('SET_DATA', {tableName: relatedModelName, value: element[elementKey]});
                  }
                }
                element[elementKey] = state.state[relatedModelName].listData.find(item => item.id == element[elementKey].id);
              } else { // ЕСЛИ В ПОЛЕ FIELD ID ОБЪЕКТА
                if (!state.state[relatedModelName].listData.find(item => item.id == element[elementKey])) {
                  console.log('add linking relate 2 - ', element[elementKey]);
                  let addressApi = state.getters.GET_ADDRESS_API_BASE(option.tableName) + `id=${element[elementKey]}`;
                  console.log(addressApi);
                  axios
                    .get(addressApi)
                    .then((response) => {
                      console.log(response.data.results);
                      state.dispatch('REQUEST_DATA_RECORD', {
                        data: response.data.results,
                        tableName: relatedModelName
                      })
                      element[elementKey] = state.state[relatedModelName].listData.find(item => item.id == element[elementKey]);
                    })
                  // state[relatedModelName].listData.push(element[elementKey]); /// MUTATION
                  // state.commit('SET_DATA', {tableName: relatedModelName, value: element[elementKey]});
                } else {
                  element[elementKey] = state.state[relatedModelName].listData.find(item => item.id == element[elementKey]);
                }
                // element[elementKey] = state.state[relatedModelName].listData.find(item => item.id == element[elementKey]);
              }
            } else {
              element[elementKey] = null;
            }
            break;
          }
          case 'choice': {
            element[elementKey] = elementOption.choices.find(item => item.value == element[elementKey]);
            break;
          }
        }
      }
      if (!state.state[option.tableName].listData.find(item => item.id == element.id)) {
        // console.log('add linking - ', element);
        // state[option.tableName].listData.push(element); /// MUTATION
        state.commit('SET_DATA', {tableName: option.tableName, value: element});
      }
    });
  },

  REQUEST_DATA(state, option) {
    state.commit('SET_STATUS_PROCESSING', true);
    let filterString = state.getters.GET_FILTER_ALL(option.tableName);
    let addressApi = state.getters.GET_ADDRESS_API('get', option.tableName) + filterString;
    console.log(addressApi);
    if ('addingElement' in option) {
      addressApi += `&page_by_id=${option.addingElement.id}`;
    }
    axios
      .get(addressApi)
      .then(response => {
        // console.log(response.data.results);
        let mutationOptions = {
          tableName: option.tableName,
          data: response.data,
          clear: true,
        }
        state.commit('SET_DATA_OPTIONS', mutationOptions);
        let responseArray = response.data.results;
        responseArray.forEach(element => {
          for (let elementKey of Object.keys(element)) {
            // console.log(state);
            let elementOption = state.state[option.tableName].listOption[elementKey];
            switch(elementOption.type) {
              case 'field': {
                if (element[elementKey]) {  // ЕСЛИ ЗНАЧЕНИЕ НЕ NULL
                  // console.log(element[elementKey]);
                  let relatedModelName = elementOption['related_model_name'];

                  if (relatedModelName == option.tableName) {
                    element[elementKey] = state.state[relatedModelName].listDataGroup.find(item => item.id == element[elementKey].id);
                  } else {
                    if (!state.state[relatedModelName].listData.find(item => item.id == element[elementKey].id)) {
                      state.commit('SET_DATA', {tableName: relatedModelName, value: element[elementKey]});
                    }
                    element[elementKey] = state.state[relatedModelName].listData.find(item => item.id == element[elementKey].id);
                  }

                  // if (!state.state[relatedModelName].listData.find(item => item.id == element[elementKey].id)) {
                  //   if (relatedModelName == option.tableName) { // ЕСЛИ ОБЪЕКТ ПРИНАДЛЕЖИТ ТЕКУЩЕЙ ТАБЛИЦЕ
                  //     state.dispatch('REQUEST_DATA_RECORD', {
                  //       data: [element[elementKey]],
                  //       tableName: relatedModelName
                  //     });
                  //   } else {  // ЕСЛИ ОБЪЕКТ ПРИНАДЛЕЖИТ ДРУГОЙ ТАБЛИЦЕ
                  //     // console.log('add set_data relate - ', element[elementKey]);
                  //     state.commit('SET_DATA', {tableName: relatedModelName, value: element[elementKey]});
                  //   }
                  // }
                  // element[elementKey] = state.state[relatedModelName].listData.find(item => item.id == element[elementKey].id);
                } else {
                  element[elementKey] = null;
                }
                break;
              }
              case 'choice': {
                element[elementKey] = elementOption.choices.find(item => item.value == element[elementKey]);
                break;
              }
            }
          }
          if (!state.state[option.tableName].listData.find(item => item.id == element.id)) {
            // console.log('add set_data - ', element);
            state.commit('SET_DATA', {tableName: option.tableName, value: element});
          }
        });
      })
      .catch(error => console.log(error))
      .finally(() => state.commit('SET_STATUS_PROCESSING'));
  },


  // REQUEST_DATA(state, option) {
  //   state.commit('SET_STATUS_PROCESSING', true);
  //   let filterString = state.getters.GET_FILTER_ALL(option.tableName);
  //   let addressApi = state.getters.GET_ADDRESS_API('get', option.tableName) + filterString;

  //   if ('addingElement' in option) {
  //     addressApi += `&page_by_id=${option.addingElement.id}`;
  //   }
  //   console.log(addressApi);
    
  //   axios
  //     .get(addressApi)
  //     .then(response => {
  //       console.log(response);
  //       let mutationOptions = {
  //         tableName: option.tableName,
  //         data: response.data,
  //         clear: true,
  //       }
  //       state.commit('SET_DATA_OPTIONS', mutationOptions);
  //       state.commit('SET_DATA', mutationOptions);
  //     })
  //     .catch(error => console.log(error))
  //     .finally(() => state.commit('SET_STATUS_PROCESSING'));
  // },

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
        state.commit('SET_DATA_OPTIONS', mutationOptions);
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