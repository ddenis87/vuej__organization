import axios from 'axios';

function addressApiAddingElement(option) {
  if ('addingElement' in option)
    return `&page_by_id=${option.addingElement.id}`;
  return '';
};

export default {
  CREATE_DATA_TABLE_SPACE(state, option) { state.commit('CREATE_DATA_TABLE_SPACE', option); },
  DELETE_DATA_TABLE_SPACE(state, option) { state.commit('DELETE_DATA_TABLE_SPACE', option); },

  // ----NAVIGATION GROUP-------------------------------------------------------
  SELECTED_GROUP(state, option) {
    state.commit('CHANGE_DATA_GROUP_LEGEND', option);
    state.commit('SET_FILTER_PARENT', option);
    state.dispatch('REQUEST_DATA', option);
    console.log(state.state[option.tableName][option.guid]);
  },
  // ---------------------------------------------------------------------------

  // ----ADDING ELEMENT---------------------------------------------------------
  ADDING_INLINE_ELEMENT(state, option) {
    state.commit('ADDING_INLINE_ELEMENT', option);
  },
  
  ADDING_INLINE_ELEMENT_FIELD(state, option) {
    state.commit('ADDING_INLINE_ELEMENT_FIELD', option);
    //ТУТ запись на api
  },

  DELETING_INLINE_ELEMENT(state, option) {
    state.commit('DELETING_INLINE_ELEMENT', option);
  },
  // ---------------------------------------------------------------------------

  // ----FILTERS----------------------------------------------------------------
  SET_FILTER_GROUP(state, option) {
    console.log(option);
    state.commit('SET_FILTER_GROUP', option);
    state.dispatch('REQUEST_DATA', option);
  },
  SET_FILTER_SORTING(state, option) {
    state.commit('CLEAR_DATA', option);
    state.commit('SET_FILTER_SORTING', option);
    state.dispatch('REQUEST_DATA', option);
  },
  SET_FILTER_EXTENDED(state, option) {
    state.commit('CLEAR_DATA', option);
    state.commit('SET_FILTER_EXTENDED', option);
    state.dispatch('REQUEST_DATA', option);
  },
  SET_FILTER_DELETED(state, option) {
    state.commit('CLEAR_DATA', option);
    state.commit('SET_FILTER_DELETED', option);
    state.dispatch('REQUEST_DATA', option);
  },
  // ---------------------------------------------------------------------------

  // ----API--------------------------------------------------------------------
  REQUEST_OPTIONS(state, option) {
    if (state.getters.GET_DESCRIPTION(option.tableName)) {
      state.commit('UPDATE_OPTIONS', option);
      return;
    }
    let addressApi = state.getters.GET_ADDRESS_API('options', option.tableName);

    state.commit('SET_STATUS_PROCESSING', {
      tableName: option.tableName,
      guid: option.guid,
      status: true,
    });
    let tokenAccess = state.rootGetters['Login/GET_USER_TOKEN_ACCESS'];
    axios.defaults.headers.common = {'Authorization': tokenAccess};
    return new Promise((resolve, reject) => {
      axios
        .options(addressApi)
        .then(response => {
          let mutationOptions = {
            tableName: option.tableName,
            guid: option.guid,
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
        .finally(() => state.commit('SET_STATUS_PROCESSING',{
          tableName: option.tableName,
          guid: option.guid,
          status: false,
        }));
      });
  },

  REQUEST_DATA(state, option) {

    let filterApi = state.getters.GET_FILTER_API({
      tableName: option.tableName,
      guid: option.guid,
    });
    let addressApi = state.getters.GET_ADDRESS_API('get', option.tableName) + filterApi;

    addressApi += addressApiAddingElement(option); // Если добавляем элемент
    
    if (option.next) {
      addressApi = state.getters.GET_ADDRESS_API_PAGE_NEXT({
        tableName: option.tableName,
        guid: option.guid,
      });
      if (!addressApi) {
        return;
      }
    }
    console.log(addressApi);
    state.commit('SET_STATUS_PROCESSING', {
      tableName: option.tableName,
      guid: option.guid,
      status: true,
    });
    axios
      .get(addressApi)
      .then(response => {
        // testCommit(state);
        let mutationOptions = {
          tableName: option.tableName,
          guid: option.guid,
          data: response.data,
          clear: (option.next) ? false : true,
        }
        state.commit('SET_DATA_OPTIONS', mutationOptions);
        let responseArray = response.data.results;
        responseArray.forEach(element => {
          
          // if (listDataIndex >= 0) {
          //   state.state[option.tableName].listData[listDataIndex]
          // }
          // if (state.state[option.tableName].listData.find(item => item.id == element.id)) return; // Если элемент уже в таблице, пропускаем
          for (let elementKey of Object.keys(element)) { // Проходим по полям элемента
            let elementOption = state.state[option.tableName].listOption[elementKey];
            switch(elementOption.type) {
              case 'field': {
                if (element[elementKey]) {  // ЕСЛИ ЗНАЧЕНИЕ НЕ NULL
                //   // console.log(element[elementKey]);
                  let relatedModelName = elementOption['related_model_name'];

                  if (relatedModelName == option.tableName) {
                    if (!state.state[relatedModelName].listData.find(item => item.id == element[elementKey].id)) {
                      state.commit('SET_DATA', {tableName: relatedModelName, value: element[elementKey]});
                      // запустить проход по полям элемента
                    }
                    element[elementKey] = state.state[relatedModelName].listData.find(item => item.id == element[elementKey].id);
                  } else { // Если ссылка на другую таблицу
                    if (!state.state[relatedModelName].listData.find(item => item.id == element[elementKey].id)) {
                      state.commit('SET_DATA', {tableName: relatedModelName, value: element[elementKey]});
                      // запустить проход по полям элемента
                    }
                    element[elementKey] = state.state[relatedModelName].listData.find(item => item.id == element[elementKey].id);
                  }
                }
                break;
              }
              case 'choice': {
                element[elementKey] = elementOption.choices.find(item => item.value == element[elementKey]);
                break;
              }
            }
          }
          state.commit('SET_DATA', {tableName: option.tableName, value: element});
        });
      })
      .catch(error => console.log(error))
      .finally(() => state.commit('SET_STATUS_PROCESSING', {
        tableName: option.tableName,
        guid: option.guid,
        status: false,
      }));
  },

  REQUEST_DATA_ELEMENT(state, option) {
    let addressApi = state.getters.GET_ADDRESS_API('get', option.tableName);
    addressApi += `&id=${option.elementId}`;

    state.commit('SET_STATUS_PROCESSING', {
      tableName: option.tableName,
      guid: option.guid,
      status: true,
    });
    return new Promise((resolve, reject) => {
      axios
        .get(addressApi)
        .then(response => {
          let responseArray = response.data.results;
          responseArray.forEach(element => {
            for (let elementKey of Object.keys(element)) { // Проходим по полям элемента
              let elementOption = state.state[option.tableName].listOption[elementKey];
              switch(elementOption.type) {
                case 'field': {
                  if (element[elementKey]) {  // ЕСЛИ ЗНАЧЕНИЕ НЕ NULL
                    let relatedModelName = elementOption['related_model_name'];
                    if (relatedModelName == option.tableName) {
                      if (!state.state[relatedModelName].listData.find(item => item.id == element[elementKey].id)) {
                        state.commit('SET_DATA', {tableName: relatedModelName, value: element[elementKey]});
                        // запустить проход по полям элемента
                      }
                      element[elementKey] = state.state[relatedModelName].listData.find(item => item.id == element[elementKey].id);
                    } else { // Если ссылка на другую таблицу
                      if (!state.state[relatedModelName].listData.find(item => item.id == element[elementKey].id)) {
                        state.commit('SET_DATA', {tableName: relatedModelName, value: element[elementKey]});
                        // запустить проход по полям элемента
                      }
                      element[elementKey] = state.state[relatedModelName].listData.find(item => item.id == element[elementKey].id);
                    }
                  }
                  break;
                }
                case 'choice': {
                  element[elementKey] = elementOption.choices.find(item => item.value == element[elementKey]);
                  break;
                }
              }
            }
            state.commit('SET_DATA', {tableName: option.tableName, value: element});
          });
          
          resolve(true);
        })
        .catch(error => {
          console.log(error);
          reject(false);
        })
        .finally(() => state.commit('SET_STATUS_PROCESSING', {
          tableName: option.tableName,
          guid: option.guid,
          status: false,
        }));
    });
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

  // REQUEST_DATA_NEXT(state, option) {
  //   state.commit('SET_STATUS_PROCESSING', true);
  //   let addressApi = state.getters.GET_ADDRESS_API_PAGE_NEXT(option.tableName);
  //   console.log(addressApi);
  //   if (addressApi == null) { state.commit('SET_STATUS_PROCESSING'); return; };
  //   axios
  //     .get(addressApi)
  //     .then(response => {
  //       let mutationOptions = {
  //         tableName: option.tableName,
  //         data: response.data,
  //         clear: false,
  //       }
  //       state.commit('SET_DATA_OPTIONS', mutationOptions);
  //       state.commit('SET_DATA', mutationOptions);
  //     })
  //     .catch(error => console.log(error))
  //     .finally(() => state.commit('SET_STATUS_PROCESSING'));
  // },

  // REQUEST_DATA_DELETE(state, option) {
  //   state.commit('SET_STATUS_PROCESSING', true);
  //   let addressApi = state.getters.GET_ADDRESS_API('delete', option.tableName);
  //   addressApi += `${option.recordId}`;
  //   console.log(addressApi);
  //   return new Promise((resolve, reject) => {
  //      axios
  //       .delete(addressApi)
  //       .then(response => {
  //         resolve(response);
  //         state.commit('SET_DATA_CLEAR', { tableName: option.tableName });
  //         state.dispatch('REQUEST_DATA', {tableName: option.tableName});
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         reject(err);
  //       })
  //       .finally(() => state.commit('SET_STATUS_PROCESSING'));
  //   })
  // },
  // REQUEST_DATA_ADDING(state, option) {
  //   state.commit('SET_STATUS_PROCESSING', true);
  //   state.commit('CLEAR_API_LINK', {tableName: option.tableName});
  //   let addressApi = state.getters.GET_ADDRESS_API('post', option.tableName);
  //   console.log(addressApi);
  //   return new Promise((resolve, reject) => {
  //      axios
  //       .post(addressApi, option.formData)
  //       .then(response => {
  //         console.log(response);
          
  //         state.commit('SET_MODE_ADDING_ID', { tableName: option.tableName, recordId: response.data.id });
  //         state.commit('SET_DATA_CLEAR', { tableName: option.tableName });
  //         state.dispatch('REQUEST_DATA', {tableName: option.tableName, addingElement: response.data});
  //         resolve(response);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         reject(err);
  //       })
  //       .finally(() => state.commit('SET_STATUS_PROCESSING'));
  //   })
  // },
  // REQUEST_DATA_EDITING(state, option) {
  //   state.commit('SET_STATUS_PROCESSING', true);
  //   let addressApi = state.getters.GET_ADDRESS_API('update', option.tableName);
  //   addressApi += `${option.recordId}/`;
  //   console.log(addressApi);
  //   return new Promise((resolve, reject) => {
  //      axios
  //       .put(addressApi, option.formData)
  //       .then(response => {
  //         resolve(response);
  //         // state.commit('SET_DATA_CLEAR', { tableName: option.tableName });
  //         // state.dispatch('REQUEST_DATA', {tableName: option.tableName});
  //         state.dispatch('REQUEST_DATA_UPDATE_RECORD', {tableName: option.tableName, recordId: option.recordId});
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         reject(err);
  //       })
  //       .finally(() => state.commit('SET_STATUS_PROCESSING'));
  //   })
  // },

  // REQUEST_DATA_UPDATE_RECORD(state, option) {
  //   state.commit('SET_STATUS_PROCESSING', true);
  //   let addressApi = state.getters.GET_ADDRESS_API('get', option.tableName);
    
  //   addressApi += `&id=${option.recordId}`;
  //   console.log(addressApi);
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get(addressApi)
  //       .then(response => {
  //         let mutationOptions = {
  //           tableName: option.tableName,
  //           data: response.data,
  //           clear: false,
  //         }
  //         console.log(mutationOptions);
  //         state.commit('SET_DATA_RECORD', mutationOptions);
  //         resolve(true);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         reject(false);
  //       })
  //       .finally(() => state.commit('SET_STATUS_PROCESSING'));
  //   });
  // },
  ADDING_ELEMENT(state, option) {
    state.commit('SET_STATUS_PROCESSING', {
      tableName: option.tableName,
      guid: option.guid,
      status: true,
    });
    state.commit('CLEAR_API_LINK', {tableName: option.tableName, guid: option.guid});
    let addressApi = state.getters.GET_ADDRESS_API('post', option.tableName);
    // console.log(addressApi);
    return new Promise((resolve, reject) => {
       axios
        .post(addressApi, option.formData)
        .then(response => {
          state.commit('SET_MODE_ADDING_ID', { tableName: option.tableName, recordId: response.data.id, guid: option.guid });
          state.commit('CLEAR_DATA', { tableName: option.tableName });
          state.dispatch('REQUEST_DATA', {tableName: option.tableName, addingElement: response.data, guid: option.guid});
          resolve(response);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
        .finally(() => state.commit('SET_STATUS_PROCESSING', {
          tableName: option.tableName,
          guid: option.guid,
          status: false,
        }));
    })
  },

  UPDATE_ELEMENT(state, option) {
    state.commit('SET_STATUS_PROCESSING', {
      tableName: option.tableName,
      guid: option.guid,
      status: true,
    });
    let addressApi = state.getters.GET_ADDRESS_API('update', option.tableName);
    addressApi += `${option.elementId}/`;
    console.log(addressApi);
    return new Promise((resolve, reject) => {
      axios
      .put(addressApi, option.formData)
      .then(response => {
        state.dispatch('REQUEST_DATA_ELEMENT', {tableName: option.tableName, elementId: option.elementId, guid: option.guid})
          .then(() => resolve(response));
      })
      .catch(err => {
        console.log(err);
        reject(err);
      })
      .finally(() => state.commit('SET_STATUS_PROCESSING', {
        tableName: option.tableName,
        guid: option.guid,
        status: false,
      }));
    })
  },

  DELETE_ELEMENT(state, option) {
    state.commit('SET_STATUS_PROCESSING', {
      tableName: option.tableName,
      guid: option.guid,
      status: true,
    });
    let addressApi = state.getters.GET_ADDRESS_API('delete', option.tableName);
    addressApi += `${option.elementId}`;
    console.log(addressApi);
    return new Promise((resolve, reject) => {
        axios
        .delete(addressApi)
        .then(response => {
          let sendOption = {
            tableName: option.tableName,
            elementId: option.elementId,
          };

          state.commit('DELETE_DATA_ELEMENT', sendOption);
          resolve(response);
          // state.commit('SET_DATA_CLEAR', { tableName: option.tableName });
          // state.dispatch('REQUEST_DATA', {tableName: option.tableName});
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
        .finally(() => state.commit('SET_STATUS_PROCESSING', {
          tableName: option.tableName,
          guid: option.guid,
          status: false,
        }));
    })
  }
}