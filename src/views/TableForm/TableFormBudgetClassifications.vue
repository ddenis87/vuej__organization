<template>
<div class="table-form">
  <v-card-text>
    <v-form ref="formCreated">
      <v-text-field dense label="Код главы по БК" v-model="fieldForm.head_code"></v-text-field>
      <v-text-field dense label="Наименование главы по БК" v-model="fieldForm.head_name"></v-text-field>
    </v-form>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn x-small tile>Отменить</v-btn>
    <v-btn x-small tile>Записать</v-btn>
  </v-card-actions>
</div>

</template>

<script>
export default {
  name: 'TableFormBudgetClassifications',
  props: {
    properties: Object,
  },
  data() {
    return {
      // fieldForm: {
      //   head_code: '',
      //   head_name: '',
      // },
      actionName: 'adding',
    }
  },
  computed: {
    fieldForm() {
      console.log(this.properties);
      let fieldForm = {}
      if (this.properties.values == null) {
        fieldForm.head_code = '';
        fieldForm.head_name = '';
        console.log(fieldForm);
        return fieldForm;
      }
      fieldForm = this.properties.values;
      console.log(fieldForm);
      return fieldForm;
    }
  },
  watch: {
    // properties() {
    //   if (this.properties.fields != null) {
    //     console.log(this.properties);
    //     this.fieldForm = this.properties.fields;
    //     this.actionName = this.properties.actionName;
    //   };

    // }
  },
}
</script>

<style lang="scss" scoped>

</style>