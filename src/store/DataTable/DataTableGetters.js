export default {
  GET_PROCESSED_STATUS(state) { return state.processedStatus; },

  GET_ADDRESS_API:(state, getters, rootState, rootGetters) => (option, tableName) => {
    let addressApi = rootGetters.GETTING_ADDRESS_API + 'api/v1/' + tableName + '/';
    switch (option) {
      case 'option': return addressApi;
      case 'get': {
        addressApi += `?`;
        for (let item of Object.entries(state[tableName].filterDefault)) if (item[1] != undefined) addressApi += `&${item[0]}=${item[1]}`;
        return addressApi;
      }
      case 'delete': return addressApi;
    }
  },

  GET_ADDRESS_API_PAGE_NEXT:(state) => (tableName) => { return state[tableName].next; },
  GET_ADDRESS_API_PAGE_PREVIOUS:(state) => (tableName) => { return state[tableName].previous; },

  GET_OPTIONS:(state) => (tableName) => { return state[tableName].listOption; },
  GET_DATA:(state) => (tableName) => { return state[tableName].listData; },

  GET_DESCRIPTION:(state) => (tableName) => { return state[tableName].description; },
  GET_DATA_COUNT_TOTAL:(state) => (tableName) => { return state[tableName].countTotal; },
  GET_DATA_COUNT_LOAD:(state) => (tableName) => { return state[tableName].listData.length; },

  

  GET_FILTER_DEFAULT_IS_DELETED:(state) => (tableName) => { return state[tableName].filterDefault['is_deleted']; }, // ????

  GET_FILTER_PRIMITIVE:(state) => (tableName) => { return state[tableName].filterPrimitive; },
  GET_FILTER_EXTENDED:(state) => (tableName) => { return state[tableName].filterExtended; },
  GET_FILTER_SEARCH:(state) => (tableName) => { return state[tableName].filterSearch; },
  GET_FILTER_SORTING:(state) => (tableName) => { return state[tableName].filterSorting; },

  GET_FILTER_ALL:(state) => (tableName) => {
    console.log(state[tableName].filterPrimitive + 
                state[tableName].filterExtended + 
                state[tableName].filterSearch +
                state[tableName].filterSorting);
    return state[tableName].filterPrimitive + 
           state[tableName].filterExtended + 
           state[tableName].filterSearch +
           state[tableName].filterSorting;
  }

  //  GET_FILTER_STRING(state) { return state.filterString; },

  
  // GET_STRING_SORTING:(state) => (tableName) => { return state[tableName].stringSorting; },
  // GET_STRING_FREE_SEARCH:(state) => (tableName) => { return state[tableName].stringFreeSearch; },

  // GET_COUNT_RECORD_LOAD:(state) => (tableName) => { return state[tableName]?.countRecordLoad; },
  // GET_COUNT_RECORD:(state) => (tableName) => { return state[tableName]?.count; },

  // GET_TABLE_NAME:(state) => (tableName) => { return state[tableName].tableName; },

  // GET_LIST_OPTION:(state) => (tableName) => {
  //   // console.log(tableName);
  //   return state[tableName].listOption; 
  // },
  // GET_LIST_DATA:(state) => (tableName) => {
  //   // console.log(state[tableName]);
  //   if (tableName)
  //     return (state[tableName].listData.length != 0) ? state[tableName].listData : [];
  //   return [];
  // },
  // GET_LIST_DATA_COUNT:(state) => (tableName) => {
  //   // return (state[tableName]?.count) ? state[tableName].count : 'вычисляю...';
  //   return state[tableName]?.count;
  // },
  // GET_LIST_DATA_ROW:(state) => (tableName, rowId) => {
  //   return state[tableName].listData.find(element => element.id == rowId);
  // },
  // GET_DESCRIPTION_TABLE:(state) => (tableName) => {
  //   return state[tableName]?.description;
  // },
}