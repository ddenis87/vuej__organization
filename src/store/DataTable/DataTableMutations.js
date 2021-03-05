import Vue from 'vue';

class DataTableSpace {
  constructor({pageSize = 30, isDeleted = false}) {
    this.filter['page_size'] = pageSize;
    this.filter['is_deleted'] = isDeleted;
  };
  statusProcessing = false;
  apiNext = null;
  apiPrevious = null;
  filter = {
    'page_size': '',
    'is_deleted': false,
    'ordering': null,
    'search': null,
    'parent__isnull': null,
    'parent': null,
    'is_group': null,
  };
  filterExtended = null;
  listDataGroup = [];
  addingMode = {
    index: null,
    id: null,
  };
};

export default {
  SET_STATUS_PROCESSING(state, option) { state[option.tableName][option.guid].statusProcessing = option.status; },
  CREATE_DATA_TABLE_SPACE(state, option) {
    Vue.set(state[option.tableName], option.guid, new DataTableSpace({}))
  },
  DELETE_DATA_TABLE_SPACE(state, option) {
    delete state[option.tableName][option.guid];
  },

  CLEAR_API_LINK(state, option) {
    state[option.tableName].next = null;
    state[option.tableName].previous = null;
  },

  SET_OPTIONS(state, option) {
    state[option.tableName].listOption = option.data;
    state[option.tableName].description = option.description;
    if ('parent' in option.data) {
      state[option.tableName].isHierarchyMode = true;
      state[option.tableName][option.guid].filter['parent__isnull'] = true;
    }
    if ('is_group' in option.data) state[option.tableName][option.guid].filter['ordering'] = `-is_group`;
  },
  UPDATE_OPTIONS(state, option) {
    if ('parent' in state[option.tableName].listOption) {
      state[option.tableName].isHierarchyMode = true;
      state[option.tableName][option.guid].filter['parent__isnull'] = true;
    }
    if ('is_group' in state[option.tableName].listOption) state[option.tableName][option.guid].filter['ordering'] = `-is_group`;
  },

  SET_DATA_OPTIONS(state, option) {
    state[option.tableName].countTotal = option.data.count;
    state[option.tableName][option.guid].apiNext = option.data.next;
    state[option.tableName][option.guid].apiPrevious = option.data.previous;
  },

  SET_DATA(state, option) {
    let index = state[option.tableName].listData.findIndex(item => item.id == option.value.id);
    if (index >= 0) {
      Vue.set(state[option.tableName].listData, index, option.value);
      return;
    }
    state[option.tableName].listData.push(option.value);
  },
  CLEAR_DATA(state, option) {
    state[option.tableName].listData = [];
  },
  DELETE_DATA_ELEMENT(state, option) {
    let index = state[option.tableName].listData.findIndex(item => item.id == option.elementId);
    state[option.tableName].listData.splice(index, 1);
  },

  CHANGE_DATA_GROUP_LEGEND(state, option) {
    console.log(option);
    let index = state[option.tableName][option.guid].listDataGroup.findIndex(item => item.id == option.value.id);
    if (index == -1)
      state[option.tableName][option.guid].listDataGroup.push(option.value);
    else
      state[option.tableName][option.guid].listDataGroup = state[option.tableName][option.guid].listDataGroup.slice(0, index);
  },
  // SET_FILTER_PARENT(state, option) {
  //   if (state[option.tableName][option.guid].listDataGroup.length) {
  //     state[option.tableName][option.guid].filter['parent__isnull'] = null;
  //     state[option.tableName][option.guid].filter['parent'] = state[option.tableName][option.guid].listDataGroup[state[option.tableName][option.guid].listDataGroup.length - 1].id;
  //   } else {
  //     state[option.tableName][option.guid].filter['parent__isnull'] = true;
  //     state[option.tableName][option.guid].filter['parent'] = null;
  //   }
  // },
  // CHANGE_API_FILTER_PARENT(state, option) {
  //   if (state[option.tableName].listDataGroup.length)
  //     state[option.tableName].apiFilterParent = `&parent=${option.value.id}`;
  //   else
  //     state[option.tableName].apiFilterParent = `&parent__isnull=true`;
  // },
  // CHANGE_GETTER_FILTER_DATA(state, option) {
  //   if (state[option.tableName].listDataGroup.length)

  //     state[option.tableName].getterFilterData.parent = state[option.tableName].listDataGroup[state[option.tableName].listDataGroup.length - 1].id;
  //   else
  //     state[option.tableName].getterFilterData.parent = null;
  // },

  // SET_DATA_RECORD(state, option) {
  //   // console.log(option);
  //   state[option.tableName].listFieldObject.forEach(fieldObject => {
  //     // if (fieldObject != 'parent') { // КОСТЫЛЬ
  //       let relatedModelName = state[option.tableName].listOption[fieldObject]['related_model_name'];
  //       option.data.results.forEach(element => {
  //         if (element[fieldObject]) {
  //           if (!state[relatedModelName].listData.find(item => item.id == element[fieldObject].id)) state[relatedModelName].listData.push(element[fieldObject]);
  //           element[fieldObject] = state[relatedModelName].listData.find(item => item.id == element[fieldObject].id);
  //         } else {
  //           element[fieldObject] = null;
  //         }
  //       });
  //     // }
  //   });
  //   let listOption = state[option.tableName].listOption; //
  //   option.data.results.forEach(element => {
  //     for (let key of Object.keys(element)) { //
  //       if (listOption[key].type == 'choice') { //
  //         element[key] = listOption[key].choices.find(item => item.value == element[key]);
  //       }
  //     }
  //     let indexItem = state[option.tableName].listData.findIndex(item => item.id == element.id);
  //     // console.log(indexItem);
  //     // console.log(element);
  //     Vue.set(state[option.tableName].listData, indexItem, element);
  //   });
  // },
  
  // SET_DATA_CLEAR(state, option) {
  //   state[option.tableName].listData = [];
  // },



  // ------------------------------------------------------------------

  // ----FILTERS----------------------------------------------------------------
  SET_FILTER_SORTING(state, option) {
    if (option.key == null) {
      state[option.tableName][option.guid].filter['ordering'] = ('is_group' in state[option.tableName].listOption) ? '-is_group' : null;
      return;
    }
    state[option.tableName][option.guid].filter['ordering'] = `${(option.ordering) ? '' : '-'}${option.key}`;
  },
  SET_FILTER_SEARCH(state, option) {
    if (option.value == null) {
      state[option.tableName][option.guid].filter['search'] = null;
      return;
    }
    state[option.tableName][option.guid].filter['search'] = option.value;
    state[option.tableName][option.guid].filter['parent__isnull'] = null;
  },
  SET_FILTER_EXTENDED(state, option) {
    if (option.value == '') {
      state[option.tableName][option.guid].filterExtended = null;
      return;
    }
    let filterExtended = '';
    Object.keys(option.value).forEach(key => {
      filterExtended += option.value[key];
    });
    state[option.tableName][option.guid].filterExtended = filterExtended;
  },
  SET_FILTER_GROUP(state, option) {
    state[option.tableName][option.guid].filter['parent__isnull'] = null;
    state[option.tableName][option.guid].filter['is_group'] = true;
  },
  SET_FILTER_PARENT(state, option) {
    if (state[option.tableName][option.guid].listDataGroup.length) {
      state[option.tableName][option.guid].filter['parent__isnull'] = null;
      state[option.tableName][option.guid].filter['parent'] = state[option.tableName][option.guid].listDataGroup[state[option.tableName][option.guid].listDataGroup.length - 1].id;
    } else {
      state[option.tableName][option.guid].filter['parent__isnull'] = true;
      state[option.tableName][option.guid].filter['parent'] = null;
    }
  },
  SET_FILTER_DELETED(state, option) {
    if (option.value == false) {
      state[option.tableName][option.guid].filter['is_deleted'] = false;
      return;
    }
    state[option.tableName][option.guid].filter['is_deleted'] = option.value;
    state[option.tableName][option.guid].filter['parent__isnull'] = null;
  },
  // ---------------------------------------------------------------------------

  // ----ADDING ELEMENT---------------------------------------------------------
  ADDING_INLINE_ELEMENT(state, option) {
    let newElement = {};
    Object.keys(state[option.tableName].listOption).forEach(item => {
      newElement[item] = null;
    });
    let indexLastGroup = state[option.tableName][option.guid].listDataGroup.length - 1;
    if (indexLastGroup > -1) {
      newElement.parent = state[option.tableName][option.guid].listDataGroup[indexLastGroup];
    }
    let indexCurrentElement = state[option.tableName].listData.findIndex(item => item.id == option.id);
    state[option.tableName].listData.splice(((indexCurrentElement > -1) ? indexCurrentElement : 0) + 1, 0, newElement);
    state[option.tableName][option.guid].addingMode.index = ((indexCurrentElement > -1) ? indexCurrentElement : 0) + 1;
  },
  ADDING_INLINE_ELEMENT_FIELD(state, option) {
    let index = state[option.tableName][option.guid].addingMode.index;
    state[option.tableName].listData[index][option.fieldName] = option.value;
  },
  DELETING_INLINE_ELEMENT(state, option) {
    state[option.tableName].listData.splice(state[option.tableName][option.guid].addingMode.index, 1);
    state[option.tableName][option.guid].addingMode.id = null;
    state[option.tableName][option.guid].addingMode.index = null;
  },


  // ---------------------------------------------------------------------------

  // SET_MODE_ADDING_ID(state, option) {
  //   state[option.tableName].modeAdding.recordId = option.recordId;
  //   state[option.tableName][option.guid].filter['parent__isnull'] = null;
  // },
  


  // TOGGLE_FILTER_DEFAULT_IS_DELETED(state, option) {
  //   state[option.tableName].listData = [];
  //   state[option.tableName].filterDefault['is_deleted'] = option.value;
  // },
  // TOGGLE_MODE_ADDING(state, option) {
  //   state[option.tableName].modeAdding.status = option.status;
  //   state[option.tableName].modeAdding.index = option.index;
  // },
  
  // ---------------------------------------------------------------------------------------------------
  // DATA_STORE_ADDING_ELEMENT(state, option) {  // ADDING EMPTY LINE IN TABLE
  //   let fieldTable = {};
  //   let indexElement = 0;
  //   for (let key of Object.keys(state[option.tableName].listOption)) fieldTable[key] = null;
  //   if (option.recordId == -1) {
  //     state[option.tableName].listData.unshift(fieldTable);
  //     state[option.tableName].modeAdding.status = true;
  //     state[option.tableName].modeAdding.index = indexElement;
  //   } else {
  //     indexElement = state[option.tableName].listData.findIndex(item => item.id == option.recordId);
  //     state[option.tableName].listData.splice(indexElement + 1, 0, fieldTable);
  //     state[option.tableName].modeAdding.status = true; // ПЕРЕВОДИМ СОСТОЯНИЕ ТАБЛИЦЫ В РЕЖИМ ДОБАВЛЕНИЯ
  //     state[option.tableName].modeAdding.index = indexElement + 1; // ИНДЕКС ДОБАВЛЯЕМОГО ЭЛЕМЕНТА
  //   }
    
  // },
  // DATA_STORE_ADDING_ELEMENT_ITEM(state, option) { // ADDING ELEMENT ITEM IN LINE STORE
  //   let indexElement = state[option.tableName].modeAdding.index;
  //   state[option.tableName].listData[indexElement][option.fieldName] = option.value;
  // },
  // DATA_STORE_DELETING_ELEMENT(state, option) { // DELETE LINE TABLE
  //   state[option.tableName].listData.splice(state[option.tableName].modeAdding.index, 1);
  //   state[option.tableName].modeAdding.status = false;
  //   state[option.tableName].modeAdding.index = null;
  // },
  
  // // ---------------------------------------------------------------------------------------------------


  // ACTION_EDITING_ELEMENT(state, option) { // editin column in table
  //   let index = state[option.tableName].listData.findIndex(item => item.id == option.recordId);
  //   console.log(state[option.tableName].listData[index]);
  //   state[option.tableName].listData[index][option.fieldName] = option.value;
  // },

}