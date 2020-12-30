<template>
  <div class="table-form">
    <v-card-text>
      <v-form ref="formAction">
        <v-container>
          <v-row>
            <v-col cols="12"><el-field-string :single-line="false" :label="true" 
                                              :properties="fieldForm.title" 
                                              v-model="fieldFormValue.title"></el-field-string></v-col>
          </v-row>
          <v-row>
            <v-col cols="4"><el-field-number :single-line="false" :label="true" 
                                             :properties="fieldForm.institution_code" 
                                             v-model="fieldFormValue.institution_code"></el-field-number></v-col>

            <v-col cols="4"><el-field-string :single-line="false" :label="true" 
                                             :properties="fieldForm.inn" 
                                             v-model="fieldFormValue.inn"></el-field-string></v-col>

            <v-col cols="4"><el-field-string :single-line="false" :label="true" 
                                             :properties="fieldForm.kpp" 
                                             v-model="fieldFormValue.kpp"></el-field-string></v-col>
          </v-row>
          <v-row >
            <v-col cols="4"><el-field-choice :single-line="false" :label="true" 
                                             :properties="fieldForm.organisation_type" 
                                             v-model="fieldFormValue.organisation_type"></el-field-choice></v-col>

            <v-col cols="4"><el-field-choice :single-line="false" :label="true" 
                                             :properties="fieldForm.rubpnubp_status" 
                                             v-model="fieldFormValue.rubpnubp_status"></el-field-choice></v-col>

            <v-col cols="4"><el-field-choice :single-line="false" :label="true" 
                                             :properties="fieldForm.egrul_status" 
                                             v-model="fieldFormValue.egrul_status"></el-field-choice></v-col>
          </v-row>
          <v-row>
            <v-col cols="4"><el-field-choice :single-line="false" :label="true" 
                                             :properties="fieldForm.institution_type" 
                                             v-model="fieldFormValue.institution_type"></el-field-choice></v-col>

            <v-col cols="4"><el-field-choice :single-line="false" :label="true" 
                                             :properties="fieldForm.industry_typing" 
                                             v-model="fieldFormValue.industry_typing"></el-field-choice></v-col>

            <v-col cols="4"><el-field-choice :single-line="false" :label="true" 
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
      <v-btn x-small tile @click="eventClickActionCancel">Отменить</v-btn>
      <v-btn x-small tile @click="eventClickActionAccept">Записать</v-btn>
    </v-card-actions>
  </div>

</template>

<script>
import ElFieldNumber from '@/components/elements/ElFieldNumberNew.vue';
import ElFieldString from '@/components/elements/ElFieldStringNew.vue';
import ElFieldChoice from '@/components/elements/ElFieldChoiceNew.vue';
import ElFieldDialog from '@/components/elements/ElFieldDialogNew.vue';

export default {
  name: 'TableFormOrganisations',
  components: {
    ElFieldNumber,
    ElFieldString,
    ElFieldChoice,
    ElFieldDialog,
  },
  props: {
    actionName: 'adding',
    focusedElement: Object,
  },
  data() {
    return {
      tableName: 'organisations',
      fieldFormValue: {
        title: '',
        institution_code: '',
        inn: '',
        kpp: '',
        organisation_type: {},
        rubpnubp_status: {},
        egrul_status: {},
        institution_type: {},
        industry_typing: {},
        budget_level: {},
        bk: {}
      },
    }
  },
  computed: {
    fieldForm() { 
      let fieldForm = this.$store.getters[`DataTable/GET_LIST_OPTION`]('organisations');
      for (let key of Object.keys(fieldForm)) {
        if (fieldForm[key].type == 'nested object') this.$set(fieldForm[key], 'objectValue', 'head_name'); //костыль, надо получать откуда-то
      }
      if (this.focusedElement != null) {
        for (let key of Object.keys(fieldForm)) {
          this.fieldFormValue[key] = this.focusedElement[key];
        }
      }
      return fieldForm;
    },
  },
  watch: {
    focusedElement() {
      if (this.focusedElement == null) this.fieldFormValueClear();
    },
  },
  created() {
    this.$store.dispatch(`DataTable/GET_LIST_OPTION`, {tableName: this.tableName});
  },
  methods: {
    eventClickActionCancel() {
      this.$emit('event-action-cancel');
      this.fieldFormValueClear();
    },
    eventClickActionAccept() {
      let option = {actionName: (this.focusedElement == null) ? 'adding' : 'editing', values: {}};
      Object.assign(option.values, this.fieldFormValue);
      this.$emit('event-action-accept', option);
      this.fieldFormValueClear();
    },
    fieldFormValueClear() {
      this.fieldFormValue = {
        title: '',
        institution_code: '',
        inn: '',
        kpp: '',
        organisation_type: {},
        rubpnubp_status: {},
        egrul_status: {},
        institution_type: {},
        industry_typing: {},
        budget_level: {},
        bk: {}
      };
    }
  },
}
</script>

<style lang="scss" scoped>

</style>