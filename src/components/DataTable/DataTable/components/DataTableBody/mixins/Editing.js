import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import store from '@/store';
import CellEditing from '../components/CellEditing.vue';

export const Editing = {
  methods: {
    mountEditingComponent(target, rowId, columnProperties, columnValue) {
      let editingComponentProperties = {
        tableName: this.tableName,
        rowId,
        columnProperties,
        columnValue,
      };
      let editingComponentVue = Vue.extend(CellEditing);
      let editingComponent = new editingComponentVue({ vuetify, store, propsData: { properties: editingComponentProperties }}).$mount();
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
      this.isElementNowFocus = false; // status focus
      let editableElement = document.querySelector('.table-body__col_editing');
      editableElement.classList.remove('table-body__col_editing');
      editableElement.querySelector('.box-display').classList.remove('display-none');
      editableElement.querySelector('.box-editing').classList.add('display-none');
    },
    switchDecorationToEdit(event) {
      this.isElementNowEditing = true; // status editing
      let editableElement = event.target.closest('.table-body__col');
      editableElement.classList.add('table-body__col_editing');
      editableElement.querySelector('.box-display').classList.add('display-none');
      editableElement.querySelector('.box-editing').classList.remove('display-none');
    },
    editingCanceled() {
      let editableElement = document.querySelector('.table-body__col_editing');
      editableElement.classList.remove('table-body__col_focus');
      editableElement.parentElement.classList.remove('table-body__row_focus');
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
          // console.log(event.detail.keyShift);
          if (event.detail.keyShift) nextEditableElement = event.target.previousElementSibling;
          else nextEditableElement = event.target.nextElementSibling;
          this.switchDecorationToDisplay();
          event.target.classList.remove('table-body__col_focus');
          setTimeout(() => {
            let nextEventDblclickToElement = new Event('dblclick', {bubbles: false});
            nextEditableElement.focus();
            nextEditableElement.dispatchEvent(nextEventDblclickToElement);
          }, 10)
          break;
        }
      }
    },
    // checkDisplayEdit(event, itemColumn, objectValue = null) {
    //   // console.log('check display edit for dblclick');
    //   console.log(objectValue);
    //   if (!this.editable) {
    //     this.$emit('dblclick-row', event, itemColumn, objectValue); return;
    //   }
    //   if (itemColumn['read_only']) return;
    //   let parentElement = event.target.closest('.table-body__col');
    //   if (parentElement.querySelector('.box-display.display-none')) return;
    //   parentElement.classList.add('table-body__col_focus');
    //   let newObjectValue = {};
    //   Object.assign(newObjectValue, itemColumn);
    //   newObjectValue.idRow = objectValue.id;
    //   newObjectValue.tableName = this.tableName;
    //   setTimeout(() => {
    //     parentElement.querySelector('.box-display').classList.add('display-none');
    //     parentElement.querySelector('.box-editing').classList.remove('display-none');
    //     if (parentElement.querySelector('.box-editing')) {
    //       parentElement.parentElement.classList.add('table-body__row_hover');
    //       this.editingStart(newObjectValue, parentElement.querySelector('.box-editing'));
    //     } else {
    //       // custom element edit function this.$refs[nameCustomElement].editingStart(params)
    //     }
    //   }, 10);
      
    // },

    // check editing for keydown
    // checkDisplayEditForKeydown(event, itemColumn) {
      // // console.log('check display edit for keydown');
      // if (event.code.includes('Arrow') || event.code == 'Tab') {
      //   event.preventDefault();
      //   if ((event.code == 'ArrowRight' && event.target.nextElementSibling) || (event.code =='Tab' && event.shiftKey == false)) { event.target.nextElementSibling.focus(); return }
      //   if ((event.code == 'ArrowLeft' && event.target.previousElementSibling) || (event.code =='Tab' && event.shiftKey == true)) { event.target.previousElementSibling.focus(); return }
      //   if (event.code == 'ArrowDown' && event.target.parentElement.nextElementSibling) { event.target.parentElement.nextElementSibling.children[event.target.getAttribute('tabindex')].focus(); return; }
      //   if (event.code == 'ArrowUp' && event.target.parentElement.previousElementSibling) { event.target.parentElement.previousElementSibling.children[event.target.getAttribute('tabindex')].focus(); return; }
      // }
      // if (!this.editable) return;
      // if (itemColumn['read_only']) return;
      // let parentElement = event.target.closest('.table-body__col');
      // if (parentElement == null || parentElement.querySelector('.box-display.display-none')) return;
      // if (event.code.includes('Key') || event.code.includes('Digit')) this.checkDisplayEdit(event, itemColumn);
    // },

    // editingStart(itemColumn, parentElement, itemValue = null) {
      // this.cellEditProps = itemColumn;
      // // 
      // this.cellEditProps.text = parentElement.getAttribute('data-value');
      // this.cellEditComponent = new this.vueCellEdit({ vuetify, store, propsData: {listProps: this.cellEditProps} }).$mount(); 
      // parentElement.prepend(this.cellEditComponent.$el);

      // if (itemColumn.type == 'string' || itemColumn.type == 'integer') {
      //   // parentElement.querySelector('input').select();
      //   // parentElement.querySelector('input').focus();
      // } else if ( itemColumn.type == 'nested object' ) {
      //   parentElement.querySelector('input').focus();
      // } else {
      //   parentElement.querySelector('input').focus();
      // }
    // },

    // editingCompleted(event) {
    //   let parentElement = event.target;
    //   if (parentElement.querySelector('.box-display')) {
    //     if (event.detail.status == true)
    //       this.displayUpdate(event, event.detail.value);
    //   } else {
    //     // custom element display function for update view this.$refs[nameCustomElement].displayUpdate
    //   }
    //   parentElement.classList.remove('table-body__col_focus');
    //   parentElement.querySelector('.box-display').classList.remove('display-none');
    //   parentElement.querySelector('.box-editing').classList.add('display-none');
    //   setTimeout(() => {
    //     if (!document.querySelector('.box-editing-component'))
    //       parentElement.parentElement.classList.remove('table-body__row_hover');
    //   }, 50)
    // },

    // displayUpdate(event, value) {
    //   let parentElement = event.target;
    //   if (typeof(value) == 'object') {
    //     // console.log(value);
    //     parentElement.querySelector('.content').innerText = value.text;
    //     parentElement.querySelector('.box-editing').setAttribute('data-value', value.value);
    //     parentElement.querySelector('.box-display').setAttribute('data-value', value.text);
    //     return;
    //   }
    //   // console.log(value);
    //   parentElement.querySelector('.content').innerText = value;
    //   parentElement.querySelector('.box-editing').setAttribute('data-value', value);
    //   parentElement.querySelector('.box-display').setAttribute('data-value', value);
    // },
  }
}