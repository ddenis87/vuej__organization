<template>
  <div class="table-form">
    <v-form ref="formAction">
      <v-container fluid>
        <v-row dense>
          <v-col cols="3" >
            <el-field-date :input-properties="fieldForm.registry_date" 
                           v-model="fieldFormValue.registry_date"
                           @next-element="eventNextElement"></el-field-date>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="3">
              <el-field-number :inputProperties="fieldForm.institution_code" 
                               v-model="fieldFormValue.institution_code"
                               @next-element="eventNextElement"></el-field-number>
          </v-col>
          <v-col cols="3">
            <el-field-choice :inputProperties="fieldForm.budget_level"
                             v-model="fieldFormValue.budget_level"
                             @next-element="eventNextElement"></el-field-choice>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <el-field-string :input-properties="fieldForm.title"
                             v-model="fieldFormValue.title"
                             @next-element="eventNextElement"></el-field-string>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <el-field-dialog :inputProperties="assingObject(fieldForm.bk, {related_model_view: '{head_code} - {head_name}'})"
                             v-model="fieldFormValue.bk"
                             @next-element="eventNextElement"></el-field-dialog>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <el-button @click="eventClickActionCancel">Отменить</el-button>
        <el-button class="tabspace-end" 
                   @click="eventClickActionAccept"
                   @keydown="eventKeydownAccept">Записать</el-button>
      </v-card-actions>
    </v-form>
  </div>
</template>

<script>
import { TheTableForm } from './TheTableForm.js';
export default {
  name: 'TheTableFormOrganizationGroup',
  mixins: [
    TheTableForm,
  ],
  data() {
    return {
      tableName: 'organization',
      fieldFormValue: {
        is_group: true,
        title: '',
        registry_date: '',
        institution_code: '',
        budget_level: null,
        bk: null,
      },
    }
  },
  methods: {
    fieldFormValueClear() {
      this.fieldFormValue = {
        is_group: true,
        title: '',
        registry_date: null,
        institution_code: '',
        budget_level: null,
        bk: null,
      };
    },
  },
}
</script>