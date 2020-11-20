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
          <v-icon> {{ (listMultiRow) ? 'mdi-view-stream' : 'mdi-format-list-bulleted'}}</v-icon>
        </v-btn>
      </div>
    </div>
    <div class="body">
      <table-space v-bind="propsTable" v-if="!listMultiRow"></table-space>
      <table-space-multi-row v-bind="propsTable"
                       v-if="listMultiRow"></table-space-multi-row>
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
      listMultiRow: false,
      viewTable: 'body',
      propsTable: {
        locationFields: [  // only multirow table
          [ 120,                'auto',  120,   200,                160,                 200,                200  ],

          ['institution_code', 'title', 'inn', 'egrul_status',     'industry_typing',   'budget_level',     'bk'  ],
          ['institution_code', 'title', 'kpp', 'rubpnubp_status',  'institution_type',  'budget_level',     'bk'  ]
        ],
        header: {
          state: {
            getterData: 'GET_LIST_FIELDS',
            getterSortedProps: 'GET_LIST_SORTED_PROPS',
            commitSorted: 'SET_LIST_DATA_SORTED',
            commitSortedProps: 'SET_LIST_SORTED_PROPS',
          },
          items: [
            {name: 'institution_code', width: 120},
            {name: 'title'},
            {name: 'inn', width: 120},
            {name: 'kpp', width: 120},
            {name: 'egrul_status', width: 200},
            {name: 'rubpnubp_status', width: 200},
            {name: 'industry_typing', width: 160},
            {name: 'budget_level', width: 160},
            {name: 'institution_type', width: 120},
            {name: 'bk' },
          ]
        },
        body: {
          state: {
            getterData: 'GET_LIST_DATA',
            dispatchData: 'GET_LIST_DATA',
          },
          items: [
            {name: 'title', colorBackground: 'teal', colorText: 'white'},
          ],
          sourceStyle: 'joinq',
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
