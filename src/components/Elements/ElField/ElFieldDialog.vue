<template>
  <div class="dialog" >
    <!-- @click.stop - stop slider list -->
    <!-- @click:append-outer - open dialog -->
    <!-- @focus - for selected inner text -->
    <v-autocomplete class="el-field-dialog"
                    return-object
                    hide-selected
                    no-data-text="Значение отсутствует"
                    append-icon="mdi-dots-horizontal"

                    :dense="isDense"
                    :single-line="isSingleLine"
                    :hide-details="isShowValidation"
                    :rules="(fieldRequired) ? [rules.required] : []"
                    :label="fieldLabel"
                    :items="fieldList"
                    :item-text="fieldListText"
                    :item-value="'id'"
                    v-model="fieldValue"
                    @input="emitInputValue"
                    @keydown.stop.esc="keydownEsc"
                    @keydown.stop.prevent.enter.tab="keydownEnterTab"
                    @keydown.stop
                    @click.stop.prevent
                    @click:append="openDialog"
                    @blur.prevent="blurComponent">
      <template v-slot:append-outer v-if="isBtnClear">
        <v-btn icon small :disabled="isFieldValue" @click="clearValue"><v-icon small>mdi-close</v-icon></v-btn>
      </template>
    </v-autocomplete>

    <dialog-full-page :is-dialog-name="dialogName" 
                      :is-dialog-show="isDialogShow" 
                      @close-dialog="closeDialog">
        <component :is="componentForm" :isEditable="false" @row-selected="rowSelected"></component>
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
    }
  },
  computed: {
    fieldListText() { return ('related_model_view' in this.inputProperties) ? 'text' : 'id'; },
    fieldList() {
      let fieldList = [];
      let fieldListStore = this.$store.getters[`DataTable/GET_DATA`](this.inputProperties['related_model_name']);
      if (fieldListStore.length == 0) { this.$store.dispatch(`DataTable/REQUEST_OPTIONS`, { tableName: this.inputProperties['related_model_name'] }); return []; }
      if ('related_model_view' in this.inputProperties) {
        let templateValue = this.inputProperties.related_model_view.match(/[{\w}]/gi).join(',').replace(/,/g, '').slice(1, -1).split('}{');
        fieldListStore.forEach(element => {
          let newValue = '';
          newValue = this.inputProperties.related_model_view;
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
    inputValue() { this.fieldValue = (typeof(this.inputValue == 'object') && this.inputValue != null) ? this.inputValue.id : this.inputValue; }, 
  },
  mounted() {
    if (this.isValueSelected) {
      setTimeout(() => {
        document.querySelector(`.content-editing .v-select__slot input`).select();
        document.querySelector(`.content-editing .v-select__slot input`).focus();
      }, 10);
    }
  },
  methods: {
    keydownEnterTab(event) {
      console.log(this.fieldValue);
      if (document.querySelector('.v-menu__content')) document.querySelector('.v-menu__content').remove();
      this.isEmit = true;
      setTimeout(() => {
        let sendOption = {
          key: event.key,
          shift: event.shiftKey,
          value: this.fieldValue,
        }
        this.emitAccepted(sendOption); // mixins
      }, 10); 
    },
    closeDialog() {
      setTimeout(() => {
        this.isDialogShow = false;
      },100);
    },
    rowSelected(option) {
      // console.log(option);
      this.fieldValue = option.id;
      let sendOption = {
        key: 'Enter',
        shift: false,
        value: option,
      }
      this.isEmit = true;
// ----------
      // this.$emit('input-value', option);
      // this.$emit('editing-accepted', sendOption);
// ----------
      this.emitAccepted(sendOption); // mixins
      this.isDialogShow = false;
    },
    openDialog() {
      this.isDialogShow = true;
      if (this.isValueSelected) {
        setTimeout(() => {
          document.querySelector(`.content-editing .v-select__slot input`).select();
          document.querySelector(`.content-editing .v-select__slot input`).focus();
        },10);
      }
    },
    blurComponent(event) {
      if (!this.isDialogShow && !this.isEmit) {
        this.emitCanceled();
      }
    },
  },
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
  margin-top: -3.5px;
   input {
    padding: 0px;
  }
}

.dialog {
  width: 100%;
  background-color: white;
  &__title {
    color: white;
  }
  &__table {
    height: calc(100% - 82px);
    color: white;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      border-radius: 4px;
      &-thumb {
        border-radius: 3px;
        background-color: rgba(0,0,0,0.2);
      }
    }
  }
}
::v-deep {
  .v-icon { margin-right: 0px; }
}
</style>