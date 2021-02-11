<template>
  <div class="el-field">
      <el-field-number class="el-field__item range-start"
                       :is-label="isLabel"
                       :is-single-line="isSingleLine"
                       :is-btn-clear="isBtnClear"
                       :is-required="isRequired"
                       :is-disabled="isDisabled"
                       :input-properties="{label: 'Начало'}"
                       v-model="fieldValue.start"
                       @input-value="eventInputValue"
                       @keydown-clear="eventClearValue"></el-field-number>
    
      <el-field-number class="el-field__item range-end"
                       :is-label="isLabel"
                       :is-single-line="isSingleLine"
                       :is-btn-clear="isBtnClear"
                       :is-required="isRequired"
                       :is-disabled="isDisabled"
                       :input-properties="{label: 'Окончание'}"
                       v-model="fieldValue.end"
                       @input-value="eventInputValue"
                       @keydown-clear="eventClearValue"></el-field-number>
  </div>
</template>

<script>
import { ElFieldRange } from './ElFieldRange.js';
import ElFieldNumber from '../ElFieldNumber.vue';
export default {
  name: 'ElFieldRangeNumber',
  components: {
    ElFieldNumber,
  },
  mixins: [
    ElFieldRange,
  ],
}
</script>

<style lang="scss" scoped>
@import '../ElField.scss';

.el-field {
  display: flex;
  justify-content: space-between;
  gap: 0px 10px;
}
</style>