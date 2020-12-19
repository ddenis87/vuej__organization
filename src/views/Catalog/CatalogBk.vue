<template>
  <div class="catalog">
    <data-table d-id="Bk" 
                :table-properties="propsDataTable" 
                fixed 
                @dblclick-row="(eventTarget, itemColumn) => $emit('dblclick-row', eventTarget, itemColumn)"></data-table>
  </div>
</template>

<script>
// import store from '@/store'
import DataTable from '@/components/tables/DataTable/DataTable.vue';

export default {
  name: 'CatalogBk',
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