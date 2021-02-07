<template>
  <div class="el-field">
    <v-text-field class="el-field__item"
                  append-icon="mdi-calendar-range"
                  :dense="isDense"
                  :single-line="isSingleLine"
                  :hide-details="isShowValidation"
                  :rules="(fieldRequired) ? [rules.required] : []"
                  :label="fieldLabel"
                  :disabled="isDisabled"
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
    <v-menu offset-y
            absolute
            :position-x="isDialogX"
            :position-y="isDialogY"
            v-model="isDialogShow"
            :close-on-click="false"
            :close-on-content-click="false">
      <div :class="`el-field__date-time`"
           tabindex="1"
           @blur="blurDatePicker">
        <div class="time">
          <v-text-field class="time__field"
                        label="Время" 
                        placeholder="ЧЧ:ММ" 
                        v-mask="fieldMaskTime" 
                        v-model="fieldValueTime"></v-text-field>
        </div>
        <div class="date">
          <v-date-picker v-model="fieldValueDatePicker"
                       locale="ru"
                       first-day-of-week="1"
                       no-title
                       scrollable 
                       @input="eventSelectDate"></v-date-picker>
        </div>
        <div class="action">
          <el-button-icon icon="mdi-close">Отменить</el-button-icon>
          <el-button-icon icon="mdi-check">Установить</el-button-icon>
        </div>
      </div>
    </v-menu>
  </div>
</template>

<script>
import { ElField } from './ElField.js';
import ElButtonIcon from '@/components/Elements/ElButtonIcon.vue';
export default {
  name: 'ElFieldDate',
  mixins: [
    ElField,
  ],
  components: {
    ElButtonIcon,
  },
  data() {
    return {
      isDialogShow: false,
      isDialogX: 0,
      isDialogY: 0,
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
      let elementTarget = event.target.closest('.el-field').getBoundingClientRect();
      this.isDialogX = elementTarget.left;
      this.isDialogY = elementTarget.top + 30;
      this.isDialogShow = !this.isDialogShow;
    },
    eventSelectDate() {
      // this.isDialogShow = false;
      this.isEmit = true;
      console.log(this.fieldValueDatePicker);
      console.log(this.fieldValueTime);
      // this.fieldValue = `${this.fieldValueDatePicker}T${(this.fieldValueTime) ? this.fieldValueTime : '00:00'}`;
      // console.log(this.fieldValue);
      // let sendOption = {
      //   key: 'Enter',
      //   shift: false,
      //   value: this.fieldValue,
      // }
      // this.emitAccepted(sendOption);
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
          if (event.relatedTarget.closest(`.el-field__date-time`)) { 
            event.relatedTarget.closest(`.el-field__date-time`).focus();
            return;
          }
        if (!this.isEmit) {
          this.isDialogShow = false;
          this.emitCanceled();
        }
      }
    },
    blurDatePicker(event) {
      console.log(event);
      if (!event.target.closest(`.el-field__date-time`)) {
        this.isDialogShow = false;
        this.emitCanceled();
      }
      // if (!this.isEmit) {
      //   if (event.relatedTarget == null) {
      //     this.isDialogShow = false;
      //     this.emitCanceled();
      //     return;
      //   }
      //   if (event.relatedTarget.classList.contains('body-column')) {
      //     this.isDialogShow = false;
      //     this.emitCanceled();
      //     return;
      //   }
      // }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './ElField.scss';
.el-field {
  &__date-time {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
    background-color: rgba(255, 255, 255, 1);
    outline: none;
    .time {
      width: 100%;
      padding: 0px 16px;
      &__field {
        font-size: 14px;
      }
    }
    .date {
      margin-top: -12px;
    }
    .action {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      padding: 0px 12px;
    }
  }
}
</style>