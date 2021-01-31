<template>
  <v-text-field class="el-field-number"
                :dense="isDense"
                :single-line="isSingleLine"
                :hide-details="isShowValidation"
                :rules="(fieldRequired) ? [rules.required] : []"
                :label="fieldLabel"
                v-model="fieldValue"
                @input="emitInputValue"
                @keydown.stop.esc="keydownEsc"
                @keydown.stop.prevent.enter.tab="keydownEnterTab"
                @keydown.stop="keydownKey"
                @blur="blurComponent">
    <template v-slot:append-outer v-if="isBtnClear">
      <v-btn icon small :disabled="isFieldValue" @click="clearValue"><v-icon small>mdi-close</v-icon></v-btn>
    </template>
  </v-text-field>
</template>

<script>
import { ElField } from './ElField.js';
export default {
  name: 'ElFieldNumber',
  mixins: [
    ElField,
  ],
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
  methods: {
    keydownKey(event) {
      if (event.code.includes('Key') || 
          event.code == 'BracketLeft' || 
          event.code == 'BracketRight' ||
          event.code == 'Backslash' ||
          event.code == 'Space' ||
          event.code == 'Semicolon' || 
          event.code == 'Quote' || 
          event.code == 'Comma' ||
          event.code == 'Period' ||
          event.key == '/') { event.preventDefault(); return; }

      if (event.code == 'NumpadDecimal' || event.code == 'Slash') {
        if ((this.fieldValue.match(/[\.\,]/g)) && (this.fieldValue.match(/[\.\,]/g).length > 0)) { event.preventDefault(); return; }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.el-field-number {
  width: 100%;
  font-size: 14px;
}
.v-text-field {
  margin-top: -3.5px;
}
::v-deep {
  .v-input__append-outer {
    margin-top: -8px;
  }
  input { text-align: end; }
}
</style>