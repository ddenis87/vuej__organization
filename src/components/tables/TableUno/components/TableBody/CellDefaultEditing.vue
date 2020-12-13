<template>
  <div class="box-editing-component">
    <cell-default-editing-string v-if="cellType == 'string'"
                                 :data-value="cellValue" 
                                 @input-event="inputEvent" 
                                 @input-blur="blurInput"></cell-default-editing-string>
    <cell-default-editing-select v-if="cellType == 'choice'"
                                 :data-value="cellValue"
                                 :data-list="cellSelectList"
                                 @input-event="inputEvent" 
                                 @input-blur="blurInput"></cell-default-editing-select>
    <!-- <input class="box-edit-default-component__input" v-if="cellType == 'string'" v-model="cellValue" @keydown="inputEvent" @blur="blurInput"/> -->
    <!-- <input class="box-edit-default-component__input number" v-if="cellType == 'integer'" v-model="cellValue" @keydown="inputEvent" @blur="blurInput" @input="validationNumber"/>

    <select class="box-edit-default-component__input select" v-if="cellType == 'choice' || cellType == 'nested object'" v-model="cellValue" @keydown="inputEvent" @blur="blurInput">
      <option v-for="(item, index) in cellSelectList" :key="index" :value="item['display_name']">{{ item['display_name'] }}</option>
    </select> -->
  </div>
</template>

<script>
import CellDefaultEditingString from './CellDefaultEditingString.vue';
import CellDefaultEditingSelect from './CellDefaultEditingSelect.vue';

export default {
  name: 'EditDefaultCell',
  components: {
    CellDefaultEditingString,
    CellDefaultEditingSelect,
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
    validationNumber(event) {
      if (!+event.data && event.data != null) {
        this.itemValue = this.itemValue.replace(event.data, '');
        event.target.classList.add('invalid');
        setTimeout(() => { event.target.classList.remove('invalid'); }, 1000)
      }
    },
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
      // console.log('blur');
      if (!this.cellEditStatus) {
        this.cellValue = this.listProps.value;
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
  // position: absolute;
  position: relative;
  // left: 0px;
  // top: 0px;
  display: flex;
  align-items: start;
  width: 100%;
  height: 100%;
  background-color: white;
  &__input {
    width: 100%;
    // height: 100%;
    // padding: 6px 16px;
    background-color: #FFFFFF;
    outline: none;
    z-index: 100;
  }
  .invalid {
    background-color: rgba(255, 0, 0, .1);
  }
  .number {
    text-align: right;
  }
}
</style>