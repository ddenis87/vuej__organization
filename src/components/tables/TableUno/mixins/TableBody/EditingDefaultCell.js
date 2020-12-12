
import Vue from 'vue';
import EditingCell from '../../components/TableBody/EditingCell.vue';
export const EditingDefaultCell = {
  data() {
    return {
      cellEditProps: {type: 'string', value: null, choices: null},
      cellEditComponent: null,
      vueCellEdit: Vue.extend(EditingCell),
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
    },
    displayUpdate(event, value) {
      let parentElement = event.target;
      parentElement.querySelector('.box-full').innerText = value;
      parentElement.querySelector('.content').innerText = value;
      parentElement.querySelector('.box-editing-default').setAttribute('data-value', value);
    }
  },
}