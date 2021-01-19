<template>
  <data-table d-id="Bk" 
              :table-properties="tableProperties" 
              editable
              v-bind:[typeRow[typeRowNumber]]="true"
              v-bind:[typeColumn]="true"
              :footer="isFooter"
              @event-row-focused="eventRowFocused"
              @event-row-selected="eventRowSelected"></data-table>
</template>

<script>
import { Table } from './Table.js';

export default {
  name: 'TableBudgetClassifications',
  mixins: [
    Table,
  ],
  data() {
    return {
      tableProperties: {
        tableName: 'budget-classifications',
        header: [
          {value: 'id', width: [60, 60], },
          {value: 'head_code', align: 'end', width: [200, 200], },
          {value: 'head_name', width: [400,],},
        ],
      },
    }
  },
}
</script>

<style lang="scss" scoped>

</style>