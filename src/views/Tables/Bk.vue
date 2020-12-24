<template>
  <div class="catalog">
    <data-table d-id="Bk" 
                :table-properties="propsDataTable" 
                fixed
                :editable="isEditable"
                @dblclick-row="(eventTarget, itemColumn, objectValue) => $emit('dblclick-row', eventTarget, itemColumn, objectValue)"></data-table>
  </div>
</template>

<script>
import DataTable from '@/components/tables/DataTable/DataTable.vue';

export default {
  name: 'Bk',
  components: {
    DataTable,
  },
  props: {
    editable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isEditable() { return this.editable; }
  },
  data() {
    return {
      propsDataTable: {
        tableName: 'budget-classifications',
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
    // console.log('CatalogBk;')
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