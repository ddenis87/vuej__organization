<template>
  <div class="home" id="home">
    <h2>Организации</h2>

    <div class="home-body">
      <v-divider></v-divider>
      <br>
      <div class="body-item">
        <div class="body-item__title">
          <a href="#"><v-btn icon><v-icon>mdi-github</v-icon></v-btn></a>
        </div>
        <v-divider></v-divider>
        <div class="body-item__body">
          <table-multi :table-properties="propsTable">
            <template #[`body.institution_code`]="itemValue">
              <span style="width: 100%; text-align: right;">{{ itemValue.itemValue }}</span>
            </template>
            <template #action="activeValue">
              <table-action :activeValue="activeValue"></table-action>
            </template>
          </table-multi>
        </div>
      </div>
    </div>


    <!-- <div class="control" v-if="false">
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
    <div class="home-body" v-if="false">
      <table-multiline v-bind="propsTable"
                       v-if="listMultiRow">
        <template #action="activeValue">
          <table-action :activeValue="activeValue"></table-action>
        </template>
      </table-multiline>
    </div> -->
  </div>
</template>

<script>
import ControlUser from '@/components/control/ControlUser.vue';
import TableUno from '@/components/tables/TableUno/TableUno.vue';
import TableMultiline from '@/components/tables/TableMultiline/TableMultiline.vue';
import TableMulti from '@/components/tables/TableMulti/TableMulti.vue';

import TableAction from '@/components/tables/TableAction.vue';

export default {
  name: 'Organization',
  components: {
    ControlUser,
    TableUno,
    TableMultiline,
    TableMulti,
    TableAction
  },
  data() {
    return {
      listMultiRow: true,
      propsTableUno: {
        activeField: 'title',
        // container: {
        //   height: 500,
        //   width: 1200,
        // },
        fieldsTemplate: [
          ['130',              'auto',  '120', 'auto','160',          '160',             'qwe',              '550'  ],
          ['institution_code', 'title', 'inn', 'kpp', 'egrul_status', 'rubpnubp_status', 'institution_type', 'bk'  ],
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
          height: 30,
          state: {
            getterData: 'GET_LIST_DATA',
            dispatchData: 'GET_LIST_DATA',
          },
        }
      },

      propsTable: {
        activeField: 'id',
        fieldsTemplate: [
          [ '100',             'auto',  '120', '150',              '180',               '150',           'df'  ],
          ['institution_code', 'title', 'inn', 'egrul_status',     'industry_typing',   'budget_level',  'bk'    ],
          ['institution_code', 'title', 'kpp', 'rubpnubp_status',  'institution_type',  'budget_level',  'bk'    ]
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
.home {
  // position: relative;
  width: 100%;
  // height: calc(100vh - 90px);
  // padding: 10px 10px;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  // border: thin solid red;
  // overflow: hidden;
  // .control {
  //   // position: relative;
  //   display: flex;
    
  //   justify-content: space-between;
  //   align-items: center;
  //   height: 60px;
  //   margin-bottom: 10px;
  //   // z-index: 888;
  //   // &__item { z-index: 999; }
  //   &__btn {
  //     display: flex;
  //     justify-content: flex-end;
  //     width: 60px;
  //     // z-index: 999;
  //   }
  //   &-view {
  //     padding: 10px;
  //     border: 1px solid green;
  //     &__text { padding: 0; margin: 0; }
  //   }
  // }
  &-body {
    .body-item {
      a { text-decoration: none; }
      display: flex;
      flex-direction: column;
      // margin-bottom: 20px;
      // height: 500px;
      margin: 0;
      color: rgba(0,0,0,.87);
      background-color: #fff;
      border-radius: 4px;
      border: thin solid rgba(0,0,0,.12);
      box-sizing: border-box;
      &__title {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 8px;
      }
      &__body {
// margin: 5px;
        padding: 16px;
        color: rgba(0,0,0,.87);

        height: 450px;
        // border: thin solid grey;
        box-sizing: border-box;
      }
    }

    // .body__over {
    //   border: 1px solid red;
    //   width: 400px;
    //   height: 100px;
    //   padding: 10px;
    // }
  }
}
</style>
