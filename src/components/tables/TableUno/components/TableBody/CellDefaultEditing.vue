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
                                 :data-props="listProps"
                                 @input-event="inputEvent" 
                                 @input-blur="blurInput"></cell-default-editing-select>
    <cell-default-editing-dialog v-if="cellType == 'nested object'"
                                 :data-props="listProps"
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
    inputEvent(event, params) {
      // console.log(event);
      // console.log(params);
      console.log('input base component');
      let parentElement = event.target.closest('.table-body__col');

      this.cellValue = params.value;  // --

      if (params.key == 'Enter') {
        this.cellEditStatus = true;
        parentElement.focus();
      }
      if (params.key == 'Tab') {
        this.cellEditStatus = true;
        let nextEvent = new Event('dblclick', {bubbles: false});
        let nextElement = null;
        if (!event.shiftKey) nextElement = parentElement.nextElementSibling;
        else nextElement = parentElement.previousElementSibling;
        nextElement.dispatchEvent(nextEvent);
      }
      event.target.blur(); // -- //
    },
    blurInput(event) {
      console.log('blur base component')
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