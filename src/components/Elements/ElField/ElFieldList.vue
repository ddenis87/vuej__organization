<template>
  <div class="el-field">
    <v-text-field class="el-field__item"
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
      <template v-slot:append>
        <v-btn icon small :plain="false" @click="openDialog"><v-icon small>mdi-playlist-plus</v-icon></v-btn>
      </template>
      <template v-slot:append-outer v-if="isBtnClear">
        <v-btn icon small :disabled="isFieldValue" @click="clearValue"><v-icon small>mdi-close</v-icon></v-btn>
      </template>
    </v-text-field>
    <dialog-full-page-attach is-dialog-name="Список значений"
                             :is-dialog-show="isDialogShow"
                             :is-dialog-attach="attachDialog"
                             @close-dialog="closeDialog">
      <el-field-list-dialog :input-properties="inputProperties"></el-field-list-dialog>
    </dialog-full-page-attach>
  </div>
</template>

<script>
import { ElField } from './ElField.js';
import DialogFullPageAttach from '@/components/Dialogs/DialogFullPageAttach.vue';
import ElFieldListDialog from './ElFieldListDialog.vue';
export default {
  name: 'ElFieldList',
  components: {
    DialogFullPageAttach,
    ElFieldListDialog,
  },
  mixins: [
    ElField,
  ],
  data() {
    return {
      isDialogShow: false,
      attachDialog: null,
    }
  },
  methods: {
    openDialog(event) {
      console.log(event.target.closest('.filter'));
      this.attachDialog = event.target.closest('.filter');
      this.isDialogShow = !this.isDialogShow;
    },
    closeDialog() {
      setTimeout(() => {
        this.isDialogShow = false;
      },100);
    },
  },
}
</script>

<style lang="scss" scoped>
@import './ElField.scss';
</style>