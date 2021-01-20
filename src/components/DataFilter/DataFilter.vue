<template>
  <div class="data-filter">
    <v-card flat tile>
      <v-list flat>
        <v-subheader class="data-filter__title">Имя Таблицы</v-subheader>
        <v-list-item v-for="(item, index) in listField" :key="index">
          <el-field-choice label 
                           :bt-clear="true"
                           :properties="item"
                           :single-line="false"
                           v-model="dataFilterValue[item.key]" @clear="() => clearValue(item.key)"></el-field-choice>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="data-filter__btn-accept" color="blue darken-1" dark height="30" @click="acceptFilter">Применить</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ElFieldString from '@/components/Elements/ElFieldString.vue';
import ElFieldChoice from '@/components/Elements/ElFieldChoice.vue';

export default {
  name: 'DataFilter',
  components: {
    ElFieldString,
    ElFieldChoice,
  },
  props: {
    tableName: String,
  },
  data() {
    return {
      dataFilterValue: {},
      currentTab: 'Filter'
    }
  },
  computed: {
    currentTabComponent() {
      return 'Data' + this.currentTab;
    },
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
      this.$store.commit('DataTable/SET_FILTER_STRING', (Object.keys(this.dataFilterValue).length != 0) ? {
        tableName: this.tableName,
        filters: this.dataFilterValue
      } : {
            tableName: this.tableName,
            filters: null
          });
      this.$store.dispatch(`DataTable/GET_LIST_DATA`, {tableName: this.tableName});
      this.$emit('accept');
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
  &__title {
    text-transform: uppercase;
  }
}
.v-list-item {
  padding: 0px 5px;
}
</style>