import DataTable from './DataTable/DataTable.js';

export default {
  namespaced: true,
  state: {
    propertiesForm: {
      actionName: 'adding',
      fieldFocused: null,
    }
    
  },
  getters: {
    GET_ACTION_NAME(state) { return state.propertiesForm.actionName; },
    GET_FIELD_FORM_VALUE(state) { return state.propertiesForm.fieldFocused; }
  },
  mutations: {
    // SET_FIELD_FORM_ADDING(state) {
    //   state.propertiesForm.actionName = 'adding';
    //   state.propertiesForm.fieldFocused = null;
    // },
    // SET_FIELD_FORM_EDITING(state, option) {
    //   state.propertiesForm.actionName = 'editing';
    //   state.propertiesForm.fieldFocused = option;
    // },
    SET_FIELD_FORM(state, option = {actionName: 'adding', fieldFocused: null}) {
      state.propertiesForm.actionName = option.actionName;
      state.propertiesForm.fieldFocused = (option.fieldFocused != null) ? Object.assign({}, option.fieldFocused) : null;
      console.log(state.propertiesForm);
    }
  },
  actions: {},
  modules: {
    DataTable,
  }
}