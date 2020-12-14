<template>
  <v-text-field class="string" 
                dense 
                single-line
                :rules="rules"
                counter
                :maxlength="maxLength"
                v-model="cellValue" 
                @keydown="inputEvent"
                @blur="blurInput"></v-text-field>
</template>

<script>
export default {
  name: 'CellDefaultEditingString',
  props: {
    dataProps: Object,
  },
  computed: {
    maxLength() {
      return (this.dataProps['max_length']) ? this.dataProps['max_length'] : Infinity;
    },
  },
  data() {
    return {
      cellValue: this.dataProps.text,
      // rules: [v => v.length <= this.dataProps['max_length'] || `макс. ${this.dataProps['max_length']}`],
      rules: [v => v.length > 0 || `мин. 1`],
    }
  },
  methods: {
    inputEvent(event) {
      console.log(event.key);
      if (this.cellValue.length < 1) {
        if (event.key == 'Escape') this.$emit('input-event', event);
        return;
      };
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