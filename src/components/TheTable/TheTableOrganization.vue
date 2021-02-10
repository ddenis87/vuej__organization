<template>
  <data-table id="organization" 
              :properties="tableProperties"
              :type-height="typeRow[typeRowNumber]"
              :type-column="typeColumn"
              :is-editable="isEditable"
              :is-footer="isFooter"
              :is-expansion="isExpansion"
              :is-multiline="isMultiline"
              @event-row-focused="eventRowFocused"
              @event-row-selected="eventRowSelected"
              @event-row-keydown="eventRowKeydown"
              @event-component-blur="eventComponentBlur"></data-table>
</template>

<script>
import { TheTable } from './TheTable.js';

export default {
  name: 'TableOrganization',
  mixins: [
    TheTable,
  ],
  data() {
    return {
      tablePropertiesUno: {
        tableName: 'organization',
        headers: [
          {value: 'id', width: 60,},
          {value: 'institution_code', align: 'end', width: 105, },
          {value: 'registry_date', align: 'start', width: 120,},
          {value: 'last_visited', align: 'start', width: 160,},
          // {value: 'organization_type', align: 'start', width: 115, },
          {value: 'title', align: 'start', width: [400,],},
          {value: 'inn', width: [110, 110]},
          {value: 'kpp', width: [110, 110],},
          {value: 'rubpnubp_status', width: [115, 115]},
          {value: 'egrul_status', width: [145, 145]},
          {value: 'industry_typing', width: [120, 120]},
          {value: 'institution_type', width: [130, 130]},
          {value: 'budget_level', width: [180, 180]},
          {value: 'bk', width: [180, ],},
        ],
      },
      tablePropertiesMultiline: {
        tableName: 'organization',
        headers: [
          [ 
            {value: 'id', width: [140, 140],},
            {value: 'title', align: 'start', column: 3, width: [400,],},
          ], [
            {value: 'institution_code', align: 'end', width: 140},
            {value: 'inn', width: [120,]},
            {value: 'kpp', width: [120,]},
            {value: 'budget_level', width: [120,]},
          ], [
            {value: 'institution_type', width: [130,]},
            {value: 'egrul_status', width: [140, 140]},
            {value: 'rubpnubp_status', width: [140, 140]},
            {value: 'industry_typing', width: [120,]},
          ], [
            {value: 'organization_type', align: 'start', width: 115, },
            {value: 'registry_date', align: 'start', width: 90, },
            {value: 'bk', column: 2, width: [180, ],},
          ]
        ],
      },
    }
  },
}
</script>