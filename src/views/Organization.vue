<template>
  <div class="home" id="home">
    <h2>Организации</h2>

    <div class="control">
      <control-user></control-user>
      <div class="control__btn">
        <v-btn title="Переключить вид"
               fab
               dark
               small
               @click="() => {listMultiRow = !listMultiRow}">
          <v-icon> {{ (listMultiRow) ? 'mdi-format-list-bulleted' : 'mdi-view-stream'}}</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="body">
      <table-space v-bind="propsTable" 
                   v-if="!listMultiRow"></table-space>
      <table-space-multi-row v-bind="propsTable"
                             v-if="listMultiRow">
        <template v-slot:body.bk="itemValue"><div style="color: green; font-weight: bold; text-align: right;">{{ itemValue.itemValue }}</div></template>
        <template v-slot:body.title="itemValue"><div style="color: red; font-weight: bold;">{{ itemValue.itemValue }}</div></template>
      </table-space-multi-row>
    </div>
  </div>
</template>

<script>
import ControlUser from '@/components/control/ControlUser.vue';
import TableSpace from '@/components/tables/TableSpace/TableSpace.vue';
import TableSpaceMultiRow from '@/components/tables/TableSpaceMultiRow/TableSpaceMultiRow.vue';

export default {
  name: 'Organization',
  components: {
    ControlUser,
    TableSpace,
    TableSpaceMultiRow,
  },
  data() {
    return {
      listMultiRow: true,
      viewTable: 'body',
      propsTable: {
        locationFields: [  // only multirow table
          [ 120,                'auto',  120,   200,                160,                 200,                200  ],
          ['institution_code', 'title', 'inn', 'egrul_status',     'industry_typing',   'budget_level',     'bk'  ],
          ['institution_code', 'title', 'kpp', 'rubpnubp_status',  'institution_type',  'budget_level',     'bk'  ]
        ],
        header: {
          // align: 'center',  // align for all fields or default = left
          state: {
            getterData: 'GET_LIST_FIELDS',
            getterSortedProps: 'GET_LIST_SORTED_PROPS',
            commitSorted: 'SET_LIST_DATA_SORTED',
            commitSortedProps: 'SET_LIST_SORTED_PROPS',
          },
          items: [
            {spaceName: 'institution_code', width: 130, align: 'right'},
            {spaceName: 'title'},
            {spaceName: 'inn', width: 120},
            {spaceName: 'kpp', width: 120},
            {spaceName: 'egrul_status', width: 200},
            {spaceName: 'rubpnubp_status', width: 200},
            {spaceName: 'industry_typing', width: 160},
            {spaceName: 'budget_level', width: 160},
            {spaceName: 'institution_type', width: 120},
            {spaceName: 'bk' },
          ]
        },
        body: {
          // align: 'end',  // align for all fields or default = left
          state: {
            getterData: 'GET_LIST_DATA',
            dispatchData: 'GET_LIST_DATA',
          },
          items: [
            {spaceName: 'institution_code', align: 'end'},
            // {spaceName: 'title', colorBackground: 'teal', colorText: 'white'},
          ],
          sourceStyle: 'body', // header - inherit header style, 
                                  // body - body style, 
                                  // join - join body and header style body - important, 
                                  // none props - style component
        }
      },
    }
  },
  created() {
    this.$store.dispatch('GET_LIST_OPTIONS');
  },
  methods: {
    changeView() {
      this.propsTable.propsBody.sourceProps = this.viewTable;
    },
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  .control {
    display: flex;
    
    justify-content: space-between;
    align-items: center;
    height: 60px;
    margin-bottom: 10px;
    &__btn {
      display: flex;
      justify-content: flex-end;
      width: 60px;
    }
    &-view {
      padding: 10px;
      border: 1px solid green;
      &__text { padding: 0; margin: 0; }
    }
  }
}
</style>
