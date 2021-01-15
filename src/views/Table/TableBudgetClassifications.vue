<template>
  <div class="page-table">
    <div class="page-table__control">
      <data-table-control :form-properties="propertiesDataTable" 
                          :table-name="'budget-classifications'" 
                          :focused-element="focusedElement"
                          :height-type="heightType"
                          :paddingType="paddingType"
                          @event-change-row="eventChangeRow"
                          @event-change-column="eventChangeColumn"></data-table-control>
    </div>
    <v-divider></v-divider>
    <div class="page-table__body">
      <data-table d-id="Bk" 
                  :table-properties="propertiesDataTable" 
                  :editable="isEditable"
                  v-bind:[heightType]="true"
                  v-bind:[paddingType]="true"
                  @event-row-focused="eventRowFocused"
                  @event-row-selected="eventRowSelected"></data-table>
    </div>
  </div>
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
      heightType: 'fixed',
      paddingType: 'padding-fixed',
      focusedElement: {},
      propertiesDataTable: {
        tableName: 'budget-classifications',
        header: [
          {value: 'id', width: [80, 80], },
          {value: 'head_code', align: 'end', width: [200, 200], },
          {value: 'head_name', width: [400,],},
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