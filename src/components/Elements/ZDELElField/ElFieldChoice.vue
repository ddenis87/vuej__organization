<template>
  <div class="el-field">
    <v-autocomplete class="el-field__item"
                    auto-select-first
                    return-object
                    hide-selected
                    no-data-text="Значение отсутствует"
                    :dense="isDense"
                    :single-line="isSingleLine"
                    :hide-details="isShowValidation"
                    :rules="(fieldRequired) ? [rules.required] : []"
                    :label="fieldLabel"
                    :disabled="isDisabled"
                    :items="fieldList"
                    :item-text="'display_name'"
                    :item-value="'value'"
                    v-model="fieldValue"
                    @input="emitInputValue"
                    @change="changeValue"
                    @keydown.stop.esc="keydownEsc"
                    @keydown.stop.prevent.enter.tab="keydownEnterTab"
                    @keydown.stop
                    @blur="blurComponent">
      <template v-slot:append-outer v-if="isBtnClear">
        <v-btn icon small :disabled="isFieldValue" @click="clearValue"><v-icon small>mdi-close</v-icon></v-btn>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import { ElField } from './ElField.js';
export default {
  name: 'ElFieldChoice',
  mixins: [
    ElField,
  ],
  data() {
    return {
      isInputFirstEnter: false,
      isElementChange: false,
    }
  },
  computed: {
    fieldList() { if ('choices' in this.inputProperties) return this.inputProperties.choices; return []; },
  },
  mounted() {
    setTimeout(() => {
      let fieldInput = document.querySelector(`.content-editing .v-select__slot input`);
      if (this.isValueSelected)
        fieldInput.select();
      if (this.isValueFocus)
        fieldInput.focus();
    }, 10);
  },
  methods: {
    keydownEnterTab(event) {
      if (event.key == 'Enter')
        if (!this.isInputFirstEnter || !this.isElementChange) { this.isInputFirstEnter = true; return; }
        this.isEmit = true;
        let sendOption = {
          key: event.key,
          shift: event.shiftKey,
          value: this.fieldValue,
        }
        this.emitAccepted(sendOption);
    },
    changeValue(value) {
      this.isInputFirstEnter = true;
      this.isElementChange= true;
    },
  }
}
</script>

<style lang="scss" scoped>
@import './ElField.scss';
</style>