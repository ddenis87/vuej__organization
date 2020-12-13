<template>
  <input class="box-editing-component string" v-model="cellValue" @keydown="inputEvent" @blur="blurInput"/>
</template>

<script>
export default {
  name: 'CellDefaultEditingString',
  props: {
    dataValue: String,
  },
  data() {
    return {
      cellValue: this.dataValue,
    }
  },
  methods: {
    inputEvent(event) {
      this.$emit('input-event', event, this.cellValue);
    },
    blurInput(event) {
      this.$emit('input-blur', event);
    },
  },
}
</script>

<style lang="scss" scoped>
.string {
  width: 100%;
  background-color: #FFFFFF;
  outline: none;
  z-index: 100;
}
</style>