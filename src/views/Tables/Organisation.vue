<template>
  <div class="register">
    <data-table d-id="Organization" 
                :table-properties="propsDataTable" 
                editable></data-table>
  </div>
</template>

<script>
import DataTable from '@/components/tables/DataTable/DataTable.vue';

export default {
  name: 'Organisation',
  components: {
    DataTable,
  },
  data() {
    return {
      propsDataTable: {
        tableName: 'organisations',
        header: [
          {value: 'id', width: [50, 50], },
          {value: 'institution_code', align: 'end', width: [90, 90], },
          {value: 'title', width: [400,],},
          {value: 'inn', width: [150, 150]},
          {value: 'kpp', width: [115, 115],},
          {value: 'egrul_status', width: [140, 140]},
          {value: 'rubpnubp_status', width: [140, 140]},
          {value: 'industry_typing', width: [120, 120]},
          {value: 'institution_type', width: [130, 130]},
          {value: 'budget_level', width: [180, 180]},
          {value: 'bk', width: [180, 180], objectValue: 'head_name'},
        ],
        activeField: 'id',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.register {
  height: 100%;
  padding: 10px;
}
</style>