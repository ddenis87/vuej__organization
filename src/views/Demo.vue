<template>
  <div class="organization" id="organization">
    <h2 class="organization__title">Организации</h2>
    <div class="organization__control">

    </div>

    <div class="body-item">
      <div class="body-item__title">
        <a href="#"><v-btn icon><v-icon>mdi-github</v-icon></v-btn></a>
      </div>
      <v-divider></v-divider>
      <div class="body-item__body">
        <table-multiline :table-properties="propsTable">
          <template #[`body.institution_code`]="itemValue">
            <div style="width: 100%; text-align: right;">{{ itemValue.itemValue }}</div>
          </template>
          <template #action="activeValue">
            <table-action :activeValue="activeValue"></table-action>
          </template>
        </table-multiline>
      </div>
    </div>

  </div>
</template>

<script>
import TableMultiline from '@/components/tables/TableMultiline/TableMultiline.vue';

import TableAction from '@/components/tables/TableAction.vue';

export default {
  name: 'Demo',
  components: {
    TableMultiline,
    TableAction,
  },
  data() {
    return {
      propsTable: {
        state: {
          progress: 'GET_STATUS_LOAD',
          header: {},
          body: {},
        },
        activeField: 'id',
        fieldsTemplate: [
          [[80, 80],          ['400',],[115, 115],[115, 115],    [140, 140],       [140, 140],       [120,120],        [130,130],         [180, 180],  [180, 180]],
          ['institution_code','title', 'inn',     'kpp',         'egrul_status',   'rubpnubp_status','industry_typing','institution_type','budget_level','bk']
        ],
        // fieldsTemplate: [
        //   // [ '105',             'qwe',  '120', '160',              '180',               '150',           '180'  ],
        //   [[80, 80],                 ['400',],      [115, 115], [140, 140],         [170,170],           ['200', 200],         [180, 180] ],
        //   ['institution_code', 'title',      'inn',       'egrul_status',     'industry_typing',   'budget_level',  'bk'    ],
        //   ['institution_code', 'title',      'kpp',       'rubpnubp_status',  'institution_type',  'budget_level',  'bk'    ]
        // ],
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
  font-family: Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  a { text-decoration: none; }

  .body-item {
    color: rgba(0,0,0,.87);
    border-radius: 4px;
    border: thin solid rgba(0,0,0,.12);
    overflow: hidden;

    &__title {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 8px;
    }
    &__body {
      height: calc(100vh - 170px);
      padding: 10px;
    }
  }
}
</style>