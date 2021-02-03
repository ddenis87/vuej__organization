<template>
  <div class="el-field">
    <v-text-field v-if="inputType == 'text-field'"
                  class="el-field__item"
                  :dense="isDense"
                  :single-line="isSingleLine"
                  :hide-details="isShowValidation"
                  :rules="(fieldRequired) ? [rules.required] : []"
                  :label="fieldLabel"
                  :disabled="isDisabled"
                  :maxLength="fieldMaxLength"
                  v-model="fieldValue"
                  @input="emitInputValue"
                  @keydown.stop.esc="keydownEsc"
                  @keydown.stop.prevent.enter.tab="keydownEnterTab"
                  @keydown.stop
                  @blur="blurComponent">
      <template v-slot:append-outer v-if="isBtnClear">
        <v-btn icon small :disabled="isFieldValue" @click="clearValue"><v-icon small>mdi-close</v-icon></v-btn>
      </template>
    </v-text-field>
    <v-textarea v-else
                class="el-field-string"
                :dense="isDense"
                :single-line="isSingleLine"
                :hide-details="isShowValidation"
                :rules="(fieldRequired) ? [rules.required] : []"
                :label="fieldLabel"
                :maxLength="fieldMaxLength"
                auto-grow
                rows="1" height="20"
                v-model="fieldValue"
                @input="emitInputValue"
                @keydown.stop.esc="keydownEsc"
                @keydown.stop.prevent.enter.tab="keydownEnterTab"
                @keydown.stop
                @blur="blurComponent">
        <template v-slot:append-outer v-if="isBtnClear">
          <v-btn icon small :disabled="isFieldValue" @click="clearValue"><v-icon small>mdi-close</v-icon></v-btn>
        </template>
      </v-textarea>
  </div>
  
  

</template>

<script>
import { ElField } from './ElField.js';
export default {
  name: 'ElFieldString',
  mixins: [
    ElField,
  ],
  props: {
    inputType: { type: String, default: 'text-field' },
  },
  mounted() {
    setTimeout(() => {
      let fieldInput = document.querySelector(`.content-editing .v-text-field__slot input`);
      if (this.isValueSelected) {
        fieldInput.setSelectionRange(0, 0);
        fieldInput.select();
      }
      if (this.isValueFocus)
        fieldInput.focus();
    }, 10);
  },
}
</script>

<style lang="scss" scoped>
@import './ElField.scss';
</style>