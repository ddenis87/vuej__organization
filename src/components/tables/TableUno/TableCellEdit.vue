<template>
  <div class="box-edit">
    <input class="box-edit__input" v-if="cellType == 'string'" v-model="cellValue" @keydown="inputEvent" @blur="blurInput"/>
    <input class="box-edit__input number" v-if="cellType == 'integer'" v-model="cellValue" @keydown="inputEvent" @blur="blurInput" @input="validationNumber"/>

    <select class="box-edit__input select" v-if="cellType == 'choice' || cellType == 'nested object'" v-model="cellValue" @keydown="inputEvent" @blur="blurInput">
      <option v-for="(item, index) in cellSelectList" :key="index" :value="item['display_name']">{{ item['display_name'] }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'TableCellEdit',
  props: {
    listProps: Object,
  },
  data() {
    return {
      cellType: (this.listProps) ? this.listProps.type : 'string',
      cellSelectList: (this.listProps.choices) ? this.listProps.choices : null,
      cellValue: (this.listProps) ? this.listProps.value : '',
      isEditComponent: true,
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
    inputEvent(event) {
      let parentElement = event.target.parentElement;
      if (event.key == 'Enter') {
        parentElement.nextElementSibling.firstElementChild.innerText = this.cellValue;
        parentElement.nextElementSibling.lastElementChild.innerText = this.cellValue;
        parentElement.parentElement.classList.remove('table-body__col_focus');
        parentElement.firstElementChild.blur();
      }
      if (event.key == 'Escape') {
        this.cellValue = this.listProps.value
        parentElement.parentElement.classList.remove('table-body__col_focus');
        parentElement.firstElementChild.blur();
      }
      if (event.key == 'Tab') {
        event.preventDefault();
        let nextEvent = new Event('dblclick', {bubbles: false});

        parentElement.nextElementSibling.firstElementChild.innerText = this.cellValue;
        parentElement.nextElementSibling.lastElementChild.innerText = this.cellValue;
        parentElement.parentElement.classList.remove('table-body__col_focus');
        
        if (!event.shiftKey) {
          let nextElement = parentElement.parentElement.nextElementSibling.lastElementChild.lastElementChild;
          nextElement.dispatchEvent(nextEvent);
        } else {
          let previousElement = parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild;
          previousElement.dispatchEvent(nextEvent);
        }
        parentElement.remove();
      }
    },
    blurInput(event) {
      let parentElement = event.target.parentElement ;
      this.cellValue = this.listProps.value;
      parentElement.parentElement.classList.remove('table-body__col_focus');
      parentElement.remove();
    }
  }
}
</script>

<style lang="scss" scoped>
.box-edit {
  position: absolute;
  left: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  &__input {
    width: 100%;
    height: 100%;
    padding: 6px 16px;
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