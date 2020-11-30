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
        <table-multi :table-properties="propsTable">
          <template #[`body.institution_code`]="itemValue">
            <div style="width: 100%; text-align: right;">{{ itemValue.itemValue }}</div>
          </template>
          <template #action="activeValue">
            <table-action :activeValue="activeValue"></table-action>
          </template>
        </table-multi>
      </div>
    </div>

  </div>
</template>

<script>
import ControlUser from '@/components/control/ControlUser.vue';
import TableUno from '@/components/tables/TableUno/TableUno.vue';
import TableMultiline from '@/components/tables/TableMultiline/TableMultiline.vue';
import TableMulti from '@/components/tables/TableMulti/TableMulti.vue';

import TableAction from '@/components/tables/TableAction.vue';
import TableOverflow from '../components/tables/TableOverflow.vue';

export default {
  name: 'Organization',
  components: {
    ControlUser,
    TableUno,
    TableMultiline,
    TableMulti,
    TableAction,
    
    TableOverflow,
  },
  data() {
    return {
      longString: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias dolor itaque voluptate ea sunt ab, alias placeat voluptates impedit dolore sapiente esse necessitatibus doloribus provident unde numquam, quibusdam nesciunt nulla.',
      listMultiRow: true,

      propsTable: {
        state: {
          progress: 'GET_STATUS_LOAD',
          header: {},
          body: {},
        },
        activeField: 'id',
        fieldsTemplate: [
          // [ '105',             'qwe',  '120', '160',              '180',               '150',           '180'  ],
          [95,                 ['300', ''],  [120, 160],  [200],              ['160',200],         ['150', 200],         ['180'] ],
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
