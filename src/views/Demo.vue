<template>
  <div class="about">
    <div class="body-item">
      <table-uno v-bind="propsTable"
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
          <div style="width: 100%; text-align: center; border-radius: 15px 2px 15px 2px; background-color: green; color: white;">{{ itemValue.itemValue }}</div>
        </template>
        <template #[`body.kpp`]="itemValue">
          <v-chip style="position: static;" color="blue">{{ itemValue.itemValue }}</v-chip>
          <!-- <div style="width: 100%; text-align: center; border-radius: 2px 15px 2px 15px; background-color: blue; color: white;">{{ itemValue.itemValue }}</div> -->
        </template>
        <template #footer>
          <div style="width: 100%; text-align: center;">I'm Footer</div>
        </template>
      </table-uno>
    </div>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quod mollitia totam. Velit harum eveniet impedit. Laborum, explicabo sapiente labore, inventore quibusdam sed obcaecati libero vel nostrum adipisci ad. Dolorum?</p>
  </div>
</template>

<script>
import TableMultiline from '@/components/tables/TableMultiline/TableMultiline.vue';
import TableUno from '@/components/tables/TableUno/TableUno.vue';

export default {
  name: 'Demo',
  components: {
    TableMultiline,
    TableUno,
  },
  data() {
    return {
      listMultiRow: true,
      propsTable: {
        container: {
          height: 500,
          width: 1200,
        },
        fieldsTemplate: [
          [ '90',              'auto',  '120', 'auto',             '160',               '160',              '200' ],
          ['institution_code', 'title', 'inn', 'egrul_status',     'industry_typing',   'budget_level',     'bk'  ],
          ['institution_code', 'title', 'kpp', 'rubpnubp_status',  'institution_type',  'budget_level',     'bk'  ]
        ],
        header: {
          state: {
            getterData: 'GET_LIST_FIELDS',
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