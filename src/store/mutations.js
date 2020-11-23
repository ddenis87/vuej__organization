export default {
  SET_LIST_FIELDS(state, option) { state.listFields = option; },
  SET_STATUS_LOAD(state, status = false) { state.statusLoad = status; },
  SET_OPTIONS_REQUEST(state, option = {}) {
    state.optionRequest.currentPage = ('currentPage' in option) ? option.currentPage : 1;
    state.optionRequest.stringFilter = ('stringFilter' in option) ? option.stringFilter : '';
  },
  SET_LIST_BK(state, option) {
    option.forEach(item => {
      state.listDataOptions.bk.choices.push({
        value: item.id, 
        display_name: `${item.head_code} - ${item.head_name}`,
      });
    });
  },
  SET_LIST_OPTIONS(state, option) {
    state.listDataOptions = option;
    Object.assign(state.listDataOptions.bk, {choices: []});
  },
  CLEAR_LIST_DATA(state) {
    state.listFields = [];
    state.listData = [];
    state.listDataOptions = {};
    state.listSortedProps = {
      key: '',
      type: true
    };
    state.optionRequest = {
      currentPage: 1,
      stringFilter: '',
    };
  },
  SET_LIST_DATA(state, option) {
    let optionJoin = option;
    optionJoin.forEach(item => {
      for (let key of Object.keys(item)) {
        if (state.listDataOptions[key].choices && typeof(item[key]) != 'object') {
          item[key] = state.listDataOptions[key].choices.find(mitem => mitem.value == item[key]).display_name;
        }
        if (typeof(item[key]) == 'object') item[key] = `${item[key].head_code} - ${item[key].head_name}`; ///???????????
      }
      state.listData.push(item);
    })
    if (state.listSortedProps.key != '') this.SET_LIST_DATA_SORTED;
  },
  SET_LIST_DATA_SORTED(state) {
    let listSortedProps = state.listSortedProps;

    state.listData.sort(function(a, b) {
      if (listSortedProps.type == false) return a[listSortedProps.key] > b[listSortedProps.key];
      else return b[listSortedProps.key] > a[listSortedProps.key];
    });
  },
  SET_LIST_SORTED_PROPS(state, option) {
    state.listSortedProps.key = ('key' in option) ? option.key : '';
    state.listSortedProps.type = ('type' in option) ? option.type : '';
  }
}