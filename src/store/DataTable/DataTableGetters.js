export default {
  GET_IS_DATA_LOAD(state) { return state.isDataLoad; },
  GET_ADDRESS_API(state) { return state.addressApi; },
  GET_ADDRESS_API_NEXT:(state) => (tableName) => { return state[tableName].next; },

  GET_LIST_OPTION:(state) => (tableName) => {
    // console.log(state[tableName].listOption);
    return state[tableName].listOption; 
  },
  GET_LIST_DATA:(state) => (tableName) => {
    console.log(state[tableName]);
    return state[tableName].listData;
  },
  GET_LIST_DATA_ROW:(state) => (tableName, rowId) => {
    return state[tableName].listData.find(element => element.id == rowId);
  },
  GET_DESCRIPTION_TABLE:(state) => (tableName) => {
    return state[tableName].description;
  },
}