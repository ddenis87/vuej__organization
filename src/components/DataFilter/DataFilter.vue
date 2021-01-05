<template>
  <div class="data-filter">
    <v-card flat tile>
      <v-card-title><v-btn icon tile small color="blue" class="data-filter__btn" @click="$emit('close')"><v-icon small>mdi-close</v-icon></v-btn><v-spacer></v-spacer>Фильтр</v-card-title>
      <v-list flat>
        <v-list-item v-for="(item, index) in listField" :key="index">
          <el-field-choice-new label 
                               :bt-clear="true"
                               :properties="item"
                               :single-line="false"
                               v-model="dataFilterValue[item.key]" @clear="() => clearValue(item.key)"></el-field-choice-new>
        </v-list-item>
      </v-list>
      <v-card-actions><v-spacer></v-spacer><v-btn x-small @click="acceptFilter">Применить</v-btn></v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ElFieldChoiceNew from '@/components/elements/ElFieldChoiceNew.vue';

export default {
  name: 'DataFilter',
  components: {
    ElFieldChoiceNew,
  },
  props: {
    tableName: String,
  },
  data() {
    return {
      dataFilterValue: {},
    }
  },
  computed: {
    listField() {
      let listField = this.$store.getters[`DataTable/GET_LIST_OPTION`](this.tableName);
      let listFieldFilter = [];
      if (listField) {
        for (let item of Object.entries(listField)) {
          if (item[1].type == 'choice') listFieldFilter.push({key: item[0], label: item[1].label, choices: item[1].choices, type: item[1].type});
        }
      }
      console.log(listFieldFilter);
      return listFieldFilter;
    }
  },
  methods: {
    acceptFilter() {
      console.log(this.dataFilterValue);
      this.$store.commit('DataTable/SET_FILTER_STRING', (Object.keys(this.dataFilterValue).length != 0) ? this.dataFilterValue : null);
      this.$store.dispatch(`DataTable/GET_LIST_DATA`, {tableName: this.tableName});
      this.$emit('close');
    },
    clearValue(key) {
      delete this.dataFilterValue[key];
    },
  },
}
</script>

<style lang="scss" scoped>
.data-filter {
  padding: 0px 10px;
  z-index: 9999;

  &__btn {
    margin-left: -10px;
  }
}
</style>