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
                  @keydown.stop="eventKeyDown"
                  @change="eventChangeValue"
                  @blur.stop="eventBlur"></v-autocomplete>
</template>

<script>
export default {
  name: 'ElFieldChoice',
  props: {
    properties: {type: Object, default: () => {
      return {
        value: '',
        label: '',
        text: null,
        required: false,
        choices: null,
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
      isInputFirstEnter: false,
      isElementChange: false,
      fieldId: `El-${this.properties.value}`,
      // fieldLabel: this.label ? this.properties.label : '',
      fieldValue: (this.properties.text) ? this.properties.text.value.toString() : '',
      fieldRequired: this.properties.required,
      fieldRules: {
        required: value => !!value || 'мин. 1 символ',
      }
    }
  },
  computed: {
    fieldLabel() { return (this.label) ? this.properties.label: '' },
    fieldList() {
      let fieldList = [];
      if (this.properties.choices == null) return [];
      this.properties.choices.forEach(element => {
        fieldList.push({text: element['display_name'], value: `${element['value']}`})
      })
      return fieldList;
    },
    fieldShowValidation() { return (this.showValidation) ? false : true }
  },
  mounted() {
    setTimeout(() => {
      if (this.selectedValue) {
        document.querySelector(`#${this.fieldId}`).select();
        document.querySelector(`#${this.fieldId}`).focus();
      }
    }, 10);
  },
  methods: {
    eventChangeValue() {
      // console.log('change choice component');
      this.isInputFirstEnter = true;
      this.isElementChange= true;
    },
    eventKeyDown() {
      // console.log('input choice component');
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