export default {
  SET_PROCESSED_STATUS(state, status = false) { state.processedStatus = status; },

  // FILTER
  TOGGLE_FILTER_DEFAULT_IS_DELETED(state, option) {
    state[option.tableName].filterDefault['is_deleted'] = option.value;
    // state.dispatch('REQUEST_DATA', {tableName: option.tableName});
  },
  SET_FILTER_PRIMITIVE(state, option) {
    state[option.tableName].filterExtended = '';
    if (option.filters == null) { state[option.tableName].filterPrimitive = ''; return; }
    let filterPrimitive = '';
    for(let item of Object.entries(option.filters)) {
      if ('id' in item[1]) filterPrimitive += `&${item[0]}=${item[1].id}`;
      else filterPrimitive += `&${item[0]}=${item[1].value}`;
    }
    state[option.tableName].filterPrimitive = filterPrimitive;
  },
  SET_FILTER_PRIMITIVE_CLEAR(state, option) { state[option.tableName].filterPrimitive = ''; },
  
  SET_FILTER_EXTENDED(state, option) {
    state[option.tableName].filterPrimitive = '';
    state[option.tableName].filterExtended = option.value;
  },
  SET_FILTER_EXTENDED_CLEAR(state, option) { state[option.tableName].filterExtended = ''; },

  // FREE SEARCH
  SET_FILTER_SEARCH(state, option) {
    if (option.value == null) {
      state[option.tableName].filterSearch = '';
      return;
    }
    state[option.tableName].filterSearch = `&search=${option.value.toUpperCase()}`;
  },

  // SORTING
  SET_FILTER_SORTING(state, option) {
    if (option.key == null) {
      state[option.tableName].filterSorting = '';
      return;
    }
    let filterSorting = '&ordering=';
    filterSorting += `${(option.ordering) ? '' : '-'}${option.key}`;
    state[option.tableName].filterSorting = filterSorting;
  },

  // OPTION & DATA
  SET_OPTIONS(state, option) {
    // console.log(option);
    state[option.tableName].listOption = option.data;
    state[option.tableName].description = option.description;
  },
  SET_DATA(state, option) {
    if (option.clear == true) {
      state[option.tableName].listData = [];
      // if (option.data.count == 0) {
      //   console.log('clear');
      //   // state[option.tableName].listData = [];
      //   state[option.tableName].count = 0;
      //   return;
      // };
    }
    if (Array.isArray(option.data)) {
      state[option.tableName].listData = option.data;
    } else {
      let listOption = state[option.tableName].listOption; //
      option.data.results.forEach(element => {
        for (let key of Object.keys(element)) { //
          if (listOption[key].type == 'choice') { //
            element[key] = listOption[key].choices.find(item => item.value == element[key]);
          }
        }
        state[option.tableName].listData.push(element);  //
      });
      Object.assign(state[option.tableName], option.data);
      delete state[option.tableName].results;
      // console.log(state[option.tableName]);
    }
  },

  // SET_FILTER_STRING(state, option = null) {
  //   if (option.filters == null) { state[option.tableName].filterString = ''; return; }
  //   let filterString = '&';
  //   for(let item of Object.entries(option.filters)) {
  //     if ('id' in item[1]) filterString += `${item[0]}__id=${item[1].id}&`;
  //     else filterString += `${item[0]}=${item[1].value}&`;
  //   }
  //   state[option.tableName].filterString = filterString;
  // },
  // SET_STRING_SORTING(state, option = null) {
  //   if (option.key == null) {
  //     state[option.tableName].stringSorting = '';
  //     return;
  //   }
  //   let stringSorting = '&ordering=';
  //   stringSorting += `${(option.ordering) ? '' : '-'}${option.key}`;
  //   state[option.tableName].stringSorting = stringSorting;
  // },
  // SET_STRING_FREE_SEARCH(state, option = null) {
  //   // console.log(option);
  //   if (option.value == null) {
  //     state[option.tableName].stringFreeSearch = '';
  //     return;
  //   }
  //   state[option.tableName].stringFreeSearch = `&search=${option.value.toUpperCase()}`;
  // },
  // SET_TABLE_NAME(state, option) { state[option.tableName].tableName = option.tableName; },
  
  

  

  ADDING_LIST_DATA(state, option) {
    let newItem = {};
    Object.assign(newItem, option.values);
    state[option.tableName].listData.unshift(newItem);
    console.log(state[option.tableName].listData);
  },
  DELETING_LIST_DATA(state, option) {
    let index = state[option.tableName].listData.findIndex(item => item.id == option.values.id);
    // console.log(index);
    state[option.tableName].listData.splice(index, 1);
    // console.log(state[option.tableName].listData);
  },
  EDITING_LIST_DATA(state, option) { // editing record in form
    let newItem = {};
    Object.assign(newItem, option.values);
    let index = state[option.tableName].listData.findIndex(item => item.id == option.values.id);
    state[option.tableName].listData.splice(index, 1, newItem);
  },

  // EDITING_LIST_DATA_FIELD(state, option) { // editin column in table
  //   // let newItem = {};
  //   // Object.assign(newItem, option.values);
  //   let index = state[option.tableName].listData.findIndex(item => item.id == option.id);
  //   state[option.tableName].listData[index][option.field] = option.value;
  // },

  // ACTION_ADDING_RECORD(state, option) {
  //   state[option.tableName].listData.unshift(option.values);
  // },
  ACTION_EDITING_ELEMENT(state, option) { // editin column in table
    let index = state[option.tableName].listData.findIndex(item => item.id == option.recordId);
    state[option.tableName].listData[index][option.fieldName] = option.fieldValue;
  },

}