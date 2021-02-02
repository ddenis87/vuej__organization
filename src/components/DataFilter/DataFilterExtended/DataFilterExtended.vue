<template>
  <div class="data-filter-extended">
    <v-card flat tile>
      <v-list flat>
        <v-subheader class="data-filter-extended__title">{{ tableNameDescription }}</v-subheader>
        <div class="data-filter-extended__body">
          <data-filter-extended-item :is-title="true"
                                     :input-title="['Условие', 'Значение']"></data-filter-extended-item>
          <data-filter-extended-item v-for="item in filterList"
                                     :key="item.key"
                                     :input-properties="item"></data-filter-extended-item>
        </div>
        
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="btn btn-accept" color="blue darken-1" dark height="30" @click="acceptFilter">Применить</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import DataFilterExtendedItem from './DataFilterExtendedItem.vue';

export default {
  name: 'DataFilterExtended',
  components: {
    DataFilterExtendedItem,
  },
  props: {
    tableName: { type: String, default: null, },
    listException: { type: Array, default() { return [] } },
  },
  computed: {
    tableNameDescription() { return (!this.tableName) ? '' : this.$store.getters[`DataTable/GET_DESCRIPTION`](this.tableName); },
    filterList() {
      let filterListArray = [];
      let filterList = this.$store.getters[`DataTable/GET_OPTIONS`](this.tableName);
      for (let key of Object.keys(filterList))
        if (!this.listException.includes(key))
          filterListArray.push(Object.assign({key: key}, filterList[key]));
      console.log(filterListArray);
      return filterListArray;
    },
  },
  methods: {
    acceptFilter() {},
  }
}
</script>

<style lang="scss" scoped>
.data-filter-extended {
  padding: 0px 0px;
  &__title {
    text-transform: uppercase;
  }
  &__body {
    padding: 0px 16px;
  }
}
</style>