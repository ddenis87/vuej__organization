export default {
  GET_STATUS_PROCESSING(state) { return state.statusProcessing; },
  GET_ADDRESS_API:(state, getters, rootState, rootGetters) => (option, tableName) => {
    let addressApi = `${rootGetters.GET_ADDRESS_API}api/v1/${tableName}/?`;

    switch (option) {
      case 'options': return addressApi;
      case 'post':
      case 'update':
      case 'delete': return addressApi.slice(0, -1);
      case 'get': {
        for (let item of Object.entries(state[tableName].filterDefault)) addressApi += `&${item[0]}=${item[1]}`;
        return addressApi;
      }
    }
    // return addressApi.slice(0, -1);
  },
  GET_ADDRESS_API_PAGE_NEXT:(state) => (tableName) => { return state[tableName].next; },
  GET_ADDRESS_API_PAGE_PREVIOUS:(state) => (tableName) => { return state[tableName].previous; },

  GET_DESCRIPTION:(state) => (tableName) => { return state[tableName].description; },
  GET_RELATED_MODEL_VIEW:(state) => (tableName) => { return state[tableName].relatedModelView; },

  GET_OPTIONS:(state) => (tableName) => { return state[tableName].listOption; },

  GET_DATA:(state) => (tableName) => { return state[tableName].listData; },
  GET_DATA_COUNT_TOTAL:(state) => (tableName) => { return state[tableName].countTotal; },
  GET_DATA_COUNT_LOAD:(state) => (tableName) => { return state[tableName].listData.length; },

  GET_FILTER_DEFAULT_IS_DELETED:(state) => (tableName) => { return state[tableName].filterDefault['is_deleted']; }, // ????
  GET_FILTER_PRIMITIVE:(state) => (tableName) => { return state[tableName].filterPrimitive; },
  GET_FILTER_EXTENDED:(state) => (tableName) => { return state[tableName].filterExtended; },
  GET_FILTER_SEARCH:(state) => (tableName) => { return state[tableName].filterSearch; },
  GET_FILTER_SORTING:(state) => (tableName) => { return state[tableName].filterSorting; },
  GET_FILTER_ALL:(state) => (tableName) => {
    return state[tableName].filterPrimitive + 
           state[tableName].filterExtended + 
           state[tableName].filterSearch +
           state[tableName].filterSorting;
  }
}