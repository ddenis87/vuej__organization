<template>
  <div class="about">
  <div class="body-item">
    <table-multiline v-bind="propsTable"
                       v-if="listMultiRow">
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
          <div style="width: 100%; text-align: center; border-radius: 12px 0px 12px 0px; background-color: green; color: white;">{{ itemValue.itemValue }}</div>
        </template>
        <template #[`body.kpp`]="itemValue">
          <div style="width: 100%; text-align: center;">
            <v-chip color="blue">
              {{ itemValue.itemValue }}
            </v-chip>
          </div>
        </template>
        <template #footer>
          <div style="width: 100%; text-align: center;">I'm Footer</div>
        </template>
      </table-multiline>
    </div>
  </div>
</template>

<script>
import TableMultiline from '@/components/tables/TableMultiline/TableMultiline.vue';

export default {
  name: 'Demo',
  components: {
    TableMultiline,
  },
  data() {
    return {
      listMultiRow: true,
      viewTable: 'body',
      propsTable: {
        height: 500,
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
  created() {
    this.$store.dispatch('GET_LIST_OPTIONS');
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
}
</style>