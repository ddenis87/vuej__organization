<template>
  <div class="page-table">
    <div class="page-table__control">
      <data-table-control :form-properties="formProperties" :table-name="'organisations'" :focused-element="focusedElement"></data-table-control>
    </div>
    <v-divider></v-divider>
    <div class="page-table__body">
      <data-table d-id="Organization" 
                  :table-properties="propsDataTable" 
                  editable
                  @event-row-focused="eventRowFocused"></data-table>
    </div>
  </div>
</template>

<script>
import DataTableControl from '@/components/Table/DataTableControl/DataTableControl.vue';
import DataTable from '@/components/Table/DataTable/DataTable.vue';

export default {
  name: 'TableOrganisation',
  components: {
    DataTableControl,
    DataTable,
  },
  data() {
    return {
      propsDataTable: {
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
      focusedElement: {},
      formProperties: {
        tableName: 'organisations',
        header: [
          {value: 'bk', objectValue: 'head_name'}
        ],
      }
    }
  },
  methods: {
    eventRowFocused(event, option, tableName) {
      this.focusedElement = Object.assign({}, option);
    },
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