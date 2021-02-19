import Vue from 'vue';
export default {
  SET_STATUS_PROCESSING(state, status = false) { state.statusProcessing = status; },

  SET_CLEAR_NEXT_PREV_LINK(state, option) {
    state[option.tableName].next = null;
    state[option.tableName].previous = null;
  },

  SET_OPTIONS(state, option) {
    state[option.tableName].listOption = option.data;
    for (let key of Object.keys(option.data)) {
      if (option.data[key].type == 'field') state[option.tableName].listFieldObject.push(key);
    }
    state[option.tableName].description = option.description;
  },
  SET_DATA(state, option) {

    if (option.clear == true) state[option.tableName].listData = [];
    state[option.tableName].countTotal = option.data.count;
    state[option.tableName].next = option.data.next;
    state[option.tableName].previous = option.data.previous;
    console.log(state[option.tableName]);
    state[option.tableName].listFieldObject.forEach(fieldObject => {
      if (fieldObject != 'parent') { // КОСТЫЛЬ
        let relatedModelName = state[option.tableName].listOption[fieldObject]['related_model_name'];
        option.data.results.forEach(element => {
          if (!state[relatedModelName].listData.find(item => item.id == element[fieldObject].id)) state[relatedModelName].listData.push(element[fieldObject]);
          element[fieldObject] = state[relatedModelName].listData.find(item => item.id == element[fieldObject].id);
        });
      }
    });
    let listOption = state[option.tableName].listOption; //
    option.data.results.forEach(element => {
      for (let key of Object.keys(element)) { //
        if (listOption[key].type == 'choice') { //
          element[key] = listOption[key].choices.find(item => item.value == element[key]);
        }
      }
      if (!state[option.tableName].listData.find(item => item.id == element.id)) 
        state[option.tableName].listData.push(element);
    });
  },
  SET_DATA_RECORD(state, option) {
    // console.log(option);
    state[option.tableName].listFieldObject.forEach(fieldObject => {
      if (fieldObject != 'parent') { // КОСТЫЛЬ
        let relatedModelName = state[option.tableName].listOption[fieldObject]['related_model_name'];
        option.data.results.forEach(element => {
          if (!state[relatedModelName].listData.find(item => item.id == element[fieldObject].id)) state[relatedModelName].listData.push(element[fieldObject]);
          element[fieldObject] = state[relatedModelName].listData.find(item => item.id == element[fieldObject].id);
        });
      }
    });
    let listOption = state[option.tableName].listOption; //
    option.data.results.forEach(element => {
      for (let key of Object.keys(element)) { //
        if (listOption[key].type == 'choice') { //
          element[key] = listOption[key].choices.find(item => item.value == element[key]);
        }
      }
      let indexItem = state[option.tableName].listData.findIndex(item => item.id == element.id);
      // console.log(indexItem);
      // console.log(element);
      Vue.set(state[option.tableName].listData, indexItem, element);
    });
  },
  SET_DATA_CLEAR(state, option) {
    state[option.tableName].listData = [];
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
  SET_FILTER_SEARCH(state, option) {
    if (option.value == null) {
      state[option.tableName].filterSearch = '';
      return;
    }
    state[option.tableName].filterSearch = `&search=${option.value.toUpperCase()}`;
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


  // ACTION_EDITING_ELEMENT(state, option) { // editin column in table
  //   let index = state[option.tableName].listData.findIndex(item => item.id == option.recordId);
  //   console.log(state[option.tableName].listData[index]);
  //   state[option.tableName].listData[index][option.fieldName] = option.fieldValue;
  // },

  // ADDING_LIST_DATA(state, option) {
  //   let newItem = {};
  //   Object.assign(newItem, option.values);
  //   console.log(newItem);
  //   state[option.tableName].listData.unshift(newItem);
  // },
  // EDITING_LIST_DATA(state, option) { // editing record in form
  //   let newItem = {};
  //   Object.assign(newItem, option.values);
  //   console.log(newItem);
  //   let index = state[option.tableName].listData.findIndex(item => item.id == option.values.id);
  //   state[option.tableName].listData.splice(index, 1, newItem);
  // },
}