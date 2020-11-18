<template>
  <div class="home" id="home">
    <h2>Организации</h2>

    <div class="control">
      <control-user></control-user>
      <v-btn class="control__btn"
              title="Переключить вид"
              fab
              dark
              small
              @click="() => {listMultiRow = !listMultiRow}">
        <v-icon> {{ (listMultiRow) ? 'mdi-view-stream' : 'mdi-format-list-bulleted'}}</v-icon>
      </v-btn>
    </div>
    <hr/>
    <div class="body">
      <table-section :columnWidth="tableColumnWidth" 
                     :columnSorted="tableColumnSorted"></table-section>
    </div>
  </div>
</template>

<script>
import ControlUser from '@/components/control/ControlUser';
import TableSection from '@/components/table/TableSection';

export default {
  name: 'Organization',
  components: {
    ControlUser,
    TableSection
  },
  data() {
    return {
      listMultiRow: false,
      tableColumnWidth: [20, 300, , 100, 500, 100, 100],
      tableColumnSorted: ['bk', 'budget_level', 'institution_code', 'title', 'inn', 'kpp', 'institution_type', 'organisation_type', 'egrul_status', 'rubpnubp_status', 'industry_typing'],
    }
  },
  created() {
    this.$store.dispatch('GET_LIST_OPTIONS');
  },
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  .control {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    &__btn { margin: 5px 10px; }
  }
}
</style>
