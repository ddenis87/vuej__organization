<template>
  <div class="page-table">
    <div class="page-table__control">
      <data-table-control :properties="propertiesDataTableControl"></data-table-control>
    </div>
    <v-divider></v-divider>
    <div class="page-table__body">
      <data-table d-id="Bk" 
                  :table-properties="propertiesDataTable" 
                  fixed
                  :editable="isEditable"
                  @event-row-focused="eventRowFocused"
                  @event-row-selected="eventRowSelected"></data-table>
    </div>
    
  </div>
</template>

<script>
import DataTableControl from '@/components/Table/DataTableControl/DataTableControl.vue';
import DataTable from '@/components/Table/DataTable/DataTable.vue';

export default {
  name: 'TableBudgetClassifications',
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
      propertiesDataTable: {
        tableName: 'budget-classifications',
        header: [
          {value: 'id', width: [80, 80], },
          {value: 'head_code', align: 'end', width: [200, 200], },
          {value: 'head_name', width: [400,],},
        ],
        // activeField: 'id',
      },
      propertiesDataTableControl: {
        tableName: 'budget-classifications',
        propertiesFocusedElement: null,
      },
      
    }
  },
  computed: {
    isEditable() { return this.editable; }
  },
  methods: {
    eventRowFocused(event, option, tableName) {
      this.propertiesDataTableControl = {
        tableName: tableName,
        propertiesFocusedElement: option,
      }
    },
    eventRowSelected(event, option, tableName) {
      this.$emit('event-row-selected', option);
    },
    eventTableBlur() {
      console.log('blur table');
      this.propertiesDataTableControl = null;
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