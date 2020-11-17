export default {
  GET_STATUS_LOAD(state) { return state.statusLoad; },
  GET_OPTIONS_REQUEST(state) { return state.optionRequest; },
  GET_LIST_FIELDS(state) {     
    if (state.listFields.length == 0) {
      Object.keys(state.listDataOptions).forEach(item => {
        state.listFields.push( {key: item, label: state.listDataOptions[item].label} );
      })
    }
    return state.listFields;
  }, 
  GET_LIST_FILTER(state) {
    let listFilter = [];
    for (let item of Object.keys(state.listDataOptions)) {
      if ('choices' in state.listDataOptions[item]) {
        listFilter.push({key: item, label: state.listDataOptions[item].label, choices: state.listDataOptions[item].choices});
      }
    }
    return listFilter;
  },
  GET_LIST_DATA(state) { return state.listData; },
}