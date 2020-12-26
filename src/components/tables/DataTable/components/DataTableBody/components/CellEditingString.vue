<template>
  <v-text-field class="string" 
                dense 
                single-line
                :rules="rules"
                :maxlength="maxLength"
                v-model="cellValue" 
                @keydown.stop="inputEvent"
                @blur.stop="blurInput"></v-text-field>
</template>

<script>
export default {
  name: 'CellEditingString',
  props: {
    dataProps: Object,
  },
  data() {
    return {
      cellValue: this.dataProps.text,
      rules: [v => (this.dataProps.required) ? v.length > 0 : true || `мин. 1` ],
    }
  },
  computed: {
    maxLength() {
      return (this.dataProps['max_length']) ? this.dataProps['max_length'] : Infinity;
    },
  },
  mounted() {
    console.log(this.dataProps);
  },
  methods: {
    inputEvent(event) {
      // console.log('input string component');
      if (this.dataProps.required) {
        if (this.cellValue.length < 1) {
          if (event.key == 'Escape') { this.$emit('input-event', event, {value: this.dataProps.text, key: 'Escape'}); return; }
          if (event.key == 'Enter') return;
          if (event.key == 'Tab') { event.preventDefault(); return; }
        } 
      };
      if (event.key == 'Escape') { this.$emit('input-event', event, {value: this.dataProps.text, key: 'Escape'}); return; }
      if (event.key == 'Enter') { this.$emit('input-event', event,  {value: this.cellValue, key: 'Enter'}); return; }
      if (event.key == 'Tab') { event.preventDefault(); this.$emit('input-event', event, {value: this.cellValue, key: 'Tab'}); return; }
    },

    blurInput(event) {
      // console.log('blur string component');
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