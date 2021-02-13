<template>
  <div class="el-field el-field-string" :class="{'el-field_single-line': isSingleLine, 'el-field_hide-message': isHideMessage}">
    <v-text-field class="el-field__item"
                  dense
                  tabindex="1"
                  :single-line="isSingleLine"
                  :hide-details="isHideMessage"
                  :disabled="isDisabled"
                  :label="fieldLabel"
                  v-model="fieldValue"
                  clear-icon="mdi-close"
                  prepend-icon="mdi-magnify"
                  @click:clear="eventClearValue"
                  @input="eventInputValue"
                  @keydown.stop.esc="eventKeyEsc"
                  @keydown.stop.prevent.enter="eventKeyEnter"
                  @keydown.stop
                  @blur="eventBlurField">
      <template v-slot:append>
        <v-btn class="el-field-string__append" icon small @click="eventKeyEnter"><v-icon >mdi-arrow-right</v-icon></v-btn>
      </template>
    </v-text-field>
  </div>
</template>

<script>
import { ElField } from './ElField.js';
export default {
  name: 'ElFieldSearch',
  mixins: [
    ElField,
  ],
  methods: {
    eventInputValue() {
      this.emitInputValue();
    },
    eventKeyEnter(event) {},

  },
}
</script>

<style lang="scss" scoped>
@import './ElField.scss';
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