<template>
  <div class="table-form">
    <v-card-text>
      <v-form ref="formAction">
        <v-container fluid>
          <v-row>
            <v-col cols="12"><el-field-string :single-line="false" :label="true" is-use="form"
                                              :properties="fieldForm.title" 
                                              v-model="fieldFormValue.title"></el-field-string></v-col>
          </v-row>
          <v-row>
            <v-col cols="4"><el-field-number :single-line="false" :label="true" is-use="form"
                                             :properties="fieldForm.institution_code" 
                                             v-model="fieldFormValue.institution_code"></el-field-number></v-col>

            <v-col cols="4"><el-field-string :single-line="false" :label="true" is-use="form"
                                             :properties="fieldForm.inn" 
                                             v-model="fieldFormValue.inn"></el-field-string></v-col>

            <v-col cols="4"><el-field-string :single-line="false" :label="true" is-use="form"
                                             :properties="fieldForm.kpp" 
                                             v-model="fieldFormValue.kpp"></el-field-string></v-col>
          </v-row>
          <v-row >
            <!-- <v-col cols="4"><el-field-choice :single-line="false" :label="true" is-use="form"
                                             :properties="fieldForm.organization_type" 
                                             v-model="fieldFormValue.organization_type"></el-field-choice></v-col> -->

            <v-col cols="5"><el-field-choice :single-line="false" :label="true" is-use="form"
                                             :properties="fieldForm.rubpnubp_status" 
                                             v-model="fieldFormValue.rubpnubp_status"></el-field-choice></v-col>

            <v-col cols="7"><el-field-choice :single-line="false" :label="true" is-use="form"
                                             :properties="fieldForm.egrul_status" 
                                             v-model="fieldFormValue.egrul_status"></el-field-choice></v-col>
          </v-row>
          <v-row>
            <v-col cols="4"><el-field-choice :single-line="false" :label="true" is-use="form"
                                             :properties="fieldForm.institution_type" 
                                             v-model="fieldFormValue.institution_type"></el-field-choice></v-col>

            <v-col cols="4"><el-field-choice :single-line="false" :label="true" is-use="form"
                                             :properties="fieldForm.industry_typing" 
                                             v-model="fieldFormValue.industry_typing"></el-field-choice></v-col>

            <v-col cols="4"><el-field-choice :single-line="false" :label="true" is-use="form"
                                             :properties="fieldForm.budget_level" 
                                             v-model="fieldFormValue.budget_level"></el-field-choice></v-col>
          </v-row>
          <v-row>
            <v-col cols="12"><el-field-dialog :single-line="false" :label="true" 
                                              :properties="fieldForm.bk"
                                              v-model="fieldFormValue.bk"></el-field-dialog></v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn height="30" class="table-form__btn-accept" color="blue darken-1" small depressed @click="eventClickActionCancel">Отменить</v-btn>
      <v-btn height="30" class="table-form__btn-accept" color="blue darken-1" small depressed @click="eventClickActionAccept">Записать</v-btn>
    </v-card-actions>
  </div>

</template>

<script>
import { TableForm } from './TableForm.js';

export default {
  name: 'TableFormOrganisations',
  mixins: [
    TableForm,
  ],
  data() {
    return {
      tableName: 'organization',
      fieldFormValue: {
        title: '',
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

<style lang="scss" scoped>
.table-form {
  &__btn-accept {
    color: white;
  }
}
::v-deep {
  .container {
    padding: 0px ;
  }
}
</style>