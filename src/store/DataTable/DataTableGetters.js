export default {
  GET_STATUS_PROCESSING:(state) => (option) => { return state[option.tableName][option.guid].statusProcessing; },
  GET_ADDRESS_API:(state, getters, rootState, rootGetters) => (option, tableName) => {
    let addressApi = `${rootGetters.GET_ADDRESS_API}api/v1/${tableName}/?`;
    switch (option) {
      case 'options': return addressApi;
      case 'post':
      case 'update':
      case 'delete': return addressApi.slice(0, -1);
      case 'get': {
        return addressApi;
      }
      default: return addressApi;
    }
  },
  GET_FILTER_API:(state) => (option) => {
    let filter = state[option.tableName][option.guid].filter;
    let filterApi = '';
    Object.keys(filter).forEach(key => {
      if(filter[key] != null) {
        // console.log(filter[key]);
        filterApi += `&${key}=${filter[key]}`;
      }
    })
    if (state[option.tableName][option.guid].filterExtended) filterApi += state[option.tableName][option.guid].filterExtended;
    // console.log(filterApi);
    return filterApi;
  },

  GET_ADDRESS_API_PAGE_NEXT:(state) => (option) => { return state[option.tableName][option.guid].apiNext; },
  GET_ADDRESS_API_PAGE_PREVIOUS:(state) => (option) => { return state[option.tableName][option.guid].previous; },
  GET_DESCRIPTION:(state) => (tableName) => { return state[tableName].description; },
  GET_RELATED_MODEL_VIEW:(state) => (tableName) => { return state[tableName].relatedModelView; },
  GET_HIERARCHY_MODE:(state) => (tableName) => { return state[tableName].isHierarchyMode; },

  GET_OPTIONS:(state) => (tableName) => { return state[tableName].listOption; },

  GET_DATA_GROUP:(state) => (option) => { return state[option.tableName][option.guid].listDataGroup; },
  GET_DATA_GROUP_LEVEL:(state) => (option) => { return state[option.tableName][option.guid].listDataGroup.length; },
  
  GET_DATA:(state) => (option) => {
    if (!option.guid) {
      return state[option.tableName].listData;
    }
    if (state[option.tableName][option.guid].filter['is_deleted'] == true) {
      return state[option.tableName].listData.filter(item => {
        if (item.is_deleted == true) return true;
      });
    }
    if (state[option.tableName][option.guid].filter['parent']) {
      if (state[option.tableName][option.guid].filter['is_group']) {
        return state[option.tableName].listData.filter(item => {
          if (item.parent && item.parent.id == state[option.tableName][option.guid].filter['parent'] &&
            item.is_group) return true;
        });
      } else {
        return state[option.tableName].listData.filter(item => {
            if (item.parent && item.parent.id == state[option.tableName][option.guid].filter['parent']) return true;
        });
      }
    }
    if (state[option.tableName][option.guid].filter['is_group']) {
      return state[option.tableName].listData.filter(item => item.is_group && item.parent == null);
    }
    if (state[option.tableName].isHierarchyMode) {
      return state[option.tableName].listData.filter(item => {
        if (item.parent == null) return true;
      });
    }
    return state[option.tableName].listData;
  },

  // ---------------------------------------------------------------------------
  GET_ADDING_MODE:(state) => (option) => { return state[option.tableName][option.guid].addingMode; },
  
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------



  GET_DATA_COUNT_TOTAL:(state) => (tableName) => { return state[tableName].countTotal; },
  GET_DATA_COUNT_LOAD:(state) => (tableName) => { return state[tableName].listData.length; },
  GET_DATA_INDEX:(state) => (tableName, option) => {
    let index = null;
    index = state[tableName].listData.findIndex(item => item.id == option.recordId);
    return index;
  },
  // GET_MODE_ADDING_STATUS:(state) => (tableName) => { return state[tableName].modeAdding.status; },
  // GET_MODE_ADDING_INDEX:(state) => (tableName) => { return state[tableName].modeAdding.index; },
  // GET_MODE_ADDING_ID:(state) => (tableName) => { return state[tableName].modeAdding.recordId; },

  GET_FILTER_DEFAULT_IS_DELETED:(state) => (tableName) => { return state[tableName].filterDefault['is_deleted']; }, // ????
  GET_FILTER_PRIMITIVE:(state) => (tableName) => { return state[tableName].filterPrimitive; },
  
  GET_FILTER_EXTENDED:(state) => (option) => { return state[option.tableName][option.guid].filterExtended; },
  
  GET_FILTER_SEARCH:(state) => (tableName) => { return state[tableName].filterSearch; },
  // GET_FILTER_SORTING:(state) => (tableName) => {
  //   return state[tableName].filterSorting;
  // },
  GET_FILTER_GROUP:(state) => (tableName) => { return state[tableName].filterGroup; },
  GET_FILTER_ALL:(state) => (tableName) => {
    // let buildFilter = state[tableName].filterPrimitive + 
    //                   state[tableName].filterExtended + 
    //                   state[tableName].filterSearch +
    //                   state[tableName].filterSorting;
    // if (state[tableName].isHierarchyMode) {
    //   state[tableName].filterDefault.ordering = '-is_group';
    //   buildFilter += state[tableName].apiFilterParent;
    // }
    // if (state[tableName].filterParent) buildFilter += state[tableName].filterParent;
    return ''; //buildFilter;
          //  state[tableName].filterParent;
  }
}