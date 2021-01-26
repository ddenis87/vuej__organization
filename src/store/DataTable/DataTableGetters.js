export default {
  GET_IS_DATA_LOAD(state) { return state.isDataLoad; },
  GET_ADDRESS_API(state) { return state.addressApi; },
  GET_ADDRESS_API_NEXT:(state) => (tableName) => { return state[tableName].next; },

  // GET_FILTER_STRING(state) { return state.filterString; },
  GET_FILTER_STRING:(state) => (tableName) => { return state[tableName]?.filterString; },
  GET_STRING_SORTING:(state) => (tableName) => { return state[tableName].stringSorting; },
  GET_STRING_FREE_SEARCH:(state) => (tableName) => { return state[tableName].stringFreeSearch; },

  GET_COUNT_RECORD_LOAD:(state) => (tableName) => { return state[tableName]?.countRecordLoad; },

  // GET_TABLE_NAME:(state) => (tableName) => { return state[tableName].tableName; },

  GET_LIST_OPTION:(state) => (tableName) => {
    // console.log(tableName);
    return state[tableName].listOption; 
  },
  GET_LIST_DATA:(state) => (tableName) => {
    // console.log(state[tableName]);
    if (tableName)
      return (state[tableName].listData.length != 0) ? state[tableName].listData : [];
    return [];
  },
  GET_LIST_DATA_COUNT:(state) => (tableName) => {
    // return (state[tableName]?.count) ? state[tableName].count : 'вычисляю...';
    return state[tableName]?.count;
  },
  GET_LIST_DATA_ROW:(state) => (tableName, rowId) => {
    return state[tableName].listData.find(element => element.id == rowId);
  },
  GET_DESCRIPTION_TABLE:(state) => (tableName) => {
    return state[tableName]?.description;
  },
}