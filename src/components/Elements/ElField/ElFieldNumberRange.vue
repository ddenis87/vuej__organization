<template>
  <div class="el-field">
      <el-field-number class="el-field__item range-start"
                       :is-label="isLabel"
                       :is-single-line="isSingleLine"
                       :is-btn-clear="isBtnClear"
                       :is-required="isRequired"
                       :is-disabled="isDisabled"
                       :input-properties="{label: 'Начало'}"></el-field-number>
    
      <el-field-number class="el-field__item range-end"
                       :is-label="isLabel"
                       :is-single-line="isSingleLine"
                       :is-btn-clear="isBtnClear"
                       :is-required="isRequired"
                       :is-disabled="isDisabled"
                       :input-properties="{label: 'Окончание'}"></el-field-number>
  </div>
</template>

<script>
import ElFieldNumber from './ElFieldNumber.vue';
export default {
  name: 'ElFieldNumberRange',
  model: {
    prop: 'inputValue',
    event: 'input-value'
  },
  components: {
    ElFieldNumber,
  },
  props: {
    isSingleLine: { type: Boolean, default: true, },  // show or hide label
    isLabel: { type: Boolean, default: false, },  // hidden or show label
    isRequired: {type: Boolean, default: true},
    isBtnClear: {type: Boolean, default: false},
    isDisabled: { type: Boolean, default: false },
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