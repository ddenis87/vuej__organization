<template>
  <div class="el-field">
    <v-menu offset-y
            v-model="isDialogShow"
            :close-on-click="false"
            :close-on-content-click="false">
      <template v-slot:activator="{ on }">
      <v-text-field class="el-field__item input-real"
                    append-icon="mdi-calendar-range"
                    :dense="isDense"
                    :single-line="isSingleLine"
                    :hide-details="isShowValidation"
                    :rules="(fieldRequired) ? [rules.required] : []"
                    :label="fieldLabel"
                    :disabled="isDisabled"
                    v-on="on"
                    v-model="fieldValue"
                    
                    @input="emitInputValue"
                    @keydown.stop.esc="keydownEsc"
                    @keydown.stop.prevent.enter.tab="keydownEnterTab"
                    @keydown.stop

                    @click:append="eventOpenDialog"
                    @blur.stop="blurComponent">
        <template v-slot:append-outer v-if="isBtnClear">
          <v-btn icon small :disabled="isFieldValue" @click="clearValue"><v-icon small>mdi-close</v-icon></v-btn>
        </template>
      </v-text-field>
      </template>
      <div :class="`el-field__date-picker`"
           tabindex="1"
           @blur="blurDatePicker">
        <div class="time">
          <v-text-field v-mask="fieldMaskTime" class="el-field__item" label="Время" placeholder="ЧЧ:ММ" v-model="fieldValueTime"></v-text-field> 
        </div>
        <div class="date">
          <v-date-picker v-model="fieldValueDatePicker"
                       locale="ru"
                       first-day-of-week="1"
                       no-title
                       scrollable @input="eventSelectDate"></v-date-picker>
        </div>
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
  data() {
    return {
      isDialogShow: false,
      fieldValue: (this.inputValue) ? this.inputValue.split('T')[0].split('-').reverse().join('.') + ' ' +
                                      this.inputValue.split('T')[1].slice(0, 5) : null,
      fieldValueDatePicker: (this.inputValue) ? this.inputValue.split('T')[0] : null,
      fieldValueTime: (this.inputValue) ? this.inputValue.split('T')[1].slice(0, 5) : null,
      fieldMask: [/[0123]/,/\d/,'.',/[01]/,/\d/,'.',/[2]/,/[0]/,/\d/,/\d/],
      fieldMaskTime: [/[012]/,/\d/,':',/[012345]/,/\d/],
    }
  },
  watch: {
    inputValue() {
      console.log(this.inputValue);
      this.fieldValue = (this.inputValue) ? this.inputValue.split('T')[0].split('-').reverse().join('.') + ' ' +
                                            this.inputValue.split('T')[1].slice(0, 5) : null;
      this.fieldValueDatePicker = (this.inputValue) ? this.inputValue.split('T')[0] : null;
      this.fieldValueTime = (this.inputValue) ? this.inputValue.split('T')[1].slice(0, 5) : null;
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
      this.isDialogShow = !this.isDialogShow;
    },
    eventSelectDate() {
      this.isDialogShow = false;
      this.isEmit = true;
      this.fieldValue = `${this.fieldValueDatePicker}T${(this.fieldValueTime) ? this.fieldValueTime : '00:00'}`;
      console.log(this.fieldValue);
      let sendOption = {
        key: 'Enter',
        shift: false,
        value: this.fieldValue,
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
      this.isDialogShow = false;
      this.emitAccepted(sendOption);
    },
    blurComponent(event) {
      if (!this.isEmit) {
        if (event.relatedTarget == null) {
          this.isDialogShow = false;
          this.emitCanceled();
          return;
        }
        if (event.relatedTarget)
          if (event.relatedTarget.closest(`.el-field__date-picker`)) { 
            event.relatedTarget.closest(`.el-field__date-picker`).focus();
            return;
          }
        if (!this.isEmit) {
          this.isDialogShow = false;
          this.emitCanceled();
        }
      }
    },
    blurDatePicker(event) {
      if (!this.isEmit) {
        if (event.relatedTarget == null) {
          this.isDialogShow = false;
          this.emitCanceled();
          return;
        }
        if (event.relatedTarget.classList.contains('body-column')) {
          this.isDialogShow = false;
          this.emitCanceled();
          return;
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './ElField.scss';
.el-field {
  &__date-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 255, 255, 1);
    outline: none;
    .time {
      width: 200px;
    }
    .date {
      margin-top: -20px;
    }
  }
}
</style>