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

      <table-uno v-bind="propsTableUno" 
                   v-if="!listMultiRow">
        <template #[`body.institution_code`]="itemValue">
          <div style="width: 100%; text-align: right;">{{ itemValue.itemValue }}</div>
        </template>
        <template #[`body.kpp`]="itemValue">
          <div style="width: 100%; text-align: center; border-radius: 10px 2px 10px 2px; background-color: green; color: white;">{{ itemValue.itemValue }}</div>
        </template>
        <template #footer>
          <div style="width: 100%; text-align: center;">I'm Footer</div>
        </template>
      </table-uno>

      <table-multiline v-bind="propsTable"
                       v-if="listMultiRow">
        <template #[`body.institution_code`]="itemValue">
          <div style="width: 100%; text-align: right;">{{ itemValue.itemValue }}</div>
        </template>
      </table-multiline>

    </div>
  </div>
</template>

<script>
import ControlUser from '@/components/control/ControlUser.vue';
import TableUno from '@/components/tables/TableUno/TableUno.vue';
import TableMultiline from '@/components/tables/TableMultiline/TableMultiline.vue';

export default {
  name: 'Organization',
  components: {
    ControlUser,
    TableUno,
    TableMultiline,
  },
  data() {
    return {
      listMultiRow: false,
      propsTableUno: {
        // container: {
        //   height: 500,
        //   width: 1200,
        // },
        fieldsTemplate: [
          ['130',              'auto',  '120', 'auto','160',          '160',             'qwe',              'dsf',             'asd',          '200'  ],
          ['institution_code', 'title', 'inn', 'kpp', 'egrul_status', 'rubpnubp_status', 'institution_type', 'industry_typing', 'budget_level', 'bk'  ],
        ],
        header: {
          state: {
            getterData: 'GET_LIST_FIELDS',
            getterSortedProps: 'GET_LIST_SORTED_PROPS',
            commitSorted: 'SET_LIST_DATA_SORTED',
            commitSortedProps: 'SET_LIST_SORTED_PROPS',
            dispatchInit: 'GET_LIST_OPTIONS',
          },
        },
        body: {
          state: {
            getterData: 'GET_LIST_DATA',
            dispatchData: 'GET_LIST_DATA',
          },
        }
      },

      propsTable: {
        fieldsTemplate: [
          [ '130',                'auto',  '120',   '200',                '160',                 '160',                'auto'  ],
          ['institution_code', 'title', 'inn', 'egrul_status',     'industry_typing',   'budget_level',     'bk'  ],
          ['institution_code', 'title', 'kpp', 'rubpnubp_status',  'institution_type',  'budget_level',     'bk'  ]
        ],
        header: {
          state: {
            getterData: 'GET_LIST_FIELDS',
            getterSortedProps: 'GET_LIST_SORTED_PROPS',
            commitSorted: 'SET_LIST_DATA_SORTED',
            commitSortedProps: 'SET_LIST_SORTED_PROPS',
            dispatchInit: 'GET_LIST_OPTIONS',
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
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  .control {
    position: relative;
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
    position: relative;
    z-index: 100;
    margin-bottom: 20px;
  }
}
</style>
