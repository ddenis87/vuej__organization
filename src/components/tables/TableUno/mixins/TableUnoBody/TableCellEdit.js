
import Vue from 'vue';
import TableCellEdit from '../../TableCellEdit.vue';
export const TableCellEditMix = {
  data() {
    return {
      cellEditProps: {type: 'string', value: null, choices: null},
      cellEditComponent: null,
      vueCellEdit: Vue.extend(TableCellEdit),
    }
  },
  methods: {
    editCell(event, itemColumn, itemValue) {
      let cellEditParent = event.target.parentElement.parentElement;
      if (itemColumn['read_only'] == true) {
        cellEditParent.classList.add('table-body__col_disabled');
        cellEditParent.blur();
        setTimeout(() => cellEditParent.classList.remove('table-body__col_disabled'), 1000)
        return;
      }
      this.cellEditProps.value = event.target.innerText;
      this.cellEditProps.type = itemColumn.type;
      if (itemColumn.choices) this.cellEditProps.choices = itemColumn.choices;
      this.cellEditComponent = new this.vueCellEdit({  propsData: {listProps: this.cellEditProps} }).$mount();  
      cellEditParent.prepend(this.cellEditComponent.$el);
      if (itemColumn.type != 'choice' && itemColumn.type != 'nested object') 
        event.target.parentElement.parentElement.querySelector('.box-edit').firstElementChild.select();
      cellEditParent.querySelector('.box-edit').firstElementChild.focus();
    }
  },
}