<template>
  <div class="organization" id="organization">
    <div class="organization-control">
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

    <div class="organization-body">
      <div class="body-item">
        <div class="body-item__title" v-if="listMultiRow">
          <div>
            <h5>Component: Table-multiline</h5>
          </div>
          <div>
            <h6>Template: ['institution_code', 'title',      'inn',       'egrul_status',     'industry_typing',   'budget_level',  'bk'    ]</h6>
            <h6>['institution_code', 'title',      'kpp',       'rubpnubp_status',  'institution_type',  'budget_level',  'bk'    ]</h6>
          </div>
        </div>
         <div class="body-item__title" v-if="!listMultiRow">
          <div>
            <h5>Component: Table-uno</h5>
          </div>
          <div>
            <h6>Template: ['institution_code', 'title', 'inn',     'kpp',         'egrul_status',   'rubpnubp_status', 'industry_typing', 'institution_type', 'budget_level', 'bk']</h6>
          </div>
        </div>

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
          [[90, 90],          ['400',],[115, 115],[115, 115],    [140, 140],       [140, 140],       [120,120],        [130,130],         [180, 180],  [180, 180]],
          ['institution_code','title', 'inn',     'kpp',         'egrul_status',   'rubpnubp_status','industry_typing','institution_type','budget_level','bk']
        ],
        fieldsFixed: ['institution_code', 'title'],
        countRowBody: 2,
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
  min-height: 100%;
  display: grid;
  grid-template-areas: "organization-control" "organization-body";
  grid-template-columns: 100%;
  grid-template-rows: 55px 100vh;
  width: 100%;
  box-sizing: border-box;
  &-control {
    grid-area: organization-control;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    .control-view {
      margin: 0px 10px;
    }
  }

  &-body {
    max-height: calc(100% - 130px);
    grid-area: organization-body;
    padding: 3px;

    .body-item {
      color: rgba(0,0,0,.87);
      border-radius: 4px;
      border: thin solid rgba(0,0,0,.12);
      overflow: hidden;

      &__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px;
      }
      &__body {
        height: calc(100vh - 170px);
        padding: 10px;
      }
    }
    // .body-item {
    //   max-height: 100%;
    //   display: grid;
    //   grid-template-areas: "body-item__title" "body-item__body";
    //   grid-template-columns: 100%;
    //   grid-template-rows: 56px 100%;
    //   border: thin solid rgba(0,0,0,.12);
    //   border-radius: 4px;
    //   overflow: hidden;
    //   &__title {
    //     padding: 0px 10px;
    //     grid-area: body-item__title;
    //     overflow: hidden;
    //     border-bottom: thin solid rgba(0,0,0,.12);
    //   }
    //   &__body {
    //     max-height: calc(100vh - 198px);
    //     padding: 10px;
    //     grid-area: body-item__body;
    //   }
    // }
  }
}
</style>
