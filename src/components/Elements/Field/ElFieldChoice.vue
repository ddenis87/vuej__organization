<template>
  <!-- @click.stop -- no slide list -->
  <div class="el-field" :class="{'el-field_single-line': isSingleLine, 'el-field_hide-message': isHideMessage}">
    <v-autocomplete class="el-field__item"
                    dense
                    return-object
                    no-data-text="Значение отсутствует"
                    tabindex="1"
                    :single-line="isSingleLine"
                    :hide-details="isHideMessage"
                    :disabled="isDisabled"
                    :label="fieldLabel"
                    :items="fieldItems"
                    :item-text="'display_name'"
                    :item-value="'value'"
                    :rules="(fieldRequired) ? [rules.required] : []"
                    v-model="fieldValue"
                    @click.stop
                    @input="eventInputValue"
                    @change="eventChangeValue"
                    
                    @keydown.enter="eventKeyEnter"
                    @keydown.tab="eventKeyTab"
                    @keydown.esc="eventKeyEsc"
                    @keydown.stop
                    @update:list-index="eventUpdateList"
                    @blur="eventBlurField">
      <template v-slot:append-outer v-if="isBtnClear">
        <el-btn-icon-small tabindex="2" icon="mdi-close" no-tooltip @click="eventClearValue"></el-btn-icon-small>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import { ElField } from './ElField.js';
export default {
  name: 'ElFiledChoice',
  mixins: [
    ElField,
  ],
  data() {
    return {
      // isEmit: false,
      isChangeValue: false,
    }
  },
  computed: {
    fieldItems() { return this.inputProperties.choices; },
  },
  mounted() {
    let fieldInput = document.querySelector(`.content-editing .v-select__slot input`);
    if (!fieldInput) return;
    setTimeout(() => {
      fieldInput.focus();
    }, 10);
  },
  methods: {
    eventUpdateList() {
      // console.log('update');
    },
    eventInputValue(event) {
    //   console.log(event);
    },
    eventChangeValue(event) {
      this.isChangeValue = true;
      this.emitInputValue();
    },
    eventKeyEnter(event) {
      if (this.inputProperties.required && !this.isRequiredOff)
        if (!this.fieldValue) return;
      if (this.isChangeValue) {
        let sendOption = {
          key: event.key,
          value: this.fieldValue,
        }
        this.isEmit = true;
        this.emitKeyEnter(sendOption);
      }
    },
    eventKeyTab(event) {
      let sendOption = {
        key: event.key,
        shift: event.shiftKey,
        value: this.fieldValue,
      }
      this.isEmit = true;
      this.emitKeyTab(sendOption);
    }
  },
}
</script>

<style lang="scss" scoped>
@import './ElField.scss';
</style>