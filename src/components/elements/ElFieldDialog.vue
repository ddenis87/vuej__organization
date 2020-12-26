<template>
  <div class="dialog" id="boxEditingComponentDialog">
    <!-- @click.stop - stop slider list -->
    <!-- @click:append-outer - open dialog -->
    <!-- @focus - for selected inner text -->
    <v-autocomplete :id="fieldId"
                    class="el-field-dialog"
                    dense
                    single-line
                    auto-select-first
                    append-icon="mdi-dots-horizontal"
                    hide-selected
                    no-data-text="Значение отсутствует"
                    tabindex="10"
                    
                    return-object
                    v-model="fieldValue" 
                    :label="fieldLabel"
                    :hide-details="fieldShowValidation"

                    :items="fieldList"

                    @input="inputInput"

                    @keydown.stop="eventKeyDown" 
                    @blur.stop="eventBlur"

                    @focus="focusEvent"
                    @click:append.stop.prevent="isShowDialog = true"
                    @click:append-outer.stop.prevent="isShowDialog = true"
                    @click.stop.prevent=""></v-autocomplete>
    <v-dialog v-model="isShowDialog" max-width="80%" scrollable class="dialog__box">
      <v-card max-height="700">
        <v-system-bar color="rgba(64, 64, 64, 1)" height="40">
          <span class="dialog__title">{{ displayNameTable }}</span>
          <v-spacer></v-spacer>
          <v-btn class="system__btn" color="white" tile icon small @click="dialogClose"><v-icon small color="white">mdi-close</v-icon></v-btn>
        </v-system-bar>
        <div class="dialog__table" id="dialog__table">
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
      // isInputFirstEnter: false,
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
        document.querySelector(`#${this.fieldId}`).focus();
      }
    }, 10);
  },
  methods: {
    dialogClose(event) {
      this.isShowDialog = false;
      // setTimeout(() => { document.querySelector(`#${this.fieldId}`).focus(); }, 10);
    },
    eventKeyDown() {
      // console.log('input choice component');
      event.target.focus();
      if (event.key == 'Escape') {
        this.isInputEmit = true;
        this.$emit('editing-canceled', {key: 'Escape'});
        return;
      }
      if (event.key == 'Enter')
        if (!this.isInputFirstEnter) { this.isInputFirstEnter = true; return; }

      if (event.key == 'Enter' || event.key == 'Tab') {
        if (this.fieldRequired && this.fieldValue.length == 0) return;
        let newFieldValue = (this.isInputFirstEnter) ? {
          'display_name': this.fieldValue.text,
          value: this.fieldValue.value
        } : this.properties.text;
        console.log(newFieldValue);
        this.isInputEmit = true;
        // this.$emit('editing-accepted', {
        //   tableName: this.properties.tableName,
        //   key: event.key,
        //   keyShift: event.shiftKey,
        //   value: this.fieldValue,
        //   field: this.properties.value,
        //   id: this.properties.idRow
        // });
      }
    },
    eventBlur(event) {
      console.log(event);
      // if ((event.relatedTarget && event.relatedTarget.classList.contains('table-body__col')) || event.relatedTarget == null) {
      //   if (!this.isInputEmit) {
      //     console.log('blur dialog component');
      //     this.$emit('editing-canceled');
      //   }
      // }
    },

    dialogSelected() {},
    inputInput() {},
    inputEvent(event) {},
    blurInput(event) {},
    focusEvent(event) {},
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