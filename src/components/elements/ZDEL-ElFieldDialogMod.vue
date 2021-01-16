<template>
  <div class="dialog" :id="`ElBox-${fieldId}`">
    <!-- @click.stop - stop slider list -->
    <!-- @click:append-outer - open dialog -->
    <!-- @focus - for selected inner text -->
    <v-autocomplete :id="fieldId"
                    class="el-field-dialog"
                    dense
                    append-icon="mdi-dots-horizontal"
                    hide-selected
                    no-data-text="Значение отсутствует"
                    v-model="fieldValue" 
                    :single-line="singleLine"
                    :label="fieldLabel"
                    :hide-details="fieldShowValidation"
                    :items="fieldList"
                    @blur="eventBlur"
                    @change="eventChange"
                    @keydown.stop="eventKeyDown"
                    @click:append="eventDialogOpen"
                    @click.stop="" @input="eventInput"></v-autocomplete>
    <v-dialog fullscreen transition="dialog-bottom-transition" v-model="isShowDialog" max-width="80%" scrollable class="dialog__box" :id="`ElDialog-${fieldId}`" @click:outside.stop.prevent="">
      <v-card max-height="700">
        <v-system-bar color="indigo" height="65">
          <v-btn class="system__btn" depressed color="white" tile fab icon small @click="eventDialogClose"><v-icon class="system__btn_ico" small color="white">mdi-close</v-icon></v-btn>
          <span class="dialog__title">{{ displayNameTable }}</span>
          <v-spacer></v-spacer>
          
        </v-system-bar>
        <div class="dialog__table" :id="`ElTable-${fieldId}`">
          <component :is="componentForm" v-bind:editable="false" @event-row-selected="eventDialogSelected"></component>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ElFieldDialog',
  props: {
    properties: {type: Object, default: () => {
      return {
        value: '',
        label: '',
        text: null,
        required: false,
        choices: null,
      }
    }},
    propertiesValue: null,
    label: {type: Boolean, default: false}, // hidden or show label
    singleLine: {type: Boolean, default: true},
    showValidation: {type: Boolean, default: false}, // hidden or show hint error
    selectedValue: {type: Boolean, defalt: false} // selected value in text field after mounted
  },
  data() {
    return {
      isShowDialog: false,
      isInputEmit: false,
      isCloseInDialog: false,
      isInputFirstEnter: false,
      isElementChange: false,
      fieldId: `El-${this.properties.value}`,
      // fieldLabel: this.label ? this.properties.label : '',
      fieldValue: null, //this.properties.text?.id.toString(),
      fieldRequired: this.properties.required,
      fieldRules: {
        required: value => !!value || 'мин. 1 символ',
      }
    }
  },
  computed: {
    fieldLabel() { return (this.label) ? this.properties.label: '' },

    fieldList() {
      let fieldList = [];
      let fieldListStore = this.$store.getters[`DataTable/GET_LIST_DATA`](this.properties.tableName);
      if (fieldListStore.length == 0) {
        this.$store.dispatch(`DataTable/GET_LIST_OPTION`, {tableName: this.properties.tableName});
      } else {
        if (this.fieldValue == null) this.fieldValue = this.properties.text?.id?.toString();
        this.$emit('input', this.$store.getters[`DataTable/GET_LIST_DATA_ROW`](this.properties.tableName,this.fieldValue));

        setTimeout(() => document.querySelector(`#${this.fieldId}`).select(), 10)
      }
      console.log(fieldListStore);
      fieldListStore.forEach(element => {
        fieldList.push({text: element[this.properties.objectValue], value: `${element.id}`});
      });
      console.log(this.properties);
      return fieldList;
    },
    fieldShowValidation() { return (this.showValidation) ? false : true },
    displayNameTable() {
      return this.$store.getters[`DataTable/GET_DESCRIPTION_TABLE`](this.properties.tableName);
    },
    componentForm() {
      let componentForm = '';
      this.properties.tableName.split('-').forEach(item => {
        componentForm += item[0].toUpperCase() + item.slice(1);
      })
      return () => import(`@/views/Table/Table${componentForm}`);
    }
  },
  watch: {
    propertiesValue() { 
      // console.log('element choice watch'); 
      this.fieldValue = this.properties.text?.id?.toString();
      this.$emit('input', this.$store.getters[`DataTable/GET_LIST_DATA_ROW`](this.properties.tableName,this.fieldValue));
      // console.log(this.fieldValue);
    }
  },
  mounted() {
    // console.log(this.properties);
    setTimeout(() => {
      this.$emit('input', this.$store.getters[`DataTable/GET_LIST_DATA_ROW`](this.properties.tableName,this.fieldValue));
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
      console.log(option);

      this.fieldValue = option.id.toString();
      console.log(this.fieldValue);
      this.$emit('editing-accepted', {
        tableName: this.properties.tableName,
        key: 'Enter',
        keyShift: false,
        value: option,
        field: this.properties.value,
        id: this.properties.idRow
      });
      this.isShowDialog = false;
      this.$emit('input', this.$store.getters[`DataTable/GET_LIST_DATA_ROW`](this.properties.tableName, this.fieldValue));
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
        let newFieldValue = this.$store.getters['DataTable/GET_LIST_DATA_ROW'](this.properties.tableName, this.fieldValue.toString());
        this.isInputEmit = true;
        this.$emit('editing-accepted', {
          tableName: this.properties.tableName,
          key: event.key,
          keyShift: event.shiftKey,
          value: newFieldValue,
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
      console.log('input event');
      // this.$emit('input', this.fieldValue);
    }
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