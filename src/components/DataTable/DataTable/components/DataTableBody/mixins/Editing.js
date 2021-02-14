import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import store from '@/store';
import ContentEditing from '../components/ContentEditing.vue';

export const Editing = {
  methods: {
    mountEditingComponent(target, rowId, columnProperties, columnValue) {
      let editingComponentProperties = {
        tableName: this.tableName,
        rowId,
        columnProperties,
        columnValue,
      };
      // console.log(editingComponentProperties);
      let editingComponentVue = Vue.extend(ContentEditing);
      let editingComponent = new editingComponentVue({ vuetify, store, propsData: { properties: editingComponentProperties }}).$mount();
      target.prepend(editingComponent.$el);
    },
    checkForEditable(event, columnProperties) {
      if (!this.isEditable) { return false; } // if table properties editable set in false // ??? emit rowProperties
      if (columnProperties['read_only']) { return false; } // field not can edit (at API)
      if (columnProperties['disabled'] == true) { return false } // disabled in properties table
      if (event.target.closest('.body-column').querySelector('.box-display.display-none')) { return false; } // if we are already editing
      return true;
    },
    switchDecorationToDisplay() {
      this.isColumnEditing = false; // status editing
      this.isColumnFocus = false; // status focus
      let editableElement = document.querySelector('.body-column_editing');
      editableElement.classList.remove('body-column_editing');
      editableElement.querySelector('.box-display').classList.remove('display-none');
      editableElement.querySelector('.box-editing').classList.add('display-none');
    },
    switchDecorationToEdit(event) {
      this.isColumnEditing = true; // status editing
      let editableElement = event.target.closest('.body-column');
      editableElement.classList.add('body-column_editing');
      editableElement.querySelector('.box-display').classList.add('display-none');
      editableElement.querySelector('.box-editing').classList.remove('display-none');
    },
    editingCanceled() {
      let editableElement = document.querySelector('.body-column_editing');
      editableElement.classList.remove('body-column_focus');
      editableElement.parentElement.classList.remove('body-row_focus');
      this.switchDecorationToDisplay();
    },
    editingAccepted(event) {
      switch(event.detail.key) {
        case 'Enter': {
          this.switchDecorationToDisplay();
          event.target.focus();
          break;
        }
        case 'Tab': {
          let nextEditableElement = null;
          if (event.detail.keyShift) nextEditableElement = event.target.previousElementSibling;
          else nextEditableElement = event.target.nextElementSibling;
          this.switchDecorationToDisplay();
          event.target.classList.remove('body-column_focus');
          setTimeout(() => {
            let nextEventDblclickToElement = new Event('dblclick', {bubbles: false});
            nextEditableElement.focus();
            nextEditableElement.dispatchEvent(nextEventDblclickToElement);
          }, 10)
          break;
        }
      }
    },
  }
}