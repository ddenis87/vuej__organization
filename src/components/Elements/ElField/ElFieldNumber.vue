<template>
  <div class="el-field el-field-number"
       :class="{'el-field_single-line': isSingleLine, 
                'el-field_hide-message': isHideMessage,
                'el-field_hide-underline': isHideUnderline}">
    <v-text-field class="el-field__item"
                  dense
                  tabindex="1"
                  :single-line="isSingleLine"
                  :hide-details="isHideMessage"
                  :disabled="isDisabled"
                  :label="fieldLabel"
                  :clearable="isBtnClear"
                  :solo="isHideUnderline"
                  :flat="isHideUnderline"
                  :rules="(fieldRequired) ? [rules.required] : []"
                  v-model="fieldValue"
                  @click:clear="eventClearValue"
                  @input="eventInputValue"
                  @keydown.enter="eventKeyEnter"
                  @keydown.tab="eventKeyTab"
                  @keydown.esc="eventKeyEsc"
                  @keydown.stop="eventKey"
                  @blur="eventBlurField">
      <!-- <template v-slot:append-outer v-if="isBtnClear">
        <el-btn-icon-small tabindex="2" icon="mdi-close" no-tooltip @click="eventClearValue"></el-btn-icon-small>
      </template> -->
    </v-text-field>
  </div>
</template>

<script>
import { ElField } from './ElField.js';
export default {
  name: 'ElFiledNumber',
  mixins: [
    ElField,
  ],
  computed: {
    fieldMaxLength() { return ('max_length' in this.inputProperties) ? this.inputProperties['max_length'] : Infinity; },
  },
  mounted() {
    let fieldInput = document.querySelector(`.content-editing .v-text-field__slot input`);
    if (!fieldInput) return;
    setTimeout(() => {
      fieldInput.setSelectionRange(0, 0);
      fieldInput.select();
      fieldInput.focus();
    }, 10);
  },
  methods: {
    eventKeyEnter(event) {
      if (this.inputProperties.required && !this.isRequiredOff)
        if (!this.fieldValue) return;
      let sendOption = {
        key: event.key,
        value: this.fieldValue,
      }
      this.isEmit = true;
      this.emitKeyEnter(sendOption);
    },
    eventKeyTab(event) {
      if (this.inputProperties.required && !this.isRequiredOff)
        if (!this.fieldValue) return;
      let sendOption = {
        key: event.key,
        shift: event.shiftKey,
        value: this.fieldValue,
      }
      this.isEmit = true;
      this.emitKeyTab(sendOption);
    },
    eventKey(event) {
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
    eventInputValue() {
      this.emitInputValue();
    },
  },
}
</script>

<style lang="scss" scoped>
@import './ElField.scss';
</style>