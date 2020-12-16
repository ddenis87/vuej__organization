<template>
  <v-text-field class="number" 
                dense
                single-line
                :rules="[...rules.required]"
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
      console.log('input number component');
      if (this.dataProps.required) {
        if (this.cellValue.length < 1) {
          if (event.key == 'Escape') { this.$emit('input-event', event, {value: this.dataProps.text, key: 'Escape'}); return; }
          if (event.key == 'Enter') return;
          if (event.key == 'Tab') { event.preventDefault(); return; }
        } 
      };
      if (event.code.includes('Key')) { event.preventDefault(); return }

      if (event.key == 'Escape') { this.$emit('input-event', event, {value: this.dataProps.text, key: 'Escape'}); return; }
      if (event.key == 'Enter') { this.$emit('input-event', event,  {value: this.cellValue, key: 'Enter'}); return; }
      if (event.key == 'Tab') { event.preventDefault(); this.$emit('input-event', event, {value: this.cellValue, key: 'Tab'}); return; }
    },
    blurInput(event) {
      console.log('blur number component');
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