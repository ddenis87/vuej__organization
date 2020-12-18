<template>
  <div class="register">
    <data-table d-id="Organization" 
                :table-properties="propsDataTable" 
                fixed 
                editable></data-table>
  </div>
</template>

<script>
import DataTable from '@/components/tables/DataTable/DataTable.vue';

export default {
  name: 'RegisterOrganization',
  components: {
    DataTable,
  },
  data() {
    return {
      propsDataTable: {
        stateName: 'RegisterOrganization',
        // state: {
        //   progress: 'GET_STATUS_LOAD',
        //   init: 'GET_LIST_OPTIONS',
        //   header: {
        //     getData: 'GET_LIST_FIELDS',
        //   },
        //   body: {
        //     getData: 'GET_LIST_DATA',
        //     loadData: 'GET_LIST_DATA',
        //   },
        // },
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
          {value: 'bk', width: [180, 180]},
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
  // border: thin solid green;
}
</style>