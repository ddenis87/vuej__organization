<template>
  <div class="el-field-switch">
    <v-switch v-model="fieldValue">
      <template v-slot:label>
        <span :style="`color: ${(fieldValue) ? '#1565C0' : ''}`">{{ fieldLabel }}</span>
      </template>
    </v-switch>
  </div>
</template>

<script>
import { ElField } from './ElField.js';

export default {
  name: 'ElFieldSwitch',
  mixins: [
    ElField,
  ],
  computed: {
    labelValue() { return (this.fieldValue) ? 'Установлена' : 'Снята'; },
  },
}
</script>

<style lang="scss" scoped>
.el-field-switch {
  width: 100%;
  font-size: 14px;
}
.v-input--selection-controls {
  margin-top: -3.5px;
}
.v-text-field {
  margin-top: -3.5px;
}
.v-textarea {
  margin-top: 3px;
}
::v-deep {
  .v-input__append-inner {
    margin-top: -2px !important;
    cursor: pointer;
  }
  .v-input__append-outer {
    margin-top: -0px;
  }
}
</style>