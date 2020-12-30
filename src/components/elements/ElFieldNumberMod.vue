<template>
  <v-text-field :id="fieldId"
                class="el-field-number" 
                dense
                v-model="fieldValue"
                :single-line="singleLine"
                :label="fieldLabel"
                :hide-details="fieldShowValidation"
                :rules="(fieldRequired) ? [fieldRules.required] : []"
                @keydown.stop="eventKeyDown"
                @blur.stop="eventBlur" @input="eventInput"></v-text-field>
</template>

<script>
export default {
  name: 'ElFieldNumber',
  props: {
    properties: null,
    propertiesValue: null,
    label: {type: Boolean, default: false}, // hidden or show label
    singleLine: {type: Boolean, default: true},
    showValidation: {type: Boolean, default: false}, // hidden or show hint error
    selectedValue: {type: Boolean, defalt: false} // selected value in text field after mounted
  },
  data() {
    return {
      isInputEmit: false,
      fieldId: `El-${this.properties.value}`,
      // fieldLabel: this.label ? this.properties.label : '',
      fieldValue: this.properties.text,
      fieldRequired: this.properties.required,
      fieldRules: {
        required: value => !!value || 'мин. 1 символ',
      }
    }
  },
  computed: {
    fieldLabel() { return (this.label) ? this.properties.label: '' },
    fieldMaxLength() { return (this.properties['max_length']) ? this.properties['max_length'] : Infinity; },
    fieldShowValidation() { return (this.showValidation) ? false : true }
  },
  watch: {
    propertiesValue() { 
      // console.log('element watch'); 
      this.fieldValue = this.properties.text; 
      this.$emit('input', this.fieldValue);
      // console.log(this.fieldValue);
    }
  },
  mounted() {
    setTimeout(() => {
      this.$emit('input', this.fieldValue);
      if (this.selectedValue) {
        document.querySelector(`#${this.fieldId}`).setSelectionRange(0, 0);
        document.querySelector(`#${this.fieldId}`).select();
        document.querySelector(`#${this.fieldId}`).focus();
      }
    }, 100);
  },
  methods: {
    eventInput() {
      this.$emit('input', this.fieldValue);
    },
    eventKeyDown(event) {
      // console.log('input string component');
      if (event.key == 'Escape') {
        this.isInputEmit = true;
        this.$emit('editing-canceled', {key: 'Escape'});
        return;
      }
      if (event.key == 'Enter' || event.key == 'Tab') {
        event.preventDefault();
        if (this.fieldRequired && this.fieldValue.length == 0) return;
        this.isInputEmit = true;
        // console.log(this.fieldValue);
        this.fieldValue = this.fieldValue.toString().replace(/\./g, ','); 
        this.$emit('editing-accepted', {
          tableName: this.properties.tableName,
          key: event.key,
          keyShift: event.shiftKey,
          value: this.fieldValue,
          field: this.properties.value,
          id: this.properties.idRow
        });
        return;
      }
      if (event.code.includes('Key') || 
          event.code == 'BracketLeft' || 
          event.code == 'BracketRight' ||
          event.code == 'Backslash' ||
          event.code == 'Space' ||
          event.code == 'Semicolon' || 
          event.code == 'Quote' || 
          event.code == 'Comma' ||
          event.code == 'Period' ||
          event.key == '/') { event.preventDefault(); return; }

      if (event.code == 'NumpadDecimal' || event.code == 'Slash') {
        if ((this.fieldValue.match(/[\.\,]/g)) && (this.fieldValue.match(/[\.\,]/g).length > 0)) { event.preventDefault(); return; }
      }
    },

    eventBlur() {
      if (!this.isInputEmit) {
        // console.log('blur string component');
        this.$emit('editing-canceled');
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-field-number {
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