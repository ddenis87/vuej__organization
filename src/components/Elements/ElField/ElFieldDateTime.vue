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
                  v-mask="fieldMask"
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
            class="el-field__dialog"
            :position-x="isDialogX"
            :position-y="isDialogY"
            v-model="isDialogShow"
            :close-on-click="true"
            :close-on-content-click="false" @input="eventClickOutsideMenu">
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
          <v-date-picker v-model="fieldValueDate"
                       locale="ru"
                       first-day-of-week="1"
                       no-title
                       scrollable 
                       @input="eventSelectDate"></v-date-picker>
        </div>
        <div class="action">
          <el-button-icon icon="mdi-close" @click="eventCancel">Отменить</el-button-icon>
          <el-button-icon icon="mdi-check" @click="eventAccept">Установить</el-button-icon>
        </div>
      </div>
    </v-menu>
  </div>
</template>

<script>
import { ElField } from './ElField.js';
import ElButtonIcon from '@/components/Elements/ElButtonIcon.vue';
export default {
  name: 'ElFieldDateTime',
  mixins: [
    ElField,
  ],
  model: {
    prop: 'inputValue',
    event: 'input-value'
  },
  components: {
    ElButtonIcon,
  },
  data() {
    return {
      isDialogShow: false,
      attachDialog: null,
      isDialogX: 0,
      isDialogY: 0,
      fieldValue: (this.inputValue) ? this.inputValue.split('T')[0].split('-').reverse().join('.') + ' ' +
                                      this.inputValue.split('T')[1].slice(0, 5) : null,
      fieldValueDate: (this.inputValue) ? this.inputValue.split('T')[0] : null,
      fieldValueTime: (this.inputValue) ? this.inputValue.split('T')[1].slice(0, 5) : null,
      fieldMask: [/[0123]/,/\d/,'.',/[01]/,/\d/,'.',/[2]/,/[0]/,/\d/,/\d/,' ',/[012]/,/\d/,':',/[012345]/,/\d/],
      fieldMaskTime: [/[012]/,/\d/,':',/[012345]/,/\d/],
    }
  },
  watch: {
    inputValue() {
      console.log(this.inputValue);
      if (this.inputValue == null) {
        this.fieldValue = null;
        this.fieldValueDate = null;
        this.fieldValueTime = null;
        return;
      }
      this.fieldValue = (this.inputValue) ? this.inputValue.split('T')[0].split('-').reverse().join('.') + ' ' +
                                            this.inputValue.split('T')[1].slice(0, 5) : null;
      this.fieldValueDate = (this.inputValue) ? this.inputValue.split('T')[0] : null;
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
    emitInputValue(option) {
      if (!this.fieldValue) return;
      if (this.fieldValue.length != 16) return;
      let newDateTime = this.fieldValue.split(' ')[0].split('.').reverse().join('-') + 'T' + this.fieldValue.split(' ')[1];
      if (new Date(newDateTime) == 'Invalid Date') {
        this.fieldValue = '';
        return;
      }
      let newDate = new Date(newDateTime);
      newDate = `${newDate.getFullYear()}-` + 
                `${(+newDate.getMonth() < 9) ? '0' + (+newDate.getMonth() + 1) : +newDate.getMonth() + 1}-` + 
                `${(+newDate.getDate() < 10) ? '0' + newDate.getDate() : newDate.getDate()}`;
      if (newDate.split('-').reverse().join('.') != this.fieldValue.split(' ')[0]) {
        this.fieldValue = '';
        return;
      }
      this.$emit('input-value', newDateTime);
    },

    eventClickOutsideMenu() { this.emitCanceled(); },

    eventOpenDialog(event) {
      let elementTarget = event.target.closest('.el-field').getBoundingClientRect();
      this.isDialogX = elementTarget.left;
      this.isDialogY = elementTarget.top + 30;
      this.isDialogShow = !this.isDialogShow;
    },
    eventSelectDate() {
    },
    eventAccept() {
      let newTime = '';
      if (this.fieldValueTime != null) {
        newTime = (this.fieldValueTime.length != 5) ? '00:00' : this.fieldValueTime;
      } else { newTime = '00:00' }

      let newDate = '';
      if (this.fieldValueDate == null) {
        newDate = new Date();
        newDate = `${newDate.getFullYear()}-` + 
                  `${(+newDate.getMonth() < 9) ? '0' + (+newDate.getMonth() + 1) : +newDate.getMonth() + 1}-` + 
                  `${(+newDate.getDate() < 10) ? '0' + newDate.getDate() : newDate.getDate()}`;
      } else {
        newDate = this.fieldValueDate;
      }

      let newDateTime = `${newDate}T${newTime}`;
      let sendOption = {
        key: 'Enter',
        shift: false,
        value: newDateTime,
      }
      this.isDialogShow = false;
      this.$emit('input-value', newDateTime);
      this.$emit('keydown-enter', newDateTime);
      this.$emit('editing-accepted', sendOption);
    },

    eventCancel() {
      this.fieldValueDate = null;
      this.fieldValueTime = null;
      this.isDialogShow = false;
    },
    
    keydownEnterTab(event) {
      if (this.fieldValue.length != 16) return;
      let newDateTime = this.fieldValue.split(' ')[0].split('.').reverse().join('-') + 'T' + this.fieldValue.split(' ')[1];
      if (new Date(newDateTime) == 'Invalid Date') {
        this.fieldValue = '';
        return;
      }
      let newDate = new Date(newDateTime);
      newDate = `${newDate.getFullYear()}-` + 
                `${(+newDate.getMonth() < 9) ? '0' + (+newDate.getMonth() + 1) : +newDate.getMonth() + 1}-` + 
                `${(+newDate.getDate() < 10) ? '0' + newDate.getDate() : newDate.getDate()}`;
      if (newDate.split('-').reverse().join('.') != this.fieldValue.split(' ')[0]) {
        this.fieldValue = '';
        return;
      }
      let sendOption = {
        key: event.key,
        shift: event.shiftKey,
        value: newDateTime,
      }
      this.isEmit = true;
      this.isDialogShow = false;
      this.$emit('input-value', newDateTime);
      this.$emit('keydown-enter', newDateTime);
      this.$emit('editing-accepted', sendOption);
    },

    clearValue() {
      this.fieldValue = null;
      this.fieldValueDate = null;
      this.fieldValueTime = null;
      setTimeout(() => {
        this.fieldValue = null;
        this.fieldValueDate = null;
        this.fieldValueTime = null;
        this.$emit('input-value', null);
      },10);
      
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