
import Vue from 'vue';
import EditCell from '../../components/TableBody/EditCell.vue';
export const EditDefaultCell = {
  data() {
    return {
      cellEditProps: {type: 'string', value: null, choices: null},
      cellEditComponent: null,
      vueCellEdit: Vue.extend(EditCell),
    }
  },
  methods: {
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
    }
  },
}