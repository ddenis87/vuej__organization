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

      <table-multiline v-bind="propsTable"
                       v-if="listMultiRow">
        <template #[`body.institution_code`]="itemValue">
          <div style="text-align: right;">{{ itemValue.itemValue }}</div>
        </template>
      </table-multiline>
    </div>
  </div>
</template>

<script>
import ControlUser from '@/components/control/ControlUser.vue';
import TableSpace from '@/components/tables/TableSpace/TableSpace.vue';
import TableMultiline from '@/components/tables/TableMultiline/TableMultiline.vue';

export default {
  name: 'Organization',
  components: {
    ControlUser,
    TableSpace,
    TableMultiline,
  },
  data() {
    return {
      listMultiRow: false,
      viewTable: 'body',
      propsTable: {
        fieldsTemplate: [
          [ '120',                'auto',  '120',   'auto',                '160',                 '160',                '200'  ],
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
        },
        body: {
          state: {
            getterData: 'GET_LIST_DATA',
            dispatchData: 'GET_LIST_DATA',
          },
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

    z-index: 999;
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
  .body {
    z-index: 100;
  }
}
</style>
