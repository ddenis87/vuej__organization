<template>
  <div class="dialog" :id="`ElBox-${fieldId}`">
    <!-- @click.stop - stop slider list -->
    <!-- @click:append-outer - open dialog -->
    <!-- @focus - for selected inner text -->
    <v-autocomplete :id="fieldId"
                    class="el-field-dialog"
                    dense
                    return-object
                    append-icon="mdi-dots-horizontal"
                    hide-selected
                    no-data-text="Значение отсутствует"
                    v-model="fieldValue" 
                    :single-line="singleLine"
                    :label="fieldLabel"
                    :hide-details="fieldShowValidation"
                    :rules="(fieldRequired && required) ? [fieldRules.required] : []"
                    :items="fieldList"
                    :item-text="fieldListText"
                    item-value="id"
                    @blur="eventBlur"
                    @change="eventChange"
                    @keydown.stop="eventKeyDown"
                    @click:append="eventDialogOpen"
                    @click.stop="" @input="eventInput">
      <template v-slot:append-outer v-if="btClear">
        <v-btn icon small :disabled="isValue" @click="clearValue"><v-icon small>mdi-close</v-icon></v-btn>
      </template>
    </v-autocomplete>

    <dialog-full-page :is-dialog-name="displayNameTable" 
                      :is-dialog-show="isShowDialog" 
                      @event-close-dialog="eventDialogClose">
        <component :is="componentForm" v-bind:editable="false" @event-row-selected="eventDialogSelected"></component>
    </dialog-full-page>
  </div>
</template>

<script>
import DialogFullPage from '@/components/Dialogs/DialogFullPage.vue';

export default {
  name: 'ElFieldDialog',
  components: {
    DialogFullPage,
  },
  model: {
    prop: 'propertiesValue',
    event: 'input'
  },
  props: {
    properties: '',
    propertiesValue: '',
    label: {type: Boolean, default: false}, // hidden or show label
    singleLine: {type: Boolean, default: true},
    showValidation: {type: Boolean, default: false}, // hidden or show hint error
    selectedValue: {type: Boolean, defalt: false}, // selected value in text field after mounted
    btClear: {type: Boolean, default: false},
    required: { type: Boolean, default: true },
  },
  data() {
    return {
      isShowDialog: false,
      isInputEmit: false,
      isCloseInDialog: false,
      isInputFirstEnter: false,
      isElementChange: false,
      fieldId: `El-${this.properties?.value}`,
      fieldValue: this.propertiesValue?.id,
      fieldRequired: this.properties?.required,
      fieldRules: {
        required: value => !!value || 'не выбран',
      }
    }
  },
  computed: {
    isValue() { console.log(this.fieldValue); return (this.fieldValue == undefined) ? true : false },
    fieldLabel() { return (this.label) ? this.properties?.label: '' },
    fieldListText() { return (this.properties?.objectValue) ? this.properties.objectValue : ''; },
    fieldList() {
      if (!this.properties?.tableName) return [];
      let fieldList = [];
      let fieldListStore = this.$store.getters[`DataTable/GET_LIST_DATA`](this.properties.tableName);
      if (fieldListStore.length == 0) {
        this.$store.dispatch(`DataTable/GET_LIST_OPTION`, { tableName: this.properties.tableName });
        return [];
      }
      // console.log(this.propertiesValue);
      return fieldListStore;
    },
    fieldShowValidation() { return (this.showValidation) ? false : true },
    displayNameTable() {
      return this.$store.getters[`DataTable/GET_DESCRIPTION_TABLE`](this.properties?.tableName);
    },
    componentForm() {
      let componentForm = '';
      if (!this.properties?.tableName) return undefined;
      this.properties.tableName.split('-').forEach(item => {
        componentForm += item[0].toUpperCase() + item.slice(1);
      })
      return () => import(`@/views/Table/Table${componentForm}`);
    }
  },
  watch: {
    propertiesValue() { 
      this.fieldValue = this.propertiesValue?.id;
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.selectedValue) {
        document.querySelector(`#${this.fieldId}`).select();
        // document.querySelector(`#${this.fieldId}`).focus();
      }
    }, 10);
  },
  methods: {
    eventDialogOpen(event) { ////////
      // console.log('dialog open');
      this.isShowDialog = true;
      setTimeout(() => {
        document.querySelector(`#${this.fieldId}`).focus();
      },10);
    },
    eventDialogClose(event) {
      // console.log('dialog close');
      setTimeout(() => {
        this.isShowDialog = false;
      },100);
    },
    eventDialogSelected(option) {
      this.fieldValue = option.id;
      this.$emit('input', option);

      this.$emit('editing-accepted', {
        tableName: this.properties.tableName,
        key: 'Enter',
        keyShift: false,
        value: option,
        field: this.properties.value,
        id: this.properties.idRow
      });
      this.isShowDialog = false;
    },

    eventKeyDown(event) {
      // console.log('input auto component');
      if (event.key == 'Escape') {
        this.isInputEmit = true;
        this.$emit('editing-canceled', {key: 'Escape'});
        return;
      }
      if (event.key == 'Enter')
        if (!this.isInputFirstEnter || !this.isElementChange) { this.isInputFirstEnter = true; return; }

      if (event.key == 'Enter' || event.key == 'Tab') {
        event.preventDefault();
        if (this.fieldRequired && this.fieldValue.length == 0) { return; }
        console.log(this.fieldValue);
        let newFieldValue = this.$store.getters['DataTable/GET_LIST_DATA_ROW'](this.properties.tableName, this.fieldValue.toString());
        this.isInputEmit = true;
        this.$emit('editing-accepted', {
          tableName: this.properties.tableName,
          key: event.key,
          keyShift: event.shiftKey,
          // value: newFieldValue,
          value: this.fieldValue,
          field: this.properties.value,
          id: this.properties.idRow
        });
      }
    },

    eventBlur(event) {
      // console.log('blur dialog component');
      event.preventDefault();
      if (this.isShowDialog == false) {
        if (this.isInputEmit == false) {
          // console.log('blur dialog component');
          this.$emit('editing-canceled');
        }
      }
    },
    eventChange() { /////////////
      // console.log('change event');
      this.isElementChange = true;
    },
    eventInput() {
      // console.log('input event');
      this.$emit('input', this.fieldValue);
    },
    clearValue() {
      this.fieldValue = undefined;
      this.$emit('clear');
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