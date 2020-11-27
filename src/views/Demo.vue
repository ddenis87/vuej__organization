<template>
  <div class="about">
    <div class="body-item">
    <br>
    <div class="table-scroll">
      <table-multiline v-bind="propsTable"
                 v-if="listMultiRow">
        <template #action="activeValue">
          <table-action :activeValue="activeValue"></table-action>
        </template>
        <template #[`header.bk`]="itemValue">
          <div style="width: 100%; text-align: center;">
            <v-chip color="yellow">{{ itemValue.itemValue }}</v-chip>
          </div>
        </template>
        <template #[`body.institution_code`]="itemValue">
          <div style="width: 100%; color: blue; text-align: right;">{{ itemValue.itemValue }}</div>
        </template>
        <template #[`body.bk`]="itemValue">
          <div style="color: green; font-weight: bold;">{{ itemValue.itemValue }}</div>
        </template>
        <template #[`body.title`]="itemValue">
          <div style="color: grey;">{{ itemValue.itemValue }}</div>
        </template>
        <template #[`body.inn`]="itemValue">
          <div style="width: 100%; text-align: center; border-radius: 15px 2px 15px 2px; background-color: green; color: white;">{{ itemValue.itemValue }}</div>
        </template>
        <!-- <template #[`body.kpp`]="itemValue"> -->
          <!-- <v-chip style="position: static;" color="blue">{{ itemValue.itemValue }}</v-chip> -->
          <!-- <div style="width: 100%; text-align: center; border-radius: 2px 10px 2px 10px; background-color: blue; color: white; padding: 5px">{{ itemValue.itemValue }}</div> -->
        <!-- </template> -->
        <template #footer>
          <div style="width: 100%; text-align: center;">I'm Footer</div>
        </template>
      </table-multiline>
    </div>
      
    </div>
   </div>
</template>

<script>
import TableMultiline from '@/components/tables/TableMultiline/TableMultiline.vue';
import TableUno from '@/components/tables/TableUno/TableUno.vue';

import TableAction from '@/components/tables/TableAction.vue';

export default {
  name: 'Demo',
  components: {
    TableMultiline,
    TableUno,
    TableAction,
  },
  data() {
    return {
      listMultiRow: true,
      propsTable: {
        activeField: 'title',
        container: {
          height: 500,
          width: 1340,
        },
        fieldsTemplate: [
          ['130',              'auto',  '120', 'auto','160',          '160',             'qwe',              'auto'  ],
          ['institution_code', 'title', 'inn', 'kpp', 'egrul_status', 'rubpnubp_status', 'institution_type', 'bk'  ],
        ],
        header: {
          state: {
            getterData: 'GET_LIST_FIELDS',
            dispatchInit: 'GET_LIST_OPTIONS',
          },
        },
        body: {
          height: 50,
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
.body-item {
  padding: 20px 10px;
    &__text {
      text-indent: 25px;
      text-align: justify;
    }
    &__images {
      height: 80px;
    }
  .table-scroll {
    width: 1200px;
    padding: 5px;
    border: 1px solid grey;
    overflow-x: scroll;
  }
}
</style>