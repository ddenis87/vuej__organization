<template>
  <data-table id="organization" 
              :properties="tableProperties"
              :type-height="typeRow[typeRowNumber]"
              :type-column="typeColumn"
              is-editable
             
              :is-footer="isFooter"
              @event-row-focused="eventRowFocused"
              @event-row-selected="eventRowSelected"></data-table>
</template>

<script>
import { Table } from './Table.js';

export default {
  name: 'TableOrganizations',
  mixins: [
    Table,
  ],
  data() {
    return {
      tableProperties: {
        tableName: 'organization',
        headers: [
          {value: 'id', width: 60,},
          {value: 'institution_code', align: 'end', width: 90, },
          {value: 'title', width: [400,],},
          {value: 'inn', width: [, 115]},
          {value: 'kpp', width: [115, 115],},
          {value: 'rubpnubp_status', width: [140, 140]},
          {value: 'egrul_status', width: [140, 140]},
          {value: 'industry_typing', width: [120, 120]},
          {value: 'institution_type', width: [130, 130]},
          {value: 'budget_level', width: [180, 180]},
          {value: 'bk', width: [180, ], related_model_view: { delimiter: ' - ', field: ['head_code','head_name'] }},
        ],
      },
      // tableProperties: {
      //   tableName: 'organization',
      //   headers: [
      //     [
      //       {value: 'id', width: [60, 60],},
      //       {value: 'institution_code', align: 'end', width: [90, 90], },
      //       {value: 'title', width: [400,],},
      //       {value: 'inn', width: [115, 115]},
      //       {value: 'kpp', width: [115, 115],},
      //       {value: 'rubpnubp_status', width: [140, 140]},
      //     ], [
      //       {},
      //       {value: 'egrul_status', width: [140, 140]},
      //       {value: 'industry_typing', width: [120, 120]},
      //       {value: 'institution_type', width: [130, 130]},
      //       // {value: 'budget_level', width: [180, 180]},
      //       {value: 'bk', column: 2, width: [180, ], related_model_view: { delimiter: ' - ', field: ['head_code','head_name'] }},
      //     ]
      //   ],
      // },
      // tableProperties: {
      //   tableName: 'organization',
      //   headers: [
      //     [
      //       {value: 'id', width: [60, 60],},
      //       {value: 'title', column: 5, width: [400,],},
      //     ], [
      //       {},
      //       {value: 'inn', width: [115, 115]},
      //       {value: 'kpp', width: [115, 115],},
      //       {value: 'rubpnubp_status', column: 3, width: [140, 140]},
      //     ], [
      //       {value: 'bk', column: 3, width: [180, ], related_model_view: { delimiter: ' - ', field: ['head_code','head_name'] }},
      //       {value: 'institution_type', width: [130,]},
      //       {value: 'budget_level', width: [180, 180]},
      //       {value: 'industry_typing', width: [120, ]},
      //     ], [
      //       {value: 'institution_code', column: 1, align: 'end', width: 90, },
      //       {value: 'egrul_status', column: 5, width: [140, 140]},
      //     ]
      //   ],
      // },
    }
  },
}
</script>