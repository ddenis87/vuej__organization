<template>
  <v-text-field :id="fieldId"
                class="el-field-string" 
                v-model="fieldValue"
                :single-line="singleLine"
                :label="labelText"
                :hide-details="false"
                clear-icon="mdi-close"
                clearable
                prepend-icon="mdi-magnify">
      <template v-slot:append>
        <v-btn icon small><v-icon small>mdi-arrow-right</v-icon></v-btn>
        
      </template>
    </v-text-field>
    
</template>

<script>
export default {
  name: 'ElFieldSearch',
  model: {
    prop: 'propertiesValue',
    event: 'input',
  },
  props: {
    labelText: { type: String, default: '' },
    singleLine: {type: Boolean, default: true},
  },
  data() {
    return {
      isInputEmit: false,
      fieldId: `El-${this.properties?.value}`,
      fieldValue: this.propertiesValue,
      fieldRequired: this.properties?.required,
      fieldRules: {
        required: value => !!value || 'мин. 1 символ',
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.el-field-string {
  width: 100%;
  font-size: 14px;
  
}
.v-text-field {
  margin-top: -3.5px;
}
</style>