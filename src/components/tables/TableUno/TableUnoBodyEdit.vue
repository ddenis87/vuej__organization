<template>
  <div class="box-edit">
    <input class="box-edit__input" v-if="editType == 'string'" v-model="itemValue" @keydown="inputEvent" @blur="blurInput"/>
    <input class="box-edit__input number" v-if="editType == 'integer'" v-model="itemValue" @keydown="inputEvent" @blur="blurInput" @input="validationNumber"/>

    <select class="box-edit__input select" v-if="editType == 'choice' || editType == 'nested object'" v-model="itemValue" @keydown="inputEvent" @blur="blurInput">
      <option v-for="(item, index) in editSelectList" :key="index" :value="item['display_name']">{{ item['display_name'] }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'TableUnoBodyEdit',
  props: {
    listProps: Object,
  },
  data() {
    return {
      editType: this.listProps.value,
      editSelectList: (this.listProps.choices) ? this.listProps.choices : null,
      itemValue: (this.listProps.value) ? this.listProps.value : '',
    }
  },
  watch: {
    listProps() {
      this.itemValue = this.listProps.value;
      this.editType = this.listProps.type;
      this.editSelectList = (this.listProps.choices) ? this.listProps.choices : null
      // ('choices' in this.listProps) ? this.editSelectList = this.listProps.choices : null;
      // console.log(this.listProps);
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
      // console.log(event);
      if (event.key == 'Enter') { 
        // console.log(event.target.parentElement.nextElementSibling);
        event.target.parentElement.nextElementSibling.firstElementChild.innerText = this.itemValue;
        event.target.parentElement.nextElementSibling.lastElementChild.innerText = this.itemValue;
        event.target.parentElement.classList.add('display-none');
        event.target.parentElement.nextElementSibling.classList.remove('display-none');
        event.target.parentElement.parentElement.classList.remove('table-body__col_focus');
      }
      if (event.key == 'Escape') {
        this.itemValue = this.listProps.value
        event.target.parentElement.classList.add('display-none');
        event.target.parentElement.nextElementSibling.classList.remove('display-none');
        event.target.parentElement.parentElement.classList.remove('table-body__col_focus');
      }
      if (event.key == 'Tab') {
        event.preventDefault();
        if (!event.shiftKey) {
        // console.log(event.target.parentElement);
        event.target.parentElement.nextElementSibling.firstElementChild.innerText = this.itemValue;
        event.target.parentElement.nextElementSibling.lastElementChild.innerText = this.itemValue;
        event.target.parentElement.classList.add('display-none');
        event.target.parentElement.nextElementSibling.classList.remove('display-none');
        event.target.parentElement.parentElement.classList.remove('table-body__col_focus');


        let nextElement = event.target.parentElement.parentElement.nextElementSibling.lastElementChild.lastElementChild;
        // console.log(nextElement);
        let nextEvent = new Event('dblclick',{bubbles: true});
        nextElement.dispatchEvent(nextEvent);
        } else {
          // console.log(event.target.parentElement);
          event.target.parentElement.nextElementSibling.firstElementChild.innerText = this.itemValue;
          event.target.parentElement.nextElementSibling.lastElementChild.innerText = this.itemValue;
          event.target.parentElement.classList.add('display-none');
          event.target.parentElement.nextElementSibling.classList.remove('display-none');
          event.target.parentElement.parentElement.classList.remove('table-body__col_focus');


          let previousElement = event.target.parentElement.parentElement.previousElementSibling.lastElementChild.lastElementChild;
          // console.log(previousElement);
          let nextEvent = new Event('dblclick',{bubbles: true});
          previousElement.dispatchEvent(nextEvent);
        }
      }
    },
    blurInput(event) {
      // console.log('blur');
      // console.log(event.target.parentElement.parentElement);
      this.itemValue = this.listProps.value;
      event.target.parentElement.classList.add('display-none');
      event.target.parentElement.nextElementSibling.classList.remove('display-none');
      event.target.parentElement.parentElement.classList.remove('table-body__col_focus');
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