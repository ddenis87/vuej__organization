<template>
  <v-text-field :id="fieldId"
                class="el-field-string" 
                dense 
                v-model="fieldValue"
                :single-line="singleLine"
                :label="fieldLabel"
                :maxlength="fieldMaxLength"
                :hide-details="fieldShowValidation"
                :rules="(fieldRequired) ? [fieldRules.required] : []"
                @keydown.stop="eventKeyDown"
                @blur.stop="eventBlur"></v-text-field>
</template>

<script>
export default {
  name: 'ElFieldString',
  props: {
    properties: {type: Object, default: () => {
      return {
        value: '',
        label: '',
        text: '',
        required: false,
      }
    }},
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
    properties() { this.fieldValue = this.properties.text; }
  },
  mounted() {
    // console.log(this.properties);
    setTimeout(() => {
      if (this.selectedValue) {
        document.querySelector(`#${this.fieldId}`).setSelectionRange(0, 0);
        document.querySelector(`#${this.fieldId}`).select();
        document.querySelector(`#${this.fieldId}`).focus();
      }
    }, 10);
  },
  methods: {
    eventKeyDown(event) {
      console.log('input string component');
      if (event.key == 'Escape') {
        this.isInputEmit = true;
        this.$emit('editing-canceled', {key: 'Escape'});
        return;
      }
      if (event.key == 'Enter' || event.key == 'Tab') {
        event.preventDefault();
        // console.log(event);
        if (this.fieldRequired && this.fieldValue.length == 0) return;
        this.isInputEmit = true;
        this.$emit('editing-accepted', {
          tableName: this.properties.tableName,
          key: event.key,
          keyShift: event.shiftKey,
          value: this.fieldValue,
          field: this.properties.value,
          id: this.properties.idRow
        });
      }
    },

    eventBlur() {
      if (!this.isInputEmit) {
        console.log('blur string component');
        this.$emit('editing-canceled');
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-field-string {
  width: 100%;
  font-size: 14px;
}
.v-text-field {
  margin-top: -3.5px;
}
</style>