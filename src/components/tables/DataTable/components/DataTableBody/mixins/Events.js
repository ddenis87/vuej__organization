import Vue from 'vue';
import CellEditing from '../components/CellEditing.vue';

export const Events = {
  data() {
    return {
      isElementNowEditing: false,
      isElementNowFocus: false,
    }
  },
  methods: {
    // events mouse move
    eventMouseEnterRow(event) { // work if not editable and not focus
      if (!this.isElementNowEditing && !this.isElementNowFocus)
        event.target.classList.add('table-body__row_hover');
    },
    eventMouseLeaveRow(event) { // work if not editable and not focus
      if (!this.isElementNowEditing && !this.isElementNowFocus) 
        event.target.classList.remove('table-body__row_hover');
    },
    eventFocusToElement(event) {
      console.log('focus element col');
      this.isElementNowFocus = true;
      event.target.parentElement.classList.remove('table-body__row_hover');
      event.target.parentElement.classList.add('table-body__row_focus');
      event.target.classList.add('table-body__col_focus');
    },
    eventBlurToElemet(event) {  // work if not editable
      console.log('blur element col');
      if (!this.isElementNowEditing) {
        this.isElementNowFocus = false;
        event.target.parentElement.classList.remove('table-body__row_focus');
        event.target.classList.remove('table-body__col_focus');
      }
    },

    // events mouse action
    eventDblclickToElement(event, rowProperties, columnProperties, columnValue) {
      // console.log(event);
      // console.log(rowProperties);
      // console.log(columnProperties);
      // console.log(columnValue);
      if (!this.checkForEditable(event, columnProperties)) return;

      this.switchDecorationToEdit(event);
      if (event.target.closest('.table-body__col').querySelector('.box-editing-default')) {
        let target = event.target.closest('.table-body__col').querySelector('.box-editing-default');
        this.mountEditingComponent(target, rowProperties.id, columnProperties, columnValue);
      }
    },

    // function
    mountEditingComponent(target, rowId, columnProperties, columnValue) {
      console.log('mount component');
      let editingComponentProperties = {
        tableName: this.tableName,
        rowId,
        columnProperties,
        columnValue,
      };
      let editingComponentVue = Vue.extend(CellEditing);
      let editingComponent = new editingComponentVue({ propsData: { properties: editingComponentProperties }}).$mount();
      target.prepend(editingComponent.$el);
    },

    checkForEditable(event, columnProperties) {
      if (!this.editable) { return false; } // if table properties editable set in false // ??? emit rowProperties
      if (columnProperties['read_only']) { return false; } // field not can edit
      if (event.target.closest('.table-body__col').querySelector('.box-display.display-none')) { return false; } // if we are already editing
      return true;
    },

    switchDecorationToDisplay() {
      this.isElementNowEditing = false; // status editing
      this.isElementNowFocus = false; // status editing
      let editableElement = document.querySelector('.table-body__col_editing');
      editableElement.classList.remove('table-body__col_editing');
      editableElement.querySelector('.box-display').classList.remove('display-none');
      editableElement.querySelector('.box-editing').classList.add('display-none');
      // editableElement.parentElement.classList.remove('table-body__row_hover');
      
    },
    switchDecorationToEdit(event) {
      this.isElementNowEditing = true; // status editing
      let editableElement = event.target.closest('.table-body__col');
      editableElement.classList.add('table-body__col_editing');
      editableElement.querySelector('.box-display').classList.add('display-none');
      editableElement.querySelector('.box-editing').classList.remove('display-none');
      // editableElement.parentElement.classList.add('table-body__row_hover');
    },

    editingCanceled() {
      let editableElement = document.querySelector('.table-body__col_editing');
      editableElement.classList.remove('table-body__col_focus');
      editableElement.parentElement.classList.remove('table-body__row_focus');
      
      this.switchDecorationToDisplay();
      
    },
    editingAccepted() { this.switchDecorationToDisplay(); },
  },
}