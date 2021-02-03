<template>
  <!-- <div class="el-field"> -->
    <v-text-field class="el-field-string"
                  :single-line="isSingleLine"
                  :hide-details="isShowValidation"
                  :rules="(fieldRequired) ? [rules.required] : []"
                  :label="fieldLabel"
                  :maxLength="fieldMaxLength"
                  v-model="fieldValue"
                  clear-icon="mdi-close"
                  clearable
                  prepend-icon="mdi-magnify"
                  @click:clear="clearValue"
                  @input="emitInputValue"
                  @keydown.stop.esc="keydownEsc"
                  @keydown.stop.prevent.enter="keydownEnterTab"
                  @keydown.stop
                  @blur="blurComponent">
      <template v-slot:append>
        <v-btn class="el-field-string__append" icon small @click="keydownEnterTab"><v-icon >mdi-arrow-right</v-icon></v-btn>
      </template>
    </v-text-field>
  <!-- </div> -->
</template>

<script>
import { ElField } from './ElField.js';
export default {
  name: 'ElFieldSearch',
  mixins: [
    ElField,
  ],
}
</script>

<style lang="scss" scoped>
// @import './ElField.scss';
.el-field-string {
  width: 100%;
  font-size: 14px;
  &__append {
    margin-top: -2px;
  }
}
.v-text-field {
  margin-top: -3.5px;
}
</style>