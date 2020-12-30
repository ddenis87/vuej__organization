<template>
<div class="table-form">
  <v-card-text>
    <v-form ref="formAction">
      <v-container>
        <v-row>
          <v-col cols="12"><el-field-string :single-line="false" :label="true" 
                                            :properties="fieldForm.head_name" 
                                            :properties-value="fieldForm.head_name.text" 
                                            v-model="fieldFormValue.head_name"></el-field-string></v-col>
        </v-row>
        <v-row>
            <v-col cols="12"><el-field-string :single-line="false" :label="true" 
                                              :properties="fieldForm.head_code" 
                                              :properties-value="fieldForm.head_code.text" 
                                              v-model="fieldFormValue.head_code"></el-field-string></v-col>
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
import ElFieldString from '@/components/elements/ElFieldStringMod.vue';

export default {
  name: 'TableFormBudgetClassifications',
  components: {
    ElFieldString,
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
      console.log('form computed');
      let fieldForm = this.$store.getters[`DataTable/GET_LIST_OPTION`]('budget-classifications');
      for (let key of Object.keys(fieldForm)) {
        this.$set(fieldForm[key], 'text', '');
        if (fieldForm[key].type == 'nested object') this.$set(fieldForm[key], 'objectValue', 'head_name');
      }
      if (this.focusedElement != null) {
        for (let key of Object.keys(fieldForm)) {
          fieldForm[key].text = this.focusedElement[key];
        }
      } else {
        console.log('add');
      }
      console.log(fieldForm);
      return fieldForm;
    },
  },
  created() {
    console.log('ceate form');
    this.$store.dispatch(`DataTable/GET_LIST_OPTION`, {tableName: this.tableName});
  },
  methods: {
    eventClickActionCancel() {
      this.$emit('event-action-cancel');
      this.$refs.formAction.reset();
    },
    eventClickActionAccept() {
      console.log(this.focusedElement);
      let option = {actionName: (this.focusedElement == null) ? 'adding' : 'editing', values: {}};
      Object.assign(option.values, this.fieldFormValue);
      console.log(option);
      this.$emit('event-action-accept', option);
      this.$refs.formAction.reset();
    },
  },
}
</script>

<style lang="scss" scoped>

</style>