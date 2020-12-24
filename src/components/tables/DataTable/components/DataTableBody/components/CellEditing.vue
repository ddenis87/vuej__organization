<template>
  <div class="box-editing-component">
    <cell-editing-string v-if="cellType == 'string'"
                                 :data-props="listProps" 
                                 @input-event="inputEvent" 
                                 @input-blur="blurInput"></cell-editing-string>
    <cell-editing-number v-if="cellType == 'integer'"
                                 :data-props="listProps" 
                                 @input-event="inputEvent" 
                                 @input-blur="blurInput"></cell-editing-number>
    <cell-editing-select v-if="cellType == 'choice'"
                                 :data-props="listProps"
                                 @input-event="inputEvent" 
                                 @input-blur="blurInput"></cell-editing-select>
    <cell-editing-dialog v-if="cellType == 'nested object'"
                                 :data-props="listProps"
                                 @input-event="inputEvent"
                                 @input-blur="blurInput"></cell-editing-dialog>
  </div>
</template>

<script>
import CellEditingString from './CellEditingString.vue';
import CellEditingNumber from './CellEditingNumber.vue';
import CellEditingSelect from './CellEditingSelect.vue';
import CellEditingDialog from './CellEditingDialog.vue';

export default {
  name: 'CellEditing',
  components: {
    CellEditingString,
    CellEditingNumber,
    CellEditingSelect,
    CellEditingDialog,
  },
  props: {
    listProps: Object,
  },
  data() {
    return {
      cellType: (this.listProps) ? this.listProps.type : 'string',
      // cellSelectList: (this.listProps.choices) ? this.listProps.choices : null,
      cellValue: (this.listProps) ? this.listProps.value : '',
      cellEditStatus: false,
    }
  },
  created() {
    console.log(this.listProps);
  },
  methods: {
    inputEvent(event, params) {
      // console.log('input base component');
      let parentElement = event.target.closest('.table-body__col');

      
      // console.log(params.value);
      if (params.key == 'Enter') {
        this.cellValue = params.value;  // --
        this.cellEditStatus = true;
        setTimeout(() => { parentElement.focus() }, 100);
      }
      if (params.key == 'Tab') {
        this.cellValue = params.value;  // --
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
      // console.log('blur base component');
      if (!this.cellEditStatus) { 
        this.cellValue = this.listProps.text;
      }
      let parentElement = event.target.closest('.table-body__col');
      // console.log(event.target);
      // console.log(parentElement);
      let eventEditingCompleted = new CustomEvent('editing-completed', {detail: {value: this.cellValue, status: this.cellEditStatus}});
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