<template>
  <div class="page-table">
    <div class="page-table__control">
      <data-table-control :form-properties="propertiesDataTable" 
                          :table-name="'budget-classifications'" 
                          :focused-element="focusedElement"
                          :height-type="heightType[heightTypeCount]"
                          :paddingType="paddingType"
                          @toggle-type-row="eventChangeRow"
                          @toggle-type-column="eventChangeColumn"
                          @toggle-footer="toggleFooter"></data-table-control>
    </div>
    <v-divider></v-divider>
    <div class="page-table__body">
      <data-table d-id="Bk" 
                  :table-properties="propertiesDataTable" 
                  :editable="isEditable"
                  v-bind:[heightType[heightTypeCount]]="true"
                  v-bind:[paddingType]="true"
                  :footer="isFooter"
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
      heightTypeCount: 0,
      heightType: ['fixed', 'dense', 'auto'],
      paddingType: 'padding-fixed',
      isFooter: false,
      focusedElement: {},
      propertiesDataTable: {
        tableName: 'budget-classifications',
        header: [
          {value: 'id', width: [50, 50], },
          {value: 'head_code', align: 'end', width: [150, 150], },
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