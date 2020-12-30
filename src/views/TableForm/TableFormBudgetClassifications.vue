<template>
<div class="table-form">
  <v-card-text>
    <v-form ref="formAction">
      <v-container>
        <v-row>
          <v-col cols="12"><el-field-string :single-line="false" :label="true" 
                                            :properties="fieldForm.head_name" 
                                            v-model="fieldFormValue.head_name"></el-field-string></v-col>
        </v-row>
        <v-row>
            <v-col cols="12"><el-field-number :single-line="false" :label="true" 
                                              :properties="fieldForm.head_code" 
                                              v-model="fieldFormValue.head_code"></el-field-number></v-col>
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
import ElFieldString from '@/components/elements/ElFieldStringNew.vue';
import ElFieldNumber from '@/components/elements/ElFieldNumberNew.vue';

export default {
  name: 'TableFormBudgetClassifications',
  components: {
    ElFieldString,
    ElFieldNumber,
  },
  props: {
    actionName: 'adding',
    focusedElement: Object,
  },
  data() {
    return {
      tableName: 'budget-classifications',
      fieldFormValue: {
        head_name: '',
        head_code: '',
      },
    }
  },
  computed: {
    fieldForm() { 
      let fieldForm = this.$store.getters[`DataTable/GET_LIST_OPTION`]('budget-classifications');
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
      if (!this.fieldFormValueValidation()) return;
      let option = {actionName: (this.focusedElement == null) ? 'adding' : 'editing', values: {}};
      Object.assign(option.values, this.fieldFormValue);
      this.$emit('event-action-accept', option);
      this.fieldFormValueClear();
    },
    fieldFormValueClear() {
      this.fieldFormValue = {
        head_name: '',
        head_code: '',
      }
    },
    fieldFormValueValidation() {
      console.log(this.fieldFormValue);
      for (let key of Object.keys(this.fieldFormValue)) {
        if (this.fieldForm[key].required == true && this.fieldFormValue[key] == '') return false;
      }
      return true;
    }
  },
}
</script>

<style lang="scss" scoped>

</style>