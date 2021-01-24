<template>
  <data-table id="budgetclassification" 
              :properties="tableProperties"
              :type-height="typeRow[typeRowNumber]"
              :type-column="typeColumn"
              :is-editable="isEditable"
              :is-footer="isFooter"
              :is-expansion="isExpansion"
              @event-row-focused="eventRowFocused"
              @event-row-selected="eventRowSelected"></data-table>
</template>

<script>
import { Table } from './Table.js';

export default {
  name: 'TableBudgetclassification',
  mixins: [
    Table,
  ],
  data() {
    return {
      tablePropertiesUno: {
        tableName: 'budgetclassification',
        headers: [
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