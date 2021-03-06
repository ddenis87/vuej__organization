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
      default: return addressApi;
    }
  },
  GET_ADDRESS_API_PAGE_NEXT:(state) => (tableName) => { return state[tableName].apiNext; },
  GET_ADDRESS_API_PAGE_PREVIOUS:(state) => (tableName) => { return state[tableName].previous; },
  GET_DESCRIPTION:(state) => (tableName) => { return state[tableName].description; },
  GET_RELATED_MODEL_VIEW:(state) => (tableName) => { return state[tableName].relatedModelView; },
  GET_HIERARCHY_MODE:(state) => (tableName) => { return state[tableName].isHierarchyMode; },

  GET_OPTIONS:(state) => (tableName) => { return state[tableName].listOption; },

  GET_DATA_GROUP:(state) => (tableName) => { return state[tableName].listDataGroup; },
  GET_DATA_GROUP_LEVEL:(state) => (tableName) => { return state[tableName].listDataGroup.length; },
  GET_DATA:(state) => (tableName, option = null) => {
    // console.log(state[tableName].listData);
    if (state[tableName].getterFilterData.parent) {
      return state[tableName].listData.filter(item => {
          if (item.parent && item.parent.id == state[tableName].getterFilterData.parent) return true;
      });
    }
    if (state[tableName].isHierarchyMode) {
      return state[tableName].listData.filter(item => {
        if (item.parent == null) return true;
      });
    }
    return state[tableName].listData;
  },

  GET_DATA_COUNT_TOTAL:(state) => (tableName) => { return state[tableName].countTotal; },
  GET_DATA_COUNT_LOAD:(state) => (tableName) => { return state[tableName].listData.length; },
  GET_DATA_INDEX:(state) => (tableName, option) => {
    let index = null;
    index = state[tableName].listData.findIndex(item => item.id == option.recordId);
    return index;
  },
  GET_MODE_ADDING_STATUS:(state) => (tableName) => { return state[tableName].modeAdding.status; },
  GET_MODE_ADDING_INDEX:(state) => (tableName) => { return state[tableName].modeAdding.index; },
  GET_MODE_ADDING_ID:(state) => (tableName) => { return state[tableName].modeAdding.recordId; },

  GET_FILTER_DEFAULT_IS_DELETED:(state) => (tableName) => { return state[tableName].filterDefault['is_deleted']; }, // ????
  GET_FILTER_PRIMITIVE:(state) => (tableName) => { return state[tableName].filterPrimitive; },
  GET_FILTER_EXTENDED:(state) => (tableName) => { return state[tableName].filterExtended; },
  GET_FILTER_SEARCH:(state) => (tableName) => { return state[tableName].filterSearch; },
  GET_FILTER_SORTING:(state) => (tableName) => {
    return state[tableName].filterSorting;
  },
  GET_FILTER_GROUP:(state) => (tableName) => { return state[tableName].filterGroup; },
  GET_FILTER_ALL:(state) => (tableName) => {
    let buildFilter = state[tableName].filterPrimitive + 
                      state[tableName].filterExtended + 
                      state[tableName].filterSearch +
                      state[tableName].filterSorting;
    if (state[tableName].isHierarchyMode) {
      state[tableName].filterDefault.ordering = '-is_group';
      buildFilter += state[tableName].apiFilterParent;
    }
    // if (state[tableName].filterParent) buildFilter += state[tableName].filterParent;
    return buildFilter;
          //  state[tableName].filterParent;
  }
}