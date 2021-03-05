import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import store from '@/store';
import ContentEditing from '../components/ContentEditing.vue';

export const Editing = {
  methods: {
    mountEditingComponent(target, itemRow, columnProperties, columnValue) {
      let editingComponentProperties = {
        tableName: this.tableName,
        guid: this.guid,
        itemRow,
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
          // console.log(nextEditableElement);
          this.switchDecorationToDisplay();
          event.target.classList.remove('body-column_focus');
          if (!nextEditableElement) {
            this.editingAcceptedNewElement(event);
            return;
          }
          setTimeout(() => {
            let nextEventDblclickToElement = new Event('dblclick', {bubbles: false});
            nextEditableElement.focus();
            nextEditableElement.dispatchEvent(nextEventDblclickToElement);
          }, 10)
          break;
        }
      }
    },

    async editingAcceptedNewElement(event) {
      let index = this.$store.getters['DataTable/GET_ADDING_MODE']({
        tableName: this.tableName,
        guid: this.guid,
      }).index;
      let sendOption = {
        tableName: this.tableName,
        guid: this.guid,
      };
      let bFormData = new FormData();
      for (let key of Object.keys(this.items[index])) {
        if (this.items[index][key]) {
          let newCurrentValue = null;
          // console.log(this.items[index][key]);
          if (typeof(this.items[index][key]) == 'object' && this.items[index][key] != null) {
            if ('id' in this.items[index][key]) newCurrentValue = this.items[index][key].id;
            else newCurrentValue = this.items[index][key].value;
          } else {
            newCurrentValue = this.items[index][key];
          } 

          bFormData.set(`${key}`, `${newCurrentValue}`);
        }
      };
      console.log(sendOption);
      sendOption.formData = bFormData;
      this.$store.dispatch('DataTable/ADDING_ELEMENT', sendOption);
      // await this.$store.dispatch('DataTable/REQUEST_DATA_ADDING', sendOption)
      //   .then((response) => {
      //     setTimeout(() => {
      //       let indexAddingElement = this.$store.getters['DataTable/GET_DATA_INDEX'](this.tableName, { recordId: response.data.id });
      //       let firstElement = document.querySelectorAll(`#${this.id} .body .body-row`)[indexAddingElement].querySelectorAll('.body-column')[0];
      //       // let eventDblClick = new Event('dblclick', {bubbles: false});
      //       firstElement.focus();
      //     }, 1500);
      //   })
    },
  }
}