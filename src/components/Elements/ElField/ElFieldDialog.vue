<template>
  <!-- @click.stop - stop slider list -->
  <div class="el-field el-field-dialog" :class="{'el-field_single-line': isSingleLine, 'el-field_hide-message': isHideMessage}">
    <v-autocomplete class="el-field__item"
                    dense
                    return-object
                    no-data-text="Значение отсутствует"
                    append-icon="mdi-dots-horizontal"
                    tabindex="1"
                    :single-line="isSingleLine"
                    :hide-details="isHideMessage"
                    :disabled="isDisabled"
                    :label="fieldLabel"
                    :items="fieldList"
                    :item-text="fieldListText"
                    :item-value="'id'"
                    :rules="(fieldRequired) ? [rules.required] : []"
                    v-model="fieldValue"
                    @click.stop
                    @click:append="eventOpenDialog"
                    @input="eventInputValue"
                    @change="eventChangeValue"
                    @keydown.enter="eventKeyEnter"
                    @keydown.tab="eventKeyTab"
                    @keydown.esc="eventKeyEsc"
                    @keydown.stop="eventKeydown"
                    @focus="eventFocusField"
                    @blur="eventBlurField">
      <!-- <template v-slot:append>
        <el-btn-icon-small tabindex="2" icon="mdi-dots-horizontal" no-tooltip @click="eventOpenDialog"></el-btn-icon-small>
      </template> -->
      <template v-slot:append-outer v-if="isBtnClear">
        <el-btn-icon-small tabindex="2" icon="mdi-close" no-tooltip @click="eventClearValue"></el-btn-icon-small>
      </template>
    </v-autocomplete>
    <dialog-full-page :is-dialog-name="dialogName" 
                      :is-dialog-show="isDialogShow" 
                      @close-dialog="eventCloseDialog">
      <component :is="componentForm" :isEditable="false" @row-selected="eventSelectedRowDialog"></component>
    </dialog-full-page>
  </div>
</template>

<script>
import { ElField } from './ElField.js';
import DialogFullPage from '@/components/Dialogs/DialogFullPage.vue';
export default {
  name: 'ElFieldDialog',
  components: {
    DialogFullPage,
  },
  mixins: [
    ElField,
  ],
  data() {
    return {
      isDialogShow: false,
      isChangeValue: false,
      fieldElementDOM: null,
    }
  },
  computed: {
    fieldListText() { 
      return (this.$store.getters['DataTable/GET_RELATED_MODEL_VIEW'](this.inputProperties['related_model_name']) != '{id}') ? 'text' : 'id'; },
    fieldList() {
      let relatedModelView = this.$store.getters['DataTable/GET_RELATED_MODEL_VIEW'](this.inputProperties['related_model_name']);
      let fieldList = [];
      let fieldListStore = this.$store.getters[`DataTable/GET_DATA`](this.inputProperties['related_model_name']);
      if (fieldListStore.length == 0) { this.$store.dispatch(`DataTable/REQUEST_OPTIONS`, { tableName: this.inputProperties['related_model_name'] }); return []; }
      if (relatedModelView != '{id}') {
        let templateValue = relatedModelView.match(/[{\w}]/gi).join(',').replace(/,/g, '').slice(1, -1).split('}{');
        fieldListStore.forEach(element => {
          let newValue = '';
          newValue = relatedModelView;
          templateValue.forEach(item => {
            newValue = newValue.replace(`{${item}}`, element[item]);
          });
          fieldList.push(Object.assign(element, {text: newValue}));
        });
        return fieldList;
      }
      return fieldListStore;
    },
    dialogName() { return this.$store.getters[`DataTable/GET_DESCRIPTION`](this.inputProperties['related_model_name']); },
    componentForm() {
      if (!this.inputProperties['related_model_name']) return null;
      let componentForm = '';
      componentForm = this.inputProperties['related_model_name'][0].toUpperCase() + this.inputProperties['related_model_name'].slice(1);
      return () => import(`@/components/TheTable/TheTable${componentForm}`);
    }
  },
  watch: {
    // inputValue() { this.fieldValue = (typeof(this.inputValue == 'object') && this.inputValue != null) ? this.inputValue.id : this.inputValue; }, 
  },
  mounted() {
    let fieldInput = document.querySelector(`.content-editing .v-select__slot input`);
    if (!fieldInput) return;
    if (this.isSelected) {
      setTimeout(() => {
        fieldInput.select();
        fieldInput.focus();
      }, 10);
    }
  },
  methods: {
    eventOpenDialog(event) {
      console.log(event);
      this.fieldElementDOM = event.target.closest('.el-field').querySelector('.v-select__slot input');
      console.log(this.fieldElementDOM);
      this.isDialogShow = true;
    },
    eventSelectedRowDialog(option) {
      this.fieldValue = option;
      this.isChangeValue = true;
      this.isDialogShow = false;
      this.emitInputValue();
      setTimeout(() => {
        this.fieldElementDOM.focus();
        this.fieldElementDOM.select();
      }, 10);
    },
    eventInputValue(event) {
      console.log('input');
    },
    eventChangeValue(event) {
      console.log('change');
      this.isChangeValue = true;
      this.emitInputValue();
    },
    eventKeydown(event) {
      if (event.key == 'Delete' || event.key == 'Backspace') {
        this.fieldValue = null;
        this.emitInputValue();
      }
      this.emitKeydown(event);
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
    eventCloseDialog() {},

    eventBlurField() {
      if (!this.isDialogShow  && !this.isEmit) {
        this.emitBlurField();
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import './ElField.scss';
.el-field-dialog {
  z-index: 9999;
}
</style>