<template>
  <v-text-field class="number" 
                dense
                single-line
                :rules="[...rules.required]"
                v-model="cellValue" 
                @keydown.stop="inputEvent"
                @blur="blurInput"></v-text-field>
</template>

<script>
export default {
  name: 'CellEditingNumber',
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
          if (event.key == 'Escape') { this.$emit('input-event', event, {value: this.dataProps.text, key: 'Escape'}); return; }
          if (event.key == 'Enter') return;
          if (event.key == 'Tab') { event.preventDefault(); return; }
        } 
      };
      
      if (event.key == 'Escape') { this.$emit('input-event', event, {value: this.dataProps.text, key: 'Escape'}); return; }
      if (event.key == 'Enter') {
        this.cellValue = this.cellValue.replace(/\./g, ','); 
        this.$emit('input-event', event,  {value: this.cellValue, key: 'Enter'}); return; 
      }
      if (event.key == 'Tab') { 
        event.preventDefault(); 
        this.cellValue = this.cellValue.replace(/\./g, ','); 
        this.$emit('input-event', event, {value: this.cellValue, key: 'Tab'}); return; }

      if (event.code.includes('Key') || 
          event.code == 'BracketLeft' || 
          event.code == 'BracketRight' ||
          event.code == 'Semicolon' || 
          event.code == 'Quote' || 
          event.code == 'Comma' ||
          event.code == 'Period') { event.preventDefault(); return; }

      if (event.code == 'NumpadDecimal' || event.code == 'Slash') {
        if ((this.cellValue.match(/[\.\,]/g)) && (this.cellValue.match(/[\.\,]/g).length > 0)) { event.preventDefault(); return; }
      }
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