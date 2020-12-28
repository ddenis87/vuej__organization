<template>
  <div class="dialog" :id="`ElBox-${fieldId}`">
    <!-- @click.stop - stop slider list -->
    <!-- @click:append-outer - open dialog -->
    <!-- @focus - for selected inner text -->
    <v-autocomplete :id="fieldId"
                    class="el-field-dialog"
                    dense
                    single-line
                    append-icon="mdi-dots-horizontal"
                    hide-selected
                    no-data-text="Значение отсутствует"
                    v-model="fieldValue" 
                    :label="fieldLabel"
                    :hide-details="fieldShowValidation"
                    :items="fieldList"
                    @blur="eventBlur"
                    @change="eventChange"
                    @keydown.stop="eventKeyDown"
                    @click:append="eventDialogOpen"
                    @click.stop=""></v-autocomplete>
    <v-dialog v-model="isShowDialog" max-width="80%" scrollable class="dialog__box" :id="`ElDialog-${fieldId}`" @click:outside.stop.prevent="">
      <v-card max-height="700">
        <v-system-bar color="rgba(64, 64, 64, 1)" height="40">
          <span class="dialog__title">{{ displayNameTable }}</span>
          <v-spacer></v-spacer>
          <v-btn class="system__btn" depressed color="rgba(64, 64, 64, 1)" tile fab icon small @click="eventDialogClose"><v-icon class="system__btn_ico" small color="white">mdi-close</v-icon></v-btn>
        </v-system-bar>
        <div class="dialog__table" :id="`ElTable-${fieldId}`">
          <component :is="componentForDialog" v-bind:editable="false" @event-row-selected="eventDialogSelected"></component>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ElFieldDialog',
  props: {
    properties: Object,
    label: {type: Boolean, default: false}, // hidden or show label
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
      fieldLabel: this.label ? this.properties.label : '',
      fieldValue: null, //this.properties.text,
      fieldRequired: this.properties.required,
      fieldRules: {
        required: value => !!value || 'мин. 1 символ',
      }
    }
  },
  computed: {
    fieldList() {
      let fieldList = [];
      let fieldListStore = this.$store.getters[`DataTable/GET_LIST_DATA`]('budget-classifications');   /// ?????? необходимо получать имя таблицы из API
      if (fieldListStore.length == 0) {
        this.$store.dispatch(`DataTable/GET_LIST_OPTION`, {tableName: 'budget-classifications'});  /// ?????? необходимо получать имя таблицы из API
      } else {
        this.fieldValue = this.properties.text.id.toString();
        setTimeout(() => document.querySelector(`#${this.fieldId}`).select(), 10)
      }
      fieldListStore.forEach(element => {
        fieldList.push({text: element[this.properties.objectValue], value: `${element.id}`});
      });
      return fieldList;
    },
    fieldShowValidation() { return (this.showValidation) ? false : true },
    displayNameTable() {
      return this.$store.getters[`DataTable/GET_DESCRIPTION_TABLE`]('budget-classifications');  /// ?????? необходимо получать по API
    },
    componentForDialog() {
      return () => import('@/views/Table/TableBudgetClassifications'); /// ?????? необходимо получать по API
    }
  },
  mounted() {
    // console.log(this.properties);
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
      console.log(option);
      // this.fieldValue = option.id.toString();
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
        let newFieldValue = this.$store.getters['DataTable/GET_LIST_DATA_ROW']('budget-classifications', this.fieldValue.toString());
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