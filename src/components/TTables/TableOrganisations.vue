<template>
  <data-table d-id="Organisations" 
              :table-properties="tableProperties" 
              editable
              v-bind:[heightType]="true"
              v-bind:[paddingType]="true"
              @event-row-focused="eventRowFocused"
              @event-row-selected="eventRowSelected"></data-table>
</template>

<script>
import { Table } from './Table.js';

export default {
  name: 'TableOrganisations',
  mixins: [
    Table,
  ],
  data() {
    return {
      tableProperties: {
        tableName: 'organisations',
        header: [
          {value: 'id', width: [100, 100],},
          {value: 'institution_code', align: 'end', width: [90, 90], },
          {value: 'title', width: [400,],},
          {value: 'inn', width: [115, 115]},
          {value: 'kpp', width: [115, 115],},
          {value: 'rubpnubp_status', width: [140, 140]},
          {value: 'egrul_status', width: [140, 140]},
          {value: 'industry_typing', width: [120, 120]},
          {value: 'institution_type', width: [130, 130]},
          {value: 'budget_level', width: [180, 180]},
          {value: 'bk', width: [180, 180], objectValue: 'head_name'},
        ],
      },
    }
  },
}
</script>