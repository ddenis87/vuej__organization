<template>
  <v-text-field class="number" 
                dense 
                single-line 
                v-model="cellValue" 
                @keydown="inputEvent"
                @blur="blurInput"></v-text-field>
</template>

<script>
export default {
  name: 'CellDefaultEditingNumber',
  props: {
    dataProps: Object,
  },
  data() {
    return {
      cellValue: this.dataProps.value,
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
.number {
  width: 100%;
  font-size: 14px;
}
.v-text-field {
  margin-top: -3.5px;
}
::v-deep {
  input { text-align: end; }
}

</style>