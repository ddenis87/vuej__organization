<template>
  <div class="el-field">
    <v-badge color="blue" class="el-field__badget"
             :content="countSelectValue"
             :value="countSelectValue"
             overlap>
      <v-text-field class="el-field__item" :id="`el-field-list-${inputProperties.key}`"
                    :dense="isDense"
                    :single-line="isSingleLine"
                    :hide-details="isShowValidation"
                    :rules="(fieldRequired) ? [rules.required] : []"
                    :label="fieldLabel"
                    :disabled="isDisabled"
                    :maxLength="fieldMaxLength"
                    
                    v-model="fieldValueText"
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
    </v-badge>
    
    <dialog-full-page-attach is-dialog-name="Список значений"
                             :is-dialog-show="isDialogShow"
                             :is-dialog-attach="attachDialog"
                             @close-dialog="closeDialog">
      <el-field-list-dialog :input-properties="inputProperties"
                            @accept-list="acceptList"></el-field-list-dialog>
    </dialog-full-page-attach>
  </div>
</template>

<script>
import { ElField } from '../ElField.js';
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
      fieldValueText: null,
      countSelectValue: 0,
    }
  },
  // computed: {
  //   countSelectValue() {

  //   }
  // },
  methods: {
    acceptList(tableValue) {
      // console.log(this.inputProperties);
      this.isDialogShow = false;
      this.fieldValueText = this.buildingStringDisplay(tableValue);
      let elementField = document.getElementById(`el-field-list-${this.inputProperties.key}`);
      setTimeout(() => elementField.blur(), 10) ;
      this.$emit('input-value', this.buildingStringEmit(tableValue));
    },
    openDialog(event) {
      // console.log(event.target.closest('.filter'));
      this.attachDialog = event.target.closest('.filter');
      this.isDialogShow = !this.isDialogShow;
    },
    closeDialog() {
      setTimeout(() => {
        this.isDialogShow = false;
      },100);
    },
    buildingStringDisplay(valueArray) {
      // console.log(valueArray);
      if (!valueArray.length) return;
      let newString = '';
      if (this.inputProperties.type == 'field') {
        let relatedModelView = this.$store.getters['DataTable/GET_RELATED_MODEL_VIEW'](this.inputProperties['related_model_name']);
        if (relatedModelView != '{id}') {
          let templateValue = relatedModelView.match(/[{\w}]/gi).join(',').replace(/,/g, '').slice(1, -1).split('}{');
          valueArray.forEach(element => {
            let newValue = '';
            newValue = relatedModelView;
            templateValue.forEach(item => {
              newValue = newValue.replace(`{${item}}`, element[item]);
            });
            newString += `${newValue}; `;
          });
          return newString;
        } 
      } else if (this.inputProperties.type == 'choice') {
          // console.log(valueArray);
          valueArray.forEach(element => {
            newString += `${element['display_name']}; `;
          });
          // console.log(newString);
          return newString;
      }
    },
    buildingStringEmit(valueArray) {
      this.countSelectValue = valueArray.length;
      if (!valueArray.length) return;
      let newString = '';
      if (this.inputProperties.type == 'field') {
        valueArray.forEach(element => {
          newString += `${element.id}, `
        });
      } else if (this.inputProperties.type == 'choice') {
        valueArray.forEach(element => {
          newString += `${element.value}, `
        });
      }
      return newString.slice(0, -2);
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../ElField.scss';
.el-field {
  &__badget {
    width: 100%;
  }
}
::v-deep {
  .v-badge__badge {
    margin-bottom: 12px;
    margin-left: 2px;
  }
}
</style>