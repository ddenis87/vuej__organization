<template>
  <v-autocomplete :id="fieldId"
                  class="el-field-choice"
                  dense
                  auto-select-first
                  return-object
                  v-model="fieldValue"
                  hide-selected
                  :single-line="singleLine"
                  :label="fieldLabel"
                  :hide-details="fieldShowValidation"
                  :items="fieldList"
                  item-text="display_name"
                  item-value="value"
                  @keydown.stop="eventKeyDown"
                  @change="eventChangeValue"
                  @blur.stop="eventBlur"></v-autocomplete>
</template>

<script>
export default {
  name: 'ElFieldChoice',
  model: {
    event: 'input'
  },
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
      isInputFirstEnter: false,
      isElementChange: false,
      fieldId: `El-${this.properties.value}`,
      // fieldLabel: this.label ? this.properties.label : '',
      fieldValue: (this.properties.text) ? this.properties.text.value : '',
      fieldRequired: this.properties.required,
      fieldRules: {
        required: value => !!value || 'мин. 1 символ',
      }
    }
  },
  computed: {
    fieldLabel() { return (this.label) ? this.properties.label: '' },
    fieldShowValidation() { return (this.showValidation) ? false : true },
    fieldList() {
      let fieldList = [];
      if (this.properties.choices == null) return [];
      return this.properties.choices;
    },
  },
  watch: {
    propertiesValue() {
      this.fieldValue = this.properties.text?.value;
      // console.log('watch choice component');
      console.log(this.fieldList.find(item => item.value == this.fieldValue));
      this.$emit('input', this.fieldList.find(item => item.value == this.fieldValue));
    }
  },
  mounted() {
    console.log('mounted choice component');
    console.log(this.fieldList.find(item => item.value == this.fieldValue));
    this.$emit('input', this.fieldList.find(item => item.value == this.fieldValue));
    setTimeout(() => {
      this.$emit('input', this.fieldValue );
      if (this.selectedValue) {
        document.querySelector(`#${this.fieldId}`).select();
        document.querySelector(`#${this.fieldId}`).focus();
      }
    }, 10);
  },
  methods: {
    eventChangeValue() {
      // console.log('change choice component');
      // console.log(this.fieldValue);
      this.isInputFirstEnter = true;
      this.isElementChange= true;
      this.$emit('input', this.fieldValue);
    },
    eventKeyDown() {
      if (event.key == 'Escape') {
        this.isInputEmit = true;
        this.$emit('editing-canceled', {key: 'Escape'});
        return;
      }
      if (event.key == 'Enter')
        if (!this.isInputFirstEnter || !this.isElementChange) { this.isInputFirstEnter = true; return; }
      
      if (event.key == 'Enter' || event.key == 'Tab') {
        event.preventDefault();

        if (this.fieldRequired && this.fieldValue.length == 0) return;
        let newFieldValue = (this.isInputFirstEnter) ? {
          'display_name': this.fieldValue.text,
          value: this.fieldValue.value
        } : this.properties.text;
        this.isInputEmit = true;
        this.$emit('editing-accepted', {
          tableName: this.properties.tableName,
          key: event.key,
          keyShift: event.shiftKey,
          value: newFieldValue,
          field: this.properties.value,
          id: this.properties.idRow
        });
      }
    },
    eventBlur() {
      if (!this.isInputEmit) {
        // console.log('blur choice component');
        this.$emit('editing-canceled');
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.v-input {
  text-align: center;
  font-size: 14px;
  .v-input__control {
    padding: 0px;
  }
}
.v-text-field {
  margin-top: -3.5px;
   input {
    padding: 0px;
  }
}
::v-deep {
  .v-input__append-inner {
    cursor: pointer;
  }
}
</style>