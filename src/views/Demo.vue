<template>
  <div class="about">
    <div class="body-item">
      <v-data-table :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"></v-data-table>

    <br>
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
      headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
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