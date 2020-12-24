export default {
  SET_IS_DATA_LOAD(state, status = false) { state.isDataLoad = status; },
  SET_LIST_OPTION(state, option) {
    state[option.tableName].listOption = option.data;
  },
  SET_LIST_DATA(state, option) { 
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
}