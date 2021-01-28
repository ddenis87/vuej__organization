<template>
    <v-menu v-model="isDialog" offset-y>
      <template v-slot:activator="{ on }">
      <v-text-field class="el-field-date"
                    :dense="dense"
                    v-model="fieldValue"
                    v-mask="'##.##.####'"
                    :single-line="singleLine"
                    :label="fieldLabel"
                    append-icon="mdi-menu-down"
                    v-on="on"
                    @click:append="eventOpenDialog"
                    @keydown.stop="eventKeyDown"
                    @blur.stop="eventBlur"></v-text-field>
      </template>
      <v-date-picker
          v-model="fieldValueDate"
          locale="ru"
          first-day-of-week="1"
          
          no-title
          scrollable @input="eventSelectDate"
        ></v-date-picker>
    </v-menu>
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
      }
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
      if (this.isDialog == true) this.isInputEmit = true;
    },
    eventSelectDate() {
      this.fieldValue = this.fieldValueDate.split('-').reverse().join('.');
      this.$emit('editing-accepted', {
        tableName: this.properties.tableName,
        key: 'Enter',
        keyShift: 'false',
        value: this.fieldValue.split('.').reverse().join('-'),
        field: this.properties.value,
        id: this.properties.idRow
      });
    //   setTimeout(() => {
    //   // if (this.selectedValue) {
    //     document.querySelector(`.content-editing .v-text-field__slot input`).setSelectionRange(0, 0);
    //     document.querySelector(`.content-editing .v-text-field__slot input`).select();
    //     document.querySelector(`.content-editing .v-text-field__slot input`).focus();
    //     this.isInputEmit = false;
    //   // }
    // }, 10);
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
        this.$emit('editing-accepted', {
          tableName: this.properties.tableName,
          key: event.key,
          keyShift: event.shiftKey,
          value: this.fieldValue.split('.').reverse().join('-'),
          field: this.properties.value,
          id: this.properties.idRow
        });
      }
    },
    eventBlur(event) {
      console.log(event);
      if (event.relatedTarget && event.relatedTarget.classList.contains('body-column'))
        if (!this.isInputEmit)
          this.$emit('editing-canceled');
      // if (!this.isInputEmit) {
      //   this.$emit('editing-canceled');
      // }
    }
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
}
</style>