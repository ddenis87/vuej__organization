import Vue from 'vue';
import CellDefaultEditing from '../../components/TableBody/CellDefaultEditing.vue';

export const EditingCell = {
  data() {
    return {
      cellEditProps: {type: 'string', value: null, choices: null},
      cellEditComponent: null,
      vueCellEdit: Vue.extend(CellDefaultEditing),
    }
  },
  methods: {
    checkDisplayEdit(event, itemColumn) {
      console.log(itemColumn);
      if (!this.editable) return;
      let parentElement = event.target.closest('.table-body__col');
      if (itemColumn['read_only']) {
        parentElement.classList.add('table-body__col_disabled');
        parentElement.blur();
        setTimeout(() => parentElement.classList.remove('table-body__col_disabled'), 1000);
        return;
      }
      parentElement.querySelector('.box-display').classList.add('display-none');
      parentElement.querySelector('.box-editing').classList.remove('display-none');
      parentElement.classList.add('table-body__col_focus');

      if (parentElement.querySelector('.box-editing-default')) {
        this.editingStart(itemColumn, parentElement.querySelector('.box-editing-default'));
      } else {
        // custom element edit function this.$refs[nameCustomElement].editingStart(params)
      }
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
      this.cellEditProps.value = parentElement.getAttribute('data-value');
      this.cellEditProps.type = itemColumn.type;
      if (itemColumn.choices) this.cellEditProps.choices = itemColumn.choices;
      this.cellEditComponent = new this.vueCellEdit({  propsData: {listProps: this.cellEditProps} }).$mount(); 
      parentElement.prepend(this.cellEditComponent.$el);
      if (itemColumn.type != 'choice' && itemColumn.type != 'nested object') {
        parentElement.firstElementChild.firstElementChild.select()
      }
      parentElement.firstElementChild.firstElementChild.focus();
    },
    displayUpdate(event, value) {
      let parentElement = event.target;
      parentElement.querySelector('.box-full').innerText = value;
      parentElement.querySelector('.content').innerText = value;
      parentElement.querySelector('.box-editing-default').setAttribute('data-value', value);
    },
  }
}