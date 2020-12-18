<template>
  <div class="catalog">123456
    <data-table-c d-id="Bk" 
                :table-properties="propsDataTable" 
                fixed 
                ></data-table-c>
  </div>
</template>

<script>
// import store from '@/store'
import DataTableC from '@/components/tables/DataTable/DataTable.vue';

export default {
  name: 'CatalogBk',
  components: {
    DataTableC,
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
  mounted() {
    console.log('CatalogBk;')
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