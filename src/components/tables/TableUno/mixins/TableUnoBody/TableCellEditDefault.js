
import Vue from 'vue';
import TableCellEdit from '../../TableCellEdit.vue';
export const TableCellEditDefault = {
  data() {
    return {
      cellEditProps: {type: 'string', value: null, choices: null},
      cellEditComponent: null,
      vueCellEdit: Vue.extend(TableCellEdit),
    }
  },
  methods: {
    editingStart(itemColumn, parentElement) {
      this.cellEditProps.value = parentElement.getAttribute('data-value');
      this.cellEditProps.type = itemColumn.type;
      if (itemColumn.choices) this.cellEditProps.choices = itemColumn.choices;
      this.cellEditComponent = new this.vueCellEdit({  propsData: {listProps: this.cellEditProps} }).$mount(); 
      parentElement.prepend(this.cellEditComponent.$el);
      if (itemColumn.type != 'choice' && itemColumn.type != 'nested object') 
        parentElement.firstElementChild.firstElementChild.select()
      parentElement.firstElementChild.focus();
    }
  },
}