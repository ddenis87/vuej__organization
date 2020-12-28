<template>
<div class="table-form">
  <v-card-text>
    <v-form ref="formAction">
      <v-text-field dense label="Код главы по БК" v-model="fieldForm.head_code"></v-text-field>
      <v-text-field dense label="Наименование главы по БК" v-model="fieldForm.head_name"></v-text-field>
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
export default {
  name: 'TableFormBudgetClassifications',
  props: {
    properties: Object,
  },
  data() {
    return {
      actionName: 'adding',
    }
  },
  computed: {
    fieldForm() {
      // console.log(this.properties);
      let fieldForm = {}
      if (this.properties.values == null) {
        fieldForm.head_code = '';
        fieldForm.head_name = '';
        // console.log(fieldForm);
        return fieldForm;
      }
      Object.assign(fieldForm, this.properties.values);
      // console.log(fieldForm);
      return fieldForm;
    }
  },
  methods: {
    eventClickActionCancel() {
      this.$emit('event-action-cancel');
      this.$refs.formAction.reset();
    },
    eventClickActionAccept() {
      let option = {actionName: this.properties.actionName, values: {}};
      Object.assign(option.values, this.fieldForm);
      // console.log(option);
      this.$emit('event-action-accept', option);
      this.$refs.formAction.reset();
    },
  },
}
</script>

<style lang="scss" scoped>

</style>