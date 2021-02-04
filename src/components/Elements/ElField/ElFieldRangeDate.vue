<template>
  <div class="el-field">
    <el-field-date class="el-field__item"
                   :is-label="isLabel"
                   :is-single-line="isSingleLine"
                   :is-btn-clear="isBtnClear"
                   :is-required="isRequired"
                   :is-disabled="isDisabled"
                   :input-properties="{label: 'Начало'}"
                   v-model="start"
                   @input-value="eventInputValue"
                   @keydown-clear="eventClearValueStart"></el-field-date>
                   
    <el-field-date class="el-field__item"
                   :is-label="isLabel"
                   :is-single-line="isSingleLine"
                   :is-btn-clear="isBtnClear"
                   :is-required="isRequired"
                   :is-disabled="isDisabled"
                   :input-properties="{label: 'Окончание'}"
                   v-model="end"
                   @input-value="eventInputValue"
                   @keydown-clear="eventClearValueEnd"></el-field-date>
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
      // fieldValue: {
        start: null,
        end: null,
      // },
    }
  },
  watch: {
    inputValue() { 
      this.start = (this.inputValue.start) ? this.inputValue.start : null;
      this.end = (this.inputValue.end) ? this.inputValue.end : null;
    }, 
  },
  methods: {
    eventInputValue() {
      if (this.start && this.end) {
        if (this.start) this.start = this.start.split('-').reverse().join('.');
        if (this.end) this.end = this.end.split('-').reverse().join('.');
        this.$emit('input-value', { start: this.start, end: this.end });
      }
    },
    eventClearValueStart() {
       this.start = null;
       if (!this.start && !this.end) {
        this.$emit('keydown-clear');
        return;
      }
      // this.$emit('input-value', { start: this.start, end: this.end });
    },
    eventClearValueEnd() {
       this.end = null;
       if (!this.start && !this.end) {
        this.$emit('keydown-clear');
        return;
      }
      // this.$emit('input-value', { start: this.start, end: this.end });
    },
    // eventClearValue(key) {
    //   console.log(key);
    //   switch(key) {
    //     case 'start': { this.fieldValue.start = null; break; }
    //     case 'end': { this.fieldValue.end = null; break; }
    //   }
    //   if (!this.fieldValue.start && !this.fieldValue.end) {
    //     this.$emit('keydown-clear');
    //     return;
    //   }
    //   this.$emit('input-value', this.fieldValue);
    // },
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