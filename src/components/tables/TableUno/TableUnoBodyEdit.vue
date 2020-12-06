<template>
  <div class="box-edit">
    <input class="box-edit__input" v-model="itemValue" @keydown="inputEvent" @blur="inputEvent"/>
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
      if (event.key == 'Enter') { this.$emit('pressed-key-enter', event, this.itemValue); return; }
      if (event.key == 'Escape') { this.$emit('pressed-key-esc', event); return; }
      if (event.key == 'Tab') { this.$emit('pressed-key-tab', event, this.itemValue); return; }
      if (event.key == undefined) {
        this.$emit('edit-blur', event); return;
      }
    },
    // blurInput(event) {
    //   this.$emit('pressed-key-esc', event); return;
    // }
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