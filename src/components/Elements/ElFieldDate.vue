<template>
  <div class="field-date-box">
    <v-menu offset-y
            v-model="isDialog"
            :close-on-click="false"
            :close-on-content-click="false">
      <template v-slot:activator="{ on }">
      <v-text-field class="el-field-date"
                    :dense="dense"
                    v-model="fieldValue"
                    v-mask="fieldMask"
                    :single-line="singleLine"
                    :label="fieldLabel"
                    :rules="(fieldRequired) ? [fieldRules.required] : []"
                    append-icon="mdi-calendar-range"
                    v-on="on"
                    @click:append="eventOpenDialog"
                    @keydown.stop="eventKeyDown"
                    @blur.stop="eventBlur">      
      </v-text-field>
      </template>
      <div class="field-date-box__date-picker"
           tabindex="1"
           @click="eventClickDatePicker"
           @blur="eventBlurDatePicker">
        <v-date-picker v-model="fieldValueDate"
                       locale="ru"
                       first-day-of-week="1"
                       no-title
                       scrollable @input="eventSelectDate" @change="eventChangeDatePicker"></v-date-picker>
      </div>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'ElFieldDate',
  model: {
    prop: 'propertiesValue',
    event: 'input',
  },
  props: {
    properties: '',
    propertiesValue: { type: String, default: ''},
    label: {type: Boolean, default: false}, // hidden or show label
    dense: {type: Boolean, default: true},
    singleLine: {type: Boolean, default: true},
    showValidation: {type: Boolean, default: false}, // hidden or show hint error
    selectedValue: {type: Boolean, defalt: false}, // selected value in text field after mounted
    
  },
  data() {
    return {
      isDialog: false,
      isInputEmit: false,
      fieldValue: (this.propertiesValue) ? this.propertiesValue.split('-').reverse().join('.') : null,
      fieldValueDate: (this.propertiesValue) ? this.propertiesValue : null,
      fieldRequired: this.properties?.required,
      fieldRules: {
        required: value => !!value || 'мин. 1 символ',
        date: value => {

        },
      },
      fieldMask: [/[0123]/,/\d/,'.',/[01]/,/\d/,'.',/[2]/,/[0]/,/\d/,/\d/],
    }
  },
  computed: {
    fieldLabel() { return (this.label) ? this.properties?.label: '' },
    fieldShowValidation() { return (this.showValidation) ? false : true }
  },
  watch: {
    propertiesValue() {
      this.fieldValue = this.propertiesValue; 
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.selectedValue) {
        document.querySelector(`.content-editing .v-text-field__slot input`).setSelectionRange(0, 0);
        document.querySelector(`.content-editing .v-text-field__slot input`).select();
        document.querySelector(`.content-editing .v-text-field__slot input`).focus();
      }
    }, 10);
  },
  methods: {
    eventOpenDialog() {
      this.isDialog = !this.isDialog;
    },
    eventSelectDate() {
      this.isInputEmit = true;
      this.fieldValue = this.fieldValueDate.split('-').reverse().join('.');
      this.$emit('editing-accepted', {
        tableName: this.properties.tableName,
        key: 'Enter',
        keyShift: 'false',
        value: this.fieldValue.split('.').reverse().join('-'),
        field: this.properties.value,
        id: this.properties.idRow
      });
    },

    eventKeyDown(event) {
      if (event.key == 'Escape') {
        this.isInputEmit = true;
        this.$emit('editing-canceled', {key: 'Escape'});
        return;
      }
      if (event.key == 'Enter' || event.key == 'Tab') {
        event.preventDefault();
        if (this.fieldRequired && this.fieldValue.length == 0) return;
        this.isInputEmit = true;
        let newValue;
        console.log(this.fieldValue);
        if (this.fieldValue == '') { newValue = ''; }
        else {
          newValue = new Date(this.fieldValue.split('.').reverse().join('-'));
          newValue = `${newValue.getFullYear()}-${(+newValue.getMonth() < 9) ? `0${newValue.getMonth() + 1}` : newValue.getMonth() + 1}-${(+newValue.getDate() < 10) ? `0${newValue.getDate()}` : newValue.getDate()}`;
        }
        this.$emit('editing-accepted', {
          tableName: this.properties.tableName,
          key: event.key,
          keyShift: event.shiftKey,
          value: newValue, //this.fieldValue.split('.').reverse().join('-'),
          field: this.properties.value,
          id: this.properties.idRow
        });
      }
    },
    eventBlur(event) {
      if (!this.isInputEmit) {
        if (event.relatedTarget == null) { this.$emit('editing-canceled'); return; }
        if (event.relatedTarget)
          if (event.relatedTarget.closest('.field-date-box__date-picker')) { event.relatedTarget.closest('.field-date-box__date-picker').focus(); return; }
        if (!this.isInputEmit)
          this.$emit('editing-canceled');
      }
    },
    eventBlurDatePicker(event) {
      if (!this.isInputEmit) {
        if (event.relatedTarget == null) { this.$emit('editing-canceled'); return; }
        if (event.relatedTarget.classList.contains('body-column')) { this.$emit('editing-canceled'); return; }
      }
    },
    eventClickDatePicker() {
      console.log('click date picker');
    },
    eventChangeDatePicker() {
      console.log('change date picker');
    },
  },
}
</script>

<style lang="scss" scoped>
.el-field-date {
  &__field {
    width: 100%;
  }
}
.v-text-field {
  margin-top: -3.5px;
  font-size: 14px;
}
::v-deep {
  .v-input__append-outer {
    margin-top: -8px;
  }
  .v-input__append-inner {
    button {
      margin-bottom: 3px;
    }
    
  }
}
</style>