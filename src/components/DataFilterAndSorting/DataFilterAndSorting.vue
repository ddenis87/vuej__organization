<template>
  <div class="data-filter-and-sorting">
    <v-toolbar dense flat>
      <v-toolbar-title>
        <v-btn icon tile small color="blue" class="data-filter-and-sorting__btn" @click="$emit('close')"><v-icon small>mdi-close</v-icon></v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <!-- <v-tabs>
          <v-tab :to="'tab-filter'">Фильтр</v-tab>
          <v-tab :href="'tab-sorting'">Сортировка</v-tab>
        </v-tabs> -->
        <v-btn depressed tile color="white" @click="currentTab = 'Filter'">Фильтры</v-btn>
        <v-btn depressed tile color="white" @click="currentTab = 'Sorted'">Сортировка</v-btn>
      </v-toolbar-title>
    </v-toolbar>
    <component :is="currentTabComponent" v-bind:table-name="tableName"></component>
    <!-- <v-card flat tile>
      <v-list flat>
        <v-list-item v-for="(item, index) in listField" :key="index">
          <el-field-choice-new label 
                               :bt-clear="true"
                               :properties="item"
                               :single-line="false"
                               v-model="dataFilterValue[item.key]" @clear="() => clearValue(item.key)"></el-field-choice-new>
        </v-list-item>
      </v-list>
      <v-card-actions><v-spacer></v-spacer><v-btn class="data-filter__btn-accept" color="blue darken-1" depressed small @click="acceptFilter">Применить</v-btn></v-card-actions>
    </v-card> -->
  </div>
</template>

<script>
import DataFilter from './DataFilter.vue';
import DataSorted from './DataSorted.vue';

export default {
  name: 'DataFilterAndSorting',
  components: {
    DataFilter,
    DataSorted,
  },
  props: {
    tableName: String,
  },
  data() {
    return {
      // dataFilterValue: {},
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
.data-filter-and-sorting {
  padding: 0px 10px;
  z-index: 9999;
  &__title {
    margin-right: 8px;
  }
  &__btn {
    margin-left: 0px;
  }
  &__btn-accept {
    margin-right: 14px;
    color: white;
  }
}
</style>