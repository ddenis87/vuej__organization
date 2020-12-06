<template>
  <div class="box-edit">
    <input class="box-edit__input" v-model="itemValue" @keydown="inputEvent" @blur="blurInput"/>
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
      itemValue: (this.listProps.value) ? this.listProps.value : '',
    }
  },
  watch: {
    listProps() { this.itemValue = this.listProps.value }
  },
  methods: {
    inputEvent(event) {
      console.log('keydown');
      if (event.key == 'Enter') { 
        // console.log(event.target.parentElement.nextElementSibling);
        event.target.parentElement.nextElementSibling.firstElementChild.innerText = this.itemValue;
        event.target.parentElement.nextElementSibling.lastElementChild.innerText = this.itemValue;
        event.target.parentElement.classList.add('display-none');
        event.target.parentElement.nextElementSibling.classList.remove('display-none');
        event.target.parentElement.parentElement.classList.remove('table-body__col_focus');
      }
      if (event.key == 'Escape') {
        event.target.parentElement.classList.add('display-none');
        event.target.parentElement.nextElementSibling.classList.remove('display-none');
        event.target.parentElement.parentElement.classList.remove('table-body__col_focus');
      }
      if (event.key == 'Tab') {
        event.preventDefault();
        console.log(event.target.parentElement.parentElement.nextElementSibling);
      }
    },
    blurInput(event) {
      console.log('blur');
      event.target.parentElement.classList.add('display-none');
      event.target.parentElement.nextElementSibling.classList.remove('display-none');
      event.target.parentElement.parentElement.classList.remove('table-body__col_focus');
      // console.log('blur');
      // this.inputEvent(event);
      // this.$emit('pressed-key-esc', event);
      // this.$emit('pressed-key-esc', event); return;
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
  // border: thin solid red;
  // z-index: 9999;
  &__input {
    width: 100%;
    height: 100%;
    padding: 6px 16px;
    background-color: #FFFFFF;
    outline: none;
    z-index: 100;
  }
}
</style>