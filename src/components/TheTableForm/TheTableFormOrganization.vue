<template>
  <div class="table-form">
    <v-form ref="formAction" @keydown="eventKeydown">
      <v-container fluid>
        <v-row dense>
          <v-col cols="3">
            <el-field-date :input-properties="fieldForm.registry_date" 
                           v-model="fieldFormValue.registry_date" @next-element="eventNextElement"></el-field-date>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="2">
            <el-field-choice :inputProperties="fieldForm.organization_type" 
                             v-model="fieldFormValue.organization_type" @next-element="eventNextElement"></el-field-choice>
          </v-col>
          <v-col cols="2">
            <el-field-choice :inputProperties="fieldForm.institution_type" 
                             v-model="fieldFormValue.institution_type" @next-element="eventNextElement"></el-field-choice>
          </v-col>
          <v-col cols="2">
            <el-field-number :inputProperties="fieldForm.institution_code" 
                             v-model="fieldFormValue.institution_code" @next-element="eventNextElement"></el-field-number>
          </v-col>
          <v-col cols="2">
            <el-field-choice :inputProperties="fieldForm.industry_typing" 
                             v-model="fieldFormValue.industry_typing" @next-element="eventNextElement"></el-field-choice>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="10">
            <el-field-string :input-properties="fieldForm.title"
                             v-model="fieldFormValue.title" @next-element="eventNextElement"></el-field-string>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="2">
            <el-field-string :inputProperties="fieldForm.inn" 
                             v-model="fieldFormValue.inn" @next-element="eventNextElement"></el-field-string>
          </v-col>
          <v-col cols="2">
            <el-field-string :inputProperties="fieldForm.kpp" 
                             v-model="fieldFormValue.kpp" @next-element="eventNextElement"></el-field-string>
          </v-col>
          <v-col cols="2">
            <el-field-choice :inputProperties="fieldForm.budget_level" 
                             v-model="fieldFormValue.budget_level" @next-element="eventNextElement"></el-field-choice>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="8">
            <el-field-choice :inputProperties="fieldForm.egrul_status" 
                             v-model="fieldFormValue.egrul_status" @next-element="eventNextElement"></el-field-choice>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">
            <el-field-choice :inputProperties="fieldForm.rubpnubp_status" 
                             v-model="fieldFormValue.rubpnubp_status" @next-element="eventNextElement"></el-field-choice>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="8">
            <el-field-dialog :inputProperties="assingObject(fieldForm.bk, {related_model_view: '{head_code} - {head_name}'})"
                             v-model="fieldFormValue.bk" @next-element="eventNextElement"></el-field-dialog>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <el-button @click="eventClickActionCancel">Отменить</el-button>
        <el-button class="tabspace-end" @click="eventClickActionAccept" @keydown="eventKeydownAccept">Записать</el-button>
      </v-card-actions>
    </v-form>
  </div>
</template>

<script>
import { TheTableForm } from './TheTableForm.js';

export default {
  name: 'TableFormOrganization',
  mixins: [
    TheTableForm,
  ],
  data() {
    return {
      tableName: 'organization',
      fieldFormValue: {
        title: '',
        registry_date: '',
        last_visited: '',
        institution_code: '',
        inn: '',
        kpp: '',
        organization_type: null,
        rubpnubp_status: null,
        egrul_status: null,
        institution_type: null,
        industry_typing: null,
        budget_level: null,
        bk: null,
      },
      fieldArray: null,
    }
  },
  mounted() {
    this.fieldArray = Array.from(document.querySelectorAll('.table-form .el-field__item input[tabindex="1"]'));
    console.log(this.fieldArray);
  },
  methods: {
    eventKeydown(event) {
      console.log(event);
    },
    eventNextElement(event) {
      let target = event.event.target;
      let eventClick = new Event('click');
      target.closest('.el-field').dispatchEvent(eventClick);
      let currentFieldIndex = this.fieldArray.indexOf(target);
      console.log(currentFieldIndex);
      if (currentFieldIndex + 1 == this.fieldArray.length) {
        target.closest('.table-form').querySelector('.tabspace-end button').focus();
        return;
      }
      setTimeout(() => {
        document.querySelectorAll('.table-form .el-field__item input[tabindex="1"]')[currentFieldIndex + 1].focus();
      }, 100);
    },
    eventKeydownAccept(event) {
      switch(event.key) {
        case 'Enter': {this.eventClickActionAccept(); break;}
        case 'Tab': {
          event.target.closest('.table-form').querySelectorAll('.el-field__item input[tabindex="1"]')[0].focus(); 
          break;
        }
      }
    },
    fieldFormValueClear() {
      this.fieldFormValue = {
        title: '',
        registry_date: '',
        last_visited: '',
        institution_code: '',
        inn: '',
        kpp: '',
        organization_type: null,
        rubpnubp_status: null,
        egrul_status: null,
        institution_type: null,
        industry_typing: null,
        budget_level: null,
        bk: null,
      };
    },
  },
}
</script>