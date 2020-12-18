<template>
  <div class="catalog">
    <data-table d-id="Bk" 
                :table-properties="propsDataTable" 
                fixed 
                ></data-table>
  </div>
</template>

<script>
import DataTable from '@/components/tables/DataTable/DataTable.vue';

export default {
  name: 'CatalogBK',
  components: {
    DataTable,
  },
  data() {
    return {
      propsDataTable: {
        stateName: 'CatalogBk',
        header: [
          {value: 'id', width: [50, 50], },
          {value: 'head_code', align: 'end', width: [200, 200], },
          {value: 'head_name', width: [400,],},
        ],
        activeField: 'id',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.catalog {
  height: 100%;
  padding: 10px;
  // border: thin solid green;
}
</style>