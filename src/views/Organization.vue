<template>
  <div class="organization" id="organization">
    <div class="organization__control">
      <control-user></control-user>
      <div class="control-view">
        <v-btn title="Переключить вид"
               fab
               dark
               small
               @click="() => {listMultiRow = !listMultiRow}">
          <v-icon> {{ (listMultiRow) ? 'mdi-format-list-bulleted' : 'mdi-view-stream'}}</v-icon>
        </v-btn>
      </div>
      
    </div>

    <div class="body-item">
      <div class="body-item__title">
        <h2>Организации</h2>
        <div></div>
      </div>
      <v-divider></v-divider>
      <div class="body-item__body">
        <table-multiline :table-properties="propsTableMultiline" v-if="listMultiRow">
          <template #[`body.institution_code`]="itemValue">
            <div style="width: 100%; text-align: right;">{{ itemValue.itemValue }}</div>
          </template>
          <template #action="activeValue">
            <table-action :activeValue="activeValue"></table-action>
          </template>
        </table-multiline>
        <table-uno :table-properties="propsTableUno" v-if="!listMultiRow">
          <template #[`body.institution_code`]="itemValue">
            <div style="width: 100%; text-align: right;">{{ itemValue.itemValue }}</div>
          </template>
          <template #action="activeValue">
            <table-action :activeValue="activeValue"></table-action>
          </template>
        </table-uno>
      </div>
    </div>

  </div>
</template>

<script>
import ControlUser from '@/components/control/ControlUser.vue';
import TableMultiline from '@/components/tables/TableMultiline/TableMultiline.vue';
import TableUno from '@/components/tables/TableUno/TableUno.vue';

import TableAction from '@/components/tables/TableAction.vue';

export default {
  name: 'Organization',
  components: {
    ControlUser,
    TableMultiline,
    TableUno,

    TableAction,
  },
  data() {
    return {
      listMultiRow: false,

      propsTableMultiline: {
        state: {
          progress: 'GET_STATUS_LOAD',
          init: 'GET_LIST_OPTIONS',
          header: {},
          body: {
            getData: 'GET_LIST_DATA',
            loadData: 'GET_LIST_DATA',
          },
        },
        activeField: 'id',
        fieldsTemplate: [
          [[80, 80],                 ['400',],      [115, 115], [140, 140],         [170,170],           ['200', 200],         [180, 180] ],
          ['institution_code', 'title',      'inn',       'egrul_status',     'industry_typing',   'budget_level',  'bk'    ],
          ['institution_code', 'title',      'kpp',       'rubpnubp_status',  'institution_type',  'budget_level',  'bk'    ]
        ],
        fieldsFixed: ['institution_code', 'title'],
        header: {
          state: {
            getterData: 'GET_LIST_FIELDS',
            dispatchInit: 'GET_LIST_OPTIONS',
          },
        },
        body: {
          height: 25,
          state: {
            getterData: 'GET_LIST_DATA',
            dispatchData: 'GET_LIST_DATA',
          },
        }
      },

      propsTableUno: {
        state: {
          progress: 'GET_STATUS_LOAD',
          init: 'GET_LIST_OPTIONS',
          header: {},
          body: {
            getData: 'GET_LIST_DATA',
            loadData: 'GET_LIST_DATA',
          },
        },
        activeField: 'id',
        fieldsTemplate: [
          [[80, 80],          ['400',],[115, 115],[115, 115],    [140, 140],       [140, 140],       [120,120],        [130,130],         [180, 180],  [180, 180]],
          ['institution_code','title', 'inn',     'kpp',         'egrul_status',   'rubpnubp_status','industry_typing','institution_type','budget_level','bk']
        ],
        fieldsFixed: ['institution_code', 'title'],
        header: {
          state: {
            getterData: 'GET_LIST_FIELDS',
            dispatchInit: 'GET_LIST_OPTIONS',
          },
        },
        body: {
          height: 25,
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
.organization {
  width: 100%;
  padding: 0px 10px;
  a { text-decoration: none; }
  &__control {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px;
    height: 55px;
    z-index: 999;
    .control-view {
      margin: 0px 10px;
    }
  }
  .body-item {
    color: rgba(0,0,0,.87);
    border-radius: 4px;
    border: thin solid rgba(0,0,0,.12);
    overflow: hidden;
    z-index: 888;
    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px;
    }
    &__body {
      height: calc(100vh - 200px);
      padding: 10px;
    }
  }
}
</style>
