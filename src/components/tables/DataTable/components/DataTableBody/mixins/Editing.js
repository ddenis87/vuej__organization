import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import store from '@/store';
import CellEditing from '../components/CellEditing.vue';

export const Editing = {
  data() {
    return {
      cellEditable: null,
      cellEditProps: Object,
      cellEditComponent: null,
      vueCellEdit: Vue.extend(CellEditing),
    }
  },
  methods: {
    checkDisplayEdit(event, itemColumn, itemValue = null) {
      // console.log('check display edit for dblclick');
      if (!this.editable) {
        this.$emit('dblclick-row', event, itemColumn); return;
      }
      if (itemColumn['read_only']) return;
      let parentElement = event.target.closest('.table-body__col');
      if (parentElement.querySelector('.box-display.display-none')) return;
      // console.log(parentElement);
      parentElement.classList.add('table-body__col_focus');
      setTimeout(() => {
        parentElement.querySelector('.box-display').classList.add('display-none');
        parentElement.querySelector('.box-editing').classList.remove('display-none');
        if (parentElement.querySelector('.box-editing')) {
          parentElement.parentElement.classList.add('table-body__row_hover');
          this.editingStart(itemColumn, parentElement.querySelector('.box-editing'));
        } else {
          // custom element edit function this.$refs[nameCustomElement].editingStart(params)
        }
      }, 10);
      
    },

    // check editing for keydown
    checkDisplayEditForKeydown(event, itemColumn) {
      // console.log('check display edit for keydown');
      if (event.code.includes('Arrow') || event.code == 'Tab') {
        event.preventDefault();
        if ((event.code == 'ArrowRight' && event.target.nextElementSibling) || (event.code =='Tab' && event.shiftKey == false)) { event.target.nextElementSibling.focus(); return }
        if ((event.code == 'ArrowLeft' && event.target.previousElementSibling) || (event.code =='Tab' && event.shiftKey == true)) { event.target.previousElementSibling.focus(); return }
        if (event.code == 'ArrowDown' && event.target.parentElement.nextElementSibling) { event.target.parentElement.nextElementSibling.children[event.target.getAttribute('tabindex')].focus(); return; }
        if (event.code == 'ArrowUp' && event.target.parentElement.previousElementSibling) { event.target.parentElement.previousElementSibling.children[event.target.getAttribute('tabindex')].focus(); return; }
      }
      if (!this.editable) return;
      if (itemColumn['read_only']) return;
      let parentElement = event.target.closest('.table-body__col');
      if (parentElement == null || parentElement.querySelector('.box-display.display-none')) return;
      if (event.code.includes('Key') || event.code.includes('Digit')) this.checkDisplayEdit(event, itemColumn);
    },

    editingStart(itemColumn, parentElement, itemValue = null) {
      this.cellEditProps = itemColumn;
      // this.cellEditProps.objectValue = itemValue;
      // 
      this.cellEditProps.text = parentElement.getAttribute('data-value');
      // console.log(this.cellEditProps);
      this.cellEditComponent = new this.vueCellEdit({ vuetify, store, propsData: {listProps: this.cellEditProps} }).$mount(); 
      parentElement.prepend(this.cellEditComponent.$el);

      if (itemColumn.type == 'string' || itemColumn.type == 'integer') {
        parentElement.querySelector('input').select();
        parentElement.querySelector('input').focus();
      } else if ( itemColumn.type == 'nested object' ) {
        parentElement.querySelector('input').focus();
      } else {
        parentElement.querySelector('input').focus();
      }
    },

    editingCompleted(event) {
      let parentElement = event.target;
      if (parentElement.querySelector('.box-display')) {
        // console.log(event.detail);
        if (event.detail.status == true)
          this.displayUpdate(event, event.detail.value);
      } else {
        // custom element display function for update view this.$refs[nameCustomElement].displayUpdate
      }
      parentElement.classList.remove('table-body__col_focus');
      parentElement.querySelector('.box-display').classList.remove('display-none');
      parentElement.querySelector('.box-editing').classList.add('display-none');
      setTimeout(() => {
        if (!document.querySelector('.box-editing-component'))
          parentElement.parentElement.classList.remove('table-body__row_hover');
      }, 50)
    },

    displayUpdate(event, value) {
      let parentElement = event.target;
      if (typeof(value) == 'object') {
        console.log(value);
        parentElement.querySelector('.content').innerText = value.text;
        parentElement.querySelector('.box-editing').setAttribute('data-value', value.value);
        parentElement.querySelector('.box-display').setAttribute('data-value', value.text);
        return;
      }
      parentElement.querySelector('.content').innerText = value;
      parentElement.querySelector('.box-editing').setAttribute('data-value', value);
      parentElement.querySelector('.box-display').setAttribute('data-value', value);
    },
  }
}