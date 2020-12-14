<template>
  <div class="box-editing-component">
    <cell-default-editing-string v-if="cellType == 'string'"
                                 :data-props="listProps" 
                                 @input-event="inputEvent" 
                                 @input-blur="blurInput"></cell-default-editing-string>
    <cell-default-editing-number v-if="cellType == 'integer'"
                                 :data-props="listProps" 
                                 @input-event="inputEvent" 
                                 @input-blur="blurInput"></cell-default-editing-number>
    <cell-default-editing-select v-if="cellType == 'choice'"
                                 :data-value="cellValue"
                                 :data-list="cellSelectList"
                                 @input-event="inputEvent" 
                                 @input-blur="blurInput"></cell-default-editing-select>
    <cell-default-editing-dialog v-if="cellType == 'nested object'"
                                 :data-value="cellValue"
                                 :data-list="cellSelectList"
                                 @input-event="inputEvent"
                                 @input-blur="blurInput"></cell-default-editing-dialog>
  </div>
</template>

<script>
import CellDefaultEditingString from './CellDefaultEditingString.vue';
import CellDefaultEditingNumber from './CellDefaultEditingNumber.vue';
import CellDefaultEditingSelect from './CellDefaultEditingSelect.vue';
import CellDefaultEditingDialog from './CellDefaultEditingDialog.vue';

export default {
  name: 'EditDefaultCell',
  components: {
    CellDefaultEditingString,
    CellDefaultEditingNumber,
    CellDefaultEditingSelect,
    CellDefaultEditingDialog,
  },
  props: {
    listProps: Object,
  },
  data() {
    return {
      cellType: (this.listProps) ? this.listProps.type : 'string',
      cellSelectList: (this.listProps.choices) ? this.listProps.choices : null,
      cellValue: (this.listProps) ? this.listProps.value : '',
      cellEditStatus: false,
    }
  },
  methods: {
    inputEvent(event, value) {

      let parentElement = event.target.closest('.table-body__col');
      if (event.key == 'Enter') {
        this.cellEditStatus = true;
        this.cellValue = value;
        event.target.blur();
      }
      if (event.key == 'Escape') {
        this.cellValue = this.listProps.value;
        event.target.blur();
      }
      if (event.key == 'Tab') {
        event.preventDefault();
        this.cellEditStatus = true;
        this.cellValue = value;
        let nextEvent = new Event('dblclick', {bubbles: false});
        if (!event.shiftKey) {
          let nextElement = parentElement.nextElementSibling;
          nextElement.dispatchEvent(nextEvent);
          
        } else {
          let previousElement = parentElement.previousElementSibling;
          previousElement.dispatchEvent(nextEvent);
        }
        event.target.blur();
      }
    },
    blurInput(event) {
      if (!this.cellEditStatus) {
        this.cellValue = this.listProps.text;
      }
      let parentElement = event.target.closest('.table-body__col');
      let eventEditingCompleted = new CustomEvent('editing-completed', {detail: this.cellValue});
      parentElement.dispatchEvent(eventEditingCompleted);
      parentElement.querySelector('.box-editing-component').remove();
    }
  }
}
</script>

<style lang="scss" scoped>
.box-edit-default-component {
  position: relative;
  display: flex;
  align-items: start;
  width: 100%;
  height: 100%;
  background-color: white;
  &__input {
    width: 100%;
    background-color: #FFFFFF;
    outline: none;
    z-index: 100;
  }
}
</style>