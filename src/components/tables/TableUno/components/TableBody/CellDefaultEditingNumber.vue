<template>
  <v-text-field class="number" 
                dense 
                single-line
                :rules="[...rules.required, ...rules.number]"
                
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
      cellValue: this.dataProps.text,
      rules: {
        required: [v => (this.dataProps.required) ? v.length > 0 : true || `мин. 1`],
        number: [v => (!!+v || v == '') || 'не число'],
      },
    }
  },
  methods: {
    inputEvent(event) {
      if (this.dataProps.required) {
        if (this.cellValue.length < 1) {
          if (event.key == 'Escape') this.$emit('input-event', event);
          return;
        }
      } else {
        if ((!+this.cellValue) && (this.cellValue != '')) {
          if (event.key == 'Escape') this.$emit('input-event', event);
          return;
        }
      }
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