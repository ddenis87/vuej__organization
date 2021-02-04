<template>
  <div class="el-field">
    <el-field-date class="el-field__item"
                   :is-label="isLabel"
                   :is-single-line="isSingleLine"
                   :is-btn-clear="isBtnClear"
                   :is-required="isRequired"
                   :is-disabled="isDisabled"
                   :input-properties="{label: 'Начало'}"
                   v-model="fieldValue.start"
                   @input-value="eventInputValue"
                   @keydown-clear="eventClearValue"></el-field-date>
                   
    <el-field-date class="el-field__item"
                   :is-label="isLabel"
                   :is-single-line="isSingleLine"
                   :is-btn-clear="isBtnClear"
                   :is-required="isRequired"
                   :is-disabled="isDisabled"
                   :input-properties="{label: 'Окончание'}"
                   v-model="fieldValue.end"
                   @input-value="eventInputValue"
                   @keydown-clear="eventClearValue"></el-field-date>
  </div>
</template>

<script>
import ElFieldDate from './ElFieldDate.vue';
export default {
  name: 'ElFieldDateRange',
  model: {
    prop: 'inputValue',
    event: 'input-value'
  },
  components: {
    ElFieldDate,
  },
  props: {
    isSingleLine: { type: Boolean, default: true, },  // show or hide label
    isLabel: { type: Boolean, default: false, },  // hidden or show label
    isRequired: {type: Boolean, default: true},
    isBtnClear: {type: Boolean, default: false},
    isDisabled: { type: Boolean, default: false },
    inputValue: { type: Object, default() { return { start: null, end: null } } },
  },
  data() {
    return {
      fieldValue: {
        start: null,
        end: null,
      },
    }
  },
  watch: {
    inputValue() { this.fieldValue = this.inputValue; },
  },
  methods: {
    eventInputValue() {
      if (this.fieldValue.start && this.fieldValue.end) {
        if (this.fieldValue.start) this.fieldValue.start = this.fieldValue.start.split('-').reverse().join('.');
        if (this.fieldValue.end) this.fieldValue.end = this.fieldValue.end.split('-').reverse().join('.');
        this.$emit('input-value', this.fieldValue);
      }
    },

    eventClearValue(key) {
      switch(key) {
        case 'start': this.fieldValue.start = null; break;
        case 'end': this.fieldValue.end = null; break;
      }
      if (!this.fieldValue.start && !this.fieldValue.end) {
        this.$emit('keydown-clear');
        return;
      }
      this.$emit('input-value', this.fieldValue);
    },
  },
}
</script>

<style lang="scss" scoped>
@import './ElField.scss';

.el-field {
  display: flex;
  justify-content: space-between;
  gap: 0px 10px;
}
</style>