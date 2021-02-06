<template>
  <div class="table-form">
    <v-card flat>
      <v-form ref="formAction">
        <v-container fluid>
          <v-row>
            <v-col cols="2"><el-field-date :is-single-line="false"
                                           :is-label="true"
                                           :is-btn-clear="true"
                                           :input-properties="fieldForm.registry_date" 
                                           v-model="fieldFormValue.registry_date"></el-field-date></v-col>
            <v-col cols="10"><el-field-string :is-single-line="false"
                                              :is-label="true"
                                              :input-properties="fieldForm.title"
                                              v-model="fieldFormValue.title"></el-field-string></v-col>
          </v-row>
          <v-row>
            <v-col cols="4"><el-field-number :is-single-line="false" :is-label="true" is-use="form"
                                             :inputProperties="fieldForm.institution_code" 
                                             v-model="fieldFormValue.institution_code"></el-field-number></v-col>

            <v-col cols="4"><el-field-string :is-single-line="false" :is-label="true" is-use="form"
                                             :inputProperties="fieldForm.inn" 
                                             v-model="fieldFormValue.inn"></el-field-string></v-col>

            <v-col cols="4"><el-field-string :is-single-line="false" :is-label="true" is-use="form"
                                             :inputProperties="fieldForm.kpp" 
                                             v-model="fieldFormValue.kpp"></el-field-string></v-col>
          </v-row>
          <v-row >
            <v-col cols="5"><el-field-choice :is-single-line="false" :is-label="true" is-use="form"
                                             :inputProperties="fieldForm.rubpnubp_status" 
                                             v-model="fieldFormValue.rubpnubp_status"></el-field-choice></v-col>

            <v-col cols="7"><el-field-choice :is-single-line="false" :is-label="true" is-use="form"
                                             :inputProperties="fieldForm.egrul_status" 
                                             v-model="fieldFormValue.egrul_status"></el-field-choice></v-col>
          </v-row>
          <v-row>
            <v-col cols="4"><el-field-choice :is-single-line="false" :is-label="true" is-use="form"
                                             :inputProperties="fieldForm.institution_type" 
                                             v-model="fieldFormValue.institution_type"></el-field-choice></v-col>

            <v-col cols="4"><el-field-choice :is-single-line="false" :is-label="true" is-use="form"
                                             :inputProperties="fieldForm.industry_typing" 
                                             v-model="fieldFormValue.industry_typing"></el-field-choice></v-col>

            <v-col cols="4"><el-field-choice :is-single-line="false" :is-label="true" is-use="form"
                                             :inputProperties="fieldForm.budget_level" 
                                             v-model="fieldFormValue.budget_level"></el-field-choice></v-col>
          </v-row>
          <v-row>
            <v-col cols="12"><el-field-dialog :is-single-line="false" :is-label="true" 
                                              :inputProperties="assingObject(fieldForm.bk, {related_model_view: '{head_code} - {head_name}'})"
                                              v-model="fieldFormValue.bk"></el-field-dialog></v-col>
          </v-row>
        </v-container>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <el-button @click="eventClickActionCancel">Отменить</el-button>
        <el-button @click="eventClickActionAccept">Записать</el-button>
      </v-card-actions>
    </v-card>
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
    }
  },
  methods: {
    fieldFormValueClear() {
      this.fieldFormValue = {
        title: '',
        registry_date: '',
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