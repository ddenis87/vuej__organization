import Vue from 'vue';

export default {
  SET_STATUS_PROCESSING(state, status = false) { state.statusProcessing = status; },
  SET_DEFAULT_STATE(state, option) {
    state[option.tableName].description = null;
    state[option.tableName].countTotal = 0;
    state[option.tableName].apiNext = null;
    state[option.tableName].apiPrevious = null;
    state[option.tableName].isHierarchyMode = false;
    state[option.tableName].filterDefault = { 'page_size': null, 'is_deleted': null, };
    state[option.tableName].filterPrimitive = '';
    state[option.tableName].filterSearch = '';
    state[option.tableName].filterSorting = '';
    state[option.tableName].filterExtended = '';
    state[option.tableName].apiFilterParent = '&parent__isnull=true';
    state[option.tableName].getterFilterData = { parent: null, };
    state[option.tableName].relatedModelView = '';
    state[option.tableName].listOption = {};
    state[option.tableName].listDataGroup = [];
    state[option.tableName].listData = [];
    state[option.tableName].isModeAdding = false;
    // state[option.tableName].
    // state[option.tableName].
  },

  CLEAR_API_LINK(state, option) {
    state[option.tableName].next = null;
    state[option.tableName].previous = null;
  },

  SET_OPTIONS(state, option) {
    state[option.tableName].listOption = option.data;
    state[option.tableName].description = option.description;
    if ('parent' in option.data) state[option.tableName].isHierarchyMode = true;
  },

  SET_DATA_OPTIONS(state, option) {
    state[option.tableName].countTotal = option.data.count;
    state[option.tableName].apiNext = option.data.next;
    state[option.tableName].apiPrevious = option.data.previous;
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
    let index = state[option.tableName].listDataGroup.findIndex(item => item.id == option.value.id);
    if (index == -1)
      state[option.tableName].listDataGroup.push(option.value);
    else
      state[option.tableName].listDataGroup = state[option.tableName].listDataGroup.slice(0, index);
  },
  CHANGE_API_FILTER_PARENT(state, option) {
    if (state[option.tableName].listDataGroup.length)
      state[option.tableName].apiFilterParent = `&parent=${option.value.id}`;
    else
      state[option.tableName].apiFilterParent = `&parent__isnull=true`;
  },
  CHANGE_GETTER_FILTER_DATA(state, option) {
    if (state[option.tableName].listDataGroup.length)

      state[option.tableName].getterFilterData.parent = state[option.tableName].listDataGroup[state[option.tableName].listDataGroup.length - 1].id;
    else
      state[option.tableName].getterFilterData.parent = null;
  },

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
  SET_FILTER_SEARCH(state, option) {
    if (option.value == null) {
      state[option.tableName].filterSearch = '';
      return;
    }
    state[option.tableName].filterSearch = `&search=${option.value}`;
  },
  SET_FILTER_SORTING(state, option) {
    if (option.key == null) {
      state[option.tableName].filterSorting = '';
      return;
    }
    let filterSorting = '&ordering=';
    filterSorting += `${(option.ordering) ? '' : '-'}${option.key}`;
    state[option.tableName].filterSorting = filterSorting;
  },

  TOGGLE_FILTER_DEFAULT_IS_DELETED(state, option) {
    state[option.tableName].listData = [];
    state[option.tableName].filterDefault['is_deleted'] = option.value;
  },
  TOGGLE_MODE_ADDING(state, option) {
    state[option.tableName].modeAdding.status = option.status;
    state[option.tableName].modeAdding.index = option.index;
  },
  SET_MODE_ADDING_ID(state, option) {
    state[option.tableName].modeAdding.recordId = option.recordId;
  },

  // ---------------------------------------------------------------------------------------------------
  DATA_STORE_ADDING_ELEMENT(state, option) {  // ADDING EMPTY LINE IN TABLE
    let fieldTable = {};
    let indexElement = 0;
    for (let key of Object.keys(state[option.tableName].listOption)) fieldTable[key] = null;
    if (option.recordId == -1) {
      state[option.tableName].listData.unshift(fieldTable);
      state[option.tableName].modeAdding.status = true;
      state[option.tableName].modeAdding.index = indexElement;
    } else {
      indexElement = state[option.tableName].listData.findIndex(item => item.id == option.recordId);
      state[option.tableName].listData.splice(indexElement + 1, 0, fieldTable);
      state[option.tableName].modeAdding.status = true; // ПЕРЕВОДИМ СОСТОЯНИЕ ТАБЛИЦЫ В РЕЖИМ ДОБАВЛЕНИЯ
      state[option.tableName].modeAdding.index = indexElement + 1; // ИНДЕКС ДОБАВЛЯЕМОГО ЭЛЕМЕНТА
    }
    
  },
  DATA_STORE_ADDING_ELEMENT_ITEM(state, option) { // ADDING ELEMENT ITEM IN LINE STORE
    let indexElement = state[option.tableName].modeAdding.index;
    state[option.tableName].listData[indexElement][option.fieldName] = option.value;
  },
  DATA_STORE_DELETING_ELEMENT(state, option) { // DELETE LINE TABLE
    state[option.tableName].listData.splice(state[option.tableName].modeAdding.index, 1);
    state[option.tableName].modeAdding.status = false;
    state[option.tableName].modeAdding.index = null;
  },
  
  // ---------------------------------------------------------------------------------------------------


  ACTION_EDITING_ELEMENT(state, option) { // editin column in table
    let index = state[option.tableName].listData.findIndex(item => item.id == option.recordId);
    console.log(state[option.tableName].listData[index]);
    state[option.tableName].listData[index][option.fieldName] = option.value;
  },

}