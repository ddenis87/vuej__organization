<template>
  <v-autocomplete class="el-field-choice"
                  
                  return-object
                  
                  no-data-text="Значение отсутствует"
                  solo flat background-color="rgba(242, 242, 242, 0)"
                  :dense="isDense"
                  :single-line="isSingleLine"
                  :hide-details="isShowValidation"
                  :rules="(fieldRequired) ? [rules.required] : []"
                  :label="fieldLabel"
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
</template>

<script>
import { ElStaticField } from './ElStaticField.js';
export default {
  name: 'ElStaticFieldChoiceCompare',
  mixins: [
    ElStaticField,
  ],
  data() {
    return {
      isInputFirstEnter: false,
      isElementChange: false,
      inputProperties: {
        label: '',
        required: false,
        choices: [
          {value: '1', display_name: 'Равно'},
          {value: '2', display_name: 'Не равно'},
          {value: '3', display_name: 'Больше'},
          {value: '4', display_name: 'Меньше'},
          {value: '5', display_name: 'В списке'},
          {value: '6', display_name: 'Содержит'},
        ],
      }
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
.v-input {
  text-align: center;
  font-size: 14px;
  .v-input__control {
    padding: 0px;
  }
}
.v-text-field {
  margin-bottom: -26px;
   input {
    padding: 0px;
  }
}
::v-deep {
  .v-input__append-inner {
    cursor: pointer;
  }
  .v-input__append-outer {
    margin-top: -0px;
  }
}
</style>