<template>
  <div class="page-table">
    <div class="page-table__control">
      <data-table-control :form-properties="propertiesDataTable" 
                          :table-name="'organisations'" 
                          :focused-element="focusedElement"
                          :height-type="heightType[heightTypeCount]"
                          :paddingType="paddingType"
                          @event-change-row="eventChangeRow"
                          @event-change-column="eventChangeColumn"></data-table-control>
    </div>
    <v-divider></v-divider>
    <div class="page-table__body">
      <data-table d-id="Organisations" 
                  :table-properties="propertiesDataTable" 
                  editable
                  v-bind:[heightType[heightTypeCount]]="true"
                  v-bind:[paddingType]="true"
                  @event-row-focused="eventRowFocused"
                  @event-row-selected="eventRowSelected"></data-table>
    </div>
  </div>
</template>

<script>
import { Table } from './Table.js';

export default {
  name: 'TableOrganisation',
  mixins: [
    Table,
  ],
  data() {
    return {
      heightTypeCount: 0,
      heightType: ['fixed', 'dense', 'auto'],
      paddingType: 'padding-fixed',
      focusedElement: {},
      propertiesDataTable: {
        tableName: 'organisations',
        header: [
          {value: 'id', width: [50, 50],},
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

<style lang="scss" scoped>
.page-table {
  height: 100%;
  padding: 0px 0px;
  &__control {
    z-index: 20;
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
// ::v-deep {
//   .v-icon { margin-right: 0px; }
// }
</style>