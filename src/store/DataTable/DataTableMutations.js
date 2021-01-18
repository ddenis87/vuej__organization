export default {
  SET_IS_DATA_LOAD(state, status = false) { state.isDataLoad = status; },
  SET_FILTER_STRING(state, option = null) {
    if (option == null) { state.filterString = ''; return; }
    let filterString = '?';
    for(let item of Object.entries(option)) {
      filterString += `${item[0]}=${item[1].value}&`;
    }
    console.log(filterString);
    state.filterString = filterString;
  },
  SET_LIST_OPTION(state, option) {
    // console.log(option);
    state[option.tableName].listOption = option.data;
    state[option.tableName].description = option.description;
    if (option.tableName == 'organisations') state[option.tableName].listOption.bk.tableName = "budget-classifications";
  },

  SET_LIST_DATA(state, option) {
    if (option.clear == true) {
      state[option.tableName].listData.length = 0;
    }
    let listOption = state[option.tableName].listOption; //
    if (Array.isArray(option.data)) {
      state[option.tableName].listData = option.data;
    } else {
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
  EDITING_LIST_DATA(state, option) {
    let newItem = {};
    Object.assign(newItem, option.values);
    let index = state[option.tableName].listData.findIndex(item => item.id == option.values.id);
    // console.log(index);
    // console.log(option.values);

    state[option.tableName].listData.splice(index, 1, newItem);
  },
  EDITING_LIST_DATA_FIELD(state, option) {
    // let newItem = {};
    // Object.assign(newItem, option.values);
    let index = state[option.tableName].listData.findIndex(item => item.id == option.id);
    state[option.tableName].listData[index][option.field] = option.value;
  },
}