<template>
<v-text-field class="string" 
              dense 
              single-line 
              v-model="cellValue" 
              @keydown="inputEvent"
              @blur="blurInput" ref="boxEditing"></v-text-field>
  <!-- <input class="box-editing-component string" v-model="cellValue" @keydown="inputEvent" @blur="blurInput"/> -->
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
  font-size: 14px;
}
.v-text-field {
  margin-top: -3.5px;
}
</style>