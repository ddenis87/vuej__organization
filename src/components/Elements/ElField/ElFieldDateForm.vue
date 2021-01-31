<template>
  <div class="field-date-box">
    <v-text-field class="el-field-date"
                    append-icon="mdi-calendar-range"
                    :dense="isDense"
                    :single-line="isSingleLine"
                    :hide-details="isShowValidation"
                    :rules="(fieldRequired) ? [rules.required] : []"
                    :label="fieldLabel"
                    v-model="fieldValue"
                    v-mask="fieldMask"
                    @input="emitInputValue"
                    @keydown.stop.esc="keydownEsc"
                    @keydown.stop.prevent.enter.tab="keydownEnterTab"
                    @keydown.stop

                    @click:append="eventOpenDialog"
                    @blur.stop="blurComponent">      
      </v-text-field>
    <v-menu offset-y
            v-model="isDialogShow"
            :close-on-click="false"
            :close-on-content-click="false" attach=".field-date-box" bottom>

      <div :class="`field-date-box__date-picker${this.isUseIn.replace('.', ' ')}`"
           tabindex="1"
           
           @blur="blurDatePicker">
        <v-date-picker v-model="fieldValueDatePicker"
                       locale="ru"
                       first-day-of-week="1"
                       no-title
                       scrollable @input="eventSelectDate"></v-date-picker>
      </div>
    </v-menu>
  </div>
</template>

<script>
import { ElField } from './ElField.js';
export default {
  name: 'ElFieldDate',
  mixins: [
    ElField,
  ],
  props: {
    isUseIn: { type: String, default: '' },
  },
  data() {
    return {
      isDialogShow: false,
      fieldValue: (this.inputValue) ? this.inputValue.split('-').reverse().join('.') : null,
      fieldValueDatePicker: (this.inputValue) ? this.inputValue : null,
      fieldMask: [/[0123]/,/\d/,'.',/[01]/,/\d/,'.',/[2]/,/[0]/,/\d/,/\d/],
    }
  },
  watch: {
    inputValue() {
      this.fieldValue = (this.inputValue) ? this.inputValue.split('-').reverse().join('.') : null;
      this.fieldValueDatePicker = (this.inputValue) ? this.inputValue.split('.').reverse().join('-') : null;
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.isValueSelected) {
        document.querySelector(`.content-editing .v-text-field__slot input`).setSelectionRange(0, 0);
        document.querySelector(`.content-editing .v-text-field__slot input`).select();
        document.querySelector(`.content-editing .v-text-field__slot input`).focus();
      }
    }, 10);
  },
  methods: {
    eventOpenDialog(event) {
      // console.log(`dialog open - ${this.isUseIn}`);
      this.isDialogShow = true;
    },
    eventSelectDate() {
      // console.log(`select date dialog - ${this.isUseIn}`);
      this.isDialogShow = false;
      this.isEmit = true;
      this.fieldValue = this.fieldValueDatePicker;
      let sendOption = {
        key: 'Enter',
        shift: false,
        value: this.fieldValueDatePicker,
      }
      this.emitAccepted(sendOption);
    },
    keydownEnterTab(event) {
      this.isEmit = true;
      let sendOption = {
        key: event.key,
        shift: event.shiftKey,
        value: this.fieldValue.split('.').reverse().join('-'),
      }
      this.emitAccepted(sendOption);
    },
    blurComponent(event) {
      if (!this.isEmit) {
        if (event.relatedTarget == null) {
          this.emitCanceled();
          // this.isDialogShow = false;
          return;
        }
        if (event.relatedTarget)
          if (event.relatedTarget.closest(`.field-date-box__date-picker${this.isUseIn}`)) { 
            event.relatedTarget.closest(`.field-date-box__date-picker${this.isUseIn}`).focus();
            return;
          }
        if (!this.isEmit) {
          this.emitCanceled();
          // this.isDialogShow = false;
        }
      }
    },
    blurDatePicker(event) {
      // this.isDialogShow = false;
      if (!this.isEmit) {
        if (event.relatedTarget == null) {
          this.emitCanceled();
          return;
        }
        if (event.relatedTarget.classList.contains('body-column')) {
          this.emitCanceled();
          return;
        }
      }
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