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
import { TableForm } from './TableForm.js';

export default {
  name: 'TableFormBudgetClassifications',
  mixins: [
    TableForm,
  ],
  data() {
    return {
      tableName: 'budget-classifications',
      fieldFormValue: {
        head_name: '',
        head_code: '',
      },
    }
  },
  methods: {
    fieldFormValueClear() {
      this.fieldFormValue = {
        head_name: '',
        head_code: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>