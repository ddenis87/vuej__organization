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
    checkDisplayEdit(event, itemColumn) {
      if (!this.editable) { this.$emit('dblclick-row', event, itemColumn); return;}
      if (itemColumn['read_only']) return;
      let parentElement = event.target.closest('.table-body__col');
      if (parentElement.querySelector('.box-display.display-none')) return;

      console.log('check display edit for dblclick');
      
      parentElement.classList.add('table-body__col_focus');
      setTimeout(() => {
        parentElement.querySelector('.box-display').classList.add('display-none');
        parentElement.querySelector('.box-editing').classList.remove('display-none');
        if (parentElement.querySelector('.box-editing-default')) {
          this.editingStart(itemColumn, parentElement.querySelector('.box-editing-default'));
        } else {
          // custom element edit function this.$refs[nameCustomElement].editingStart(params)
        }
      }, 10);
    },

    // check editing for keydown
    checkDisplayEditForKeydown(event, itemColumn) {
      if (event.code.includes('Arrow')) {
        event.preventDefault();
        if (event.code == 'ArrowRight' && event.target.nextElementSibling) { event.target.nextElementSibling.focus(); return }
        if (event.code == 'ArrowLeft' && event.target.previousElementSibling) { event.target.previousElementSibling.focus(); return }
        if (event.code == 'ArrowDown' && event.target.parentElement.nextElementSibling) { event.target.parentElement.nextElementSibling.children[event.target.getAttribute('tabindex')].focus(); return; }
        if (event.code == 'ArrowUp' && event.target.parentElement.previousElementSibling) { event.target.parentElement.previousElementSibling.children[event.target.getAttribute('tabindex')].focus(); return; }
        // console.log(event.target);
      }
      if (!this.editable) return;
      if (itemColumn['read_only']) return;
      let parentElement = event.target.closest('.table-body__col');
      if (parentElement == null || parentElement.querySelector('.box-display.display-none')) return;

      console.log('check display edit for keydown');
      
      if (event.code.includes('Key') || event.code.includes('Digit')) this.checkDisplayEdit(event, itemColumn);
    }, 
    
    editingCompleted(event) {
      let parentElement = event.target;
      if (parentElement.querySelector('.box-display-default')) {
        this.displayUpdate(event, event.detail);
      } else {
        // custom element display function for update view this.$refs[nameCustomElement].displayUpdate
      }
      parentElement.querySelector('.box-display').classList.remove('display-none');
      parentElement.querySelector('.box-editing').classList.add('display-none');
      parentElement.classList.remove('table-body__col_focus');
    },

    // default methods for editing 
    editingStart(itemColumn, parentElement) {
      this.cellEditProps = itemColumn;
      this.cellEditProps.text = parentElement.getAttribute('data-value');
      // 
      // this.cellEditProps.type = itemColumn.type;
      // if (itemColumn.choices) this.cellEditProps.choices = itemColumn.choices;
      this.cellEditComponent = new this.vueCellEdit({ vuetify, store, propsData: {listProps: this.cellEditProps} }).$mount(); 
      parentElement.prepend(this.cellEditComponent.$el);
      if (itemColumn.type == 'string' || itemColumn.type == 'integer') {
        parentElement.querySelector('input').select();
        parentElement.querySelector('input').focus();
      } else if ( itemColumn.type == 'nested object' ) {
        // console.log(parentElement.querySelector('input'));
        parentElement.querySelector('input').focus();
        // console.log(parentElement.querySelector('.v-select__slot').firstChild);
        // parentElement.querySelector('.v-select__slot').firstChild.select();
      } else {
        parentElement.querySelector('input').focus();
      }
    },
    displayUpdate(event, value) {
      let parentElement = event.target;
      // parentElement.querySelector('.box-full').innerText = value;
      parentElement.querySelector('.content').innerText = value;
      parentElement.querySelector('.box-editing-default').setAttribute('data-value', value);
    },
  }
}