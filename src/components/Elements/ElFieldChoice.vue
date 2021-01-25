<template>
  <v-autocomplete 
                  class="el-field-choice"
                  dense
                  auto-select-first
                  return-object
                  v-model="fieldValue"
                  hide-selected
                  no-data-text="Значение отсутствует"
                  :single-line="singleLine"
                  :label="fieldLabel"
                  :hide-details="fieldShowValidation"
                  :rules="(fieldRequired) ? [fieldRules.required] : []"
                  :items="fieldList"
                  item-text="display_name"
                  item-value="value"
                  @keydown.stop="eventKeyDown"
                  @change="eventChangeValue"
                  @blur.stop="eventBlur">
    <template v-slot:append-outer v-if="btClear">
      <v-btn icon small :disabled="isValue" @click="clearValue"><v-icon small>mdi-close</v-icon></v-btn>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  name: 'ElFieldChoice',
  model: {
    prop: 'propertiesValue',
    event: 'input'
  },
  props: {
    isUse: { type: String, default: '' },
    properties: '',
    propertiesValue: '',
    label: {type: Boolean, default: false}, // hidden or show label
    singleLine: {type: Boolean, default: true},
    showValidation: {type: Boolean, default: false}, // hidden or show hint error
    selectedValue: {type: Boolean, defalt: false}, // selected value in text field after mounted
    btClear: {type: Boolean, default: false},
  },
  data() {
    return {
      isInputEmit: false,
      isInputFirstEnter: false,
      isElementChange: false,
      fieldId: `El-${(this.properties) ? `${this.isUse}-` + this.properties.value : ''}`,
      fieldValue: this.propertiesValue?.value,
      fieldRequired: (this.properties) ? this.properties.required : false,
      fieldRules: {
        required: value => !!value || 'не выбран',
      }
    }
  },
  computed: {
    isValue() { return (this.fieldValue == undefined) ? true : false },
    fieldLabel() { return (this.label) ? this.properties?.label: '' },
    fieldShowValidation() { return (this.showValidation) ? false : true },
    fieldList() {
      // let fieldList = [];
      if (!this.properties?.choices) return [];
      return this.properties.choices;
    },
  },
  watch: {
    propertiesValue() {
      this.fieldValue = this.propertiesValue?.value;
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.selectedValue) {
        document.querySelector(`.content-editing .v-select__slot input`).select();
        document.querySelector(`.content-editing .v-select__slot input`).focus();
      }
    }, 50);
  },
  methods: {
    eventChangeValue() {
      this.isInputFirstEnter = true;
      this.isElementChange= true;
      console.log(this.fieldValue);
      this.$emit('input', this.fieldValue);
    },
    eventKeyDown(event) {
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
        // console.log(this.fieldValue);
        let newFieldValue = (this.isInputFirstEnter) ? {
          'display_name': this.fieldValue['display_name'],
          value: this.fieldValue.value
        } : this.properties['display_name'];
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
    clearValue() {
      this.fieldValue = undefined;
      this.$emit('clear');
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
  .v-input__append-outer {
    margin-top: -0px;
  }
}
</style>