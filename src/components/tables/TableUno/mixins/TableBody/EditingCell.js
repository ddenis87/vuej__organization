import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import CellDefaultEditing from '../../components/TableBody/CellDefaultEditing.vue';

export const EditingCell = {
  data() {
    return {
      cellEditable: null,
      cellEditProps: Object,
      cellEditComponent: null,
      vueCellEdit: Vue.extend(CellDefaultEditing),
    }
  },
  methods: {
    checkDisplayEdit(event, itemColumn) {
      if (!this.editable) return;
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
      // console.log(this.cellEditProps);
      // this.cellEditProps.type = itemColumn.type;
      // if (itemColumn.choices) this.cellEditProps.choices = itemColumn.choices;
      this.cellEditComponent = new this.vueCellEdit({ vuetify, propsData: {listProps: this.cellEditProps} }).$mount(); 
      parentElement.prepend(this.cellEditComponent.$el);
      if (itemColumn.type == 'string' || itemColumn.type == 'integer') {
        parentElement.querySelector('input').select();
        parentElement.querySelector('input').focus();
      } else if ( itemColumn.type == 'nested object' ) {
        parentElement.querySelector('input').setSelectionRange(0, 0);
        // parentElement.querySelector('input').select();
      } else {
        parentElement.querySelector('input').focus();
      }
    },
    displayUpdate(event, value) {
      let parentElement = event.target;
      parentElement.querySelector('.box-full').innerText = value;
      parentElement.querySelector('.content').innerText = value;
      parentElement.querySelector('.box-editing-default').setAttribute('data-value', value);
    },
  }
}