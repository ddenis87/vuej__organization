<template>
  <div class="page-table">
    <div class="page-table__control">
      <data-table-control :item-selected="itemSelectedValue" 
                          :data-properties="propsDataTable"
                          @click-outside="itemSelectedValue = null"
                          @adding-accept="itemSelectedValue = null"
                          @editing-accept="itemSelectedValue = null"
                          @editing-cancel="itemSelectedValue = null"
                          @deleting-accept="itemSelectedValue = null"
                          @deleting-cancel="itemSelectedValue = null"></data-table-control>
    </div>
    <v-divider></v-divider>
    <div class="page-table__body">
      <data-table d-id="Bk" 
                  :table-properties="propsDataTable" 
                  fixed
                  :editable="isEditable"
                  @item-selected="selectedItem"
                  @dblclick-row="(eventTarget, itemColumn, objectValue) => $emit('dblclick-row', eventTarget, itemColumn, objectValue)"></data-table>
    </div>
    
  </div>
</template>

<script>
import DataTableControl from '@/components/tables/DataTableControl/DataTableControl.vue';
import DataTable from '@/components/tables/DataTable/DataTable.vue';

export default {
  name: 'Bk',
  components: {
    DataTableControl,
    DataTable,
  },
  props: {
    editable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      propsDataTable: {
        tableName: 'budget-classifications',
        header: [
          {value: 'id', width: [80, 80], },
          {value: 'head_code', align: 'end', width: [200, 200], },
          {value: 'head_name', width: [400,],},
        ],
        activeField: 'id',
      },
      itemSelectedValue: null,
      
    }
  },
  computed: {
    isEditable() { return this.editable; }
  },
  mounted() {
    // console.log('CatalogBk;')
  },
  methods: {
    selectedItem(event, option) {
      // console.log(option);
      this.itemSelectedValue = {};
      Object.assign(this.itemSelectedValue, option);
    }
  }
}
</script>

<style lang="scss" scoped>
.page-table {
  height: 100%;
  padding: 0px 0px;
  &__control {
    z-index: 40;
  }
  &__body {
    height: 100%;
    z-index: 10;
  }
}
.dialog {
  &__title {
    color: white;
  }
}
::v-deep {
  .v-icon { margin-right: 0px; }
}
</style>