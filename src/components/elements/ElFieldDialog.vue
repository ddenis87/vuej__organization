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
                    tabindex="10"
                    
                    v-model="fieldValue" 
                    :label="fieldLabel"
                    :hide-details="fieldShowValidation"

                    :items="fieldList"

                    @input="inputInput"

                    @keydown.stop="eventKeyDown" 
                    @blur="eventBlur"

                    @focus="focusEvent"
                    @click:append.stop.prevent="dialogOpen"
                    @click:append-outer.stop.prevent="dialogOpen"
                    @click.stop.prevent=""></v-autocomplete>
    <v-dialog v-model="isShowDialog" max-width="80%" scrollable class="dialog__box" :id="`ElDialog-${fieldId}`" @keydown.stop="dialogClick">
      <v-card max-height="700">
        <v-system-bar color="rgba(64, 64, 64, 1)" height="40">
          <span class="dialog__title">{{ displayNameTable }}</span>
          <v-spacer></v-spacer>
          <v-btn class="system__btn"  color="white" tile icon small @click="dialogClose"><v-icon class="system__btn_ico" small color="white">mdi-close</v-icon></v-btn>
        </v-system-bar>
        <div class="dialog__table" :id="`ElTable-${fieldId}`">
          <component :is="componentForDialog" v-bind:editable="false" @dblclick-row="dialogSelected"></component>
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
      // console.log(fieldList);
      // console.log(this.fieldValue);
      return fieldList;
    },
    fieldShowValidation() { return (this.showValidation) ? false : true },
    displayNameTable() {
      return this.$store.getters[`DataTable/GET_DESCRIPTION_TABLE`]('budget-classifications');  /// ?????? необходимо получать по API
    },
    componentForDialog() {
      return () => import('@/views/Tables/Bk'); /// ?????? необходимо получать по API
    }
  },

  mounted() {
    console.log(this.properties);
    setTimeout(() => {
      if (this.selectedValue) {
        document.querySelector(`#${this.fieldId}`).select();
        // document.querySelector(`#${this.fieldId}`).focus();
      }
    }, 10);
  },
  updated() {
    // document.querySelector(`#${this.fieldId}`).select();
    //     document.querySelector(`#${this.fieldId}`).focus();
  },
  methods: {
    dialogClick(event) {
      console.log('dialog click');
    },
    dialogOpen(event) {
      console.log('dialog open');
      this.isShowDialog = true;
      document.querySelector(`#${this.fieldId}`).select();
      // console.log(event.target.closest('.el-field-dialog').querySelector(`#${this.fieldId}`));
      // event.target.closest('.el-field-dialog').querySelector(`#${this.fieldId}`).focus();
      // document.getElementById(`ElDialog-${this.fieldId}`).focus();
    },
    dialogClose(event) {
      console.log('dialog close');
      // console.log(document.querySelector(`#${this.fieldId}`));
      setTimeout(() => {
        this.isShowDialog = false;
        // document.querySelector(`#${this.fieldId}`).select();
      },10);
      // this.isCloseInDialog = true;
      // setTimeout(() => {
      //   document.getElementById(`ElBox-${this.fieldId}`).querySelector('input').focus();
      // }, 100);
    },
    eventKeyDown() {
      console.log('input choice component');
      // event.target.focus();
      if (event.key == 'Escape') {
        this.isInputEmit = true;
        this.$emit('editing-canceled', {key: 'Escape'});
        return;
      }
      if (event.key == 'Enter')
        if (!this.isInputFirstEnter) { this.isInputFirstEnter = true; return; }

      if (event.key == 'Enter' || event.key == 'Tab') {
        if (this.fieldRequired && this.fieldValue.length == 0) return;
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
      console.log('blur dialog');
      event.preventDefault();
      // console.log(this.isShowDialog);
      // console.log(event);
      // if (this.isCloseInDialog) { console.log('break'); this.isCloseInDialog = false; return }
      // if (!event.target.classList.contains('system__btn_ico')) {
        if (!this.isShowDialog) {
          if (!this.isInputEmit) {
            console.log('blur dialog component');
            this.$emit('editing-canceled');
          }
        }
      // }
    },

    dialogSelected() {},
    inputInput() {},
    inputEvent(event) {},
    blurInput(event) {},
    focusEvent(event) {
      console.log('focus autocomplite');
      // setTimeout(() => { 
      //   event.target.select(); }, 100)
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
::v-deep {
  .v-icon { margin-right: 0px; }
}
</style>