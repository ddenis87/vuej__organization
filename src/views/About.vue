<template>
  <div class="about">
  <div class="body-item">
    <table-multiline v-bind="propsTable"
                       v-if="listMultiRow">

        <template #[`body.institution_code`]="itemValue">
          <div style="width: 100%; color: blue; text-align: right;">{{ itemValue.itemValue }}</div>
        </template>
        <template #[`body.bk`]="itemValue">
          <div style="color: green; font-weight: bold;">{{ itemValue.itemValue }}</div>
        </template>
        <template #[`body.title`]="itemValue">
          <div style="color: grey;">{{ itemValue.itemValue }}</div>
        </template>
      </table-multiline>


    
      <h2>Обо мне (и о тестовом задании)</h2>
      <p class="body-item__text">Привет, меня зовут Денис Донцов мне {{ (new Date().getFullYear() - new Date('10/03/1987').getFullYear()) }}, и я занимаюсь Frontend разработкой. Сейчас я работаю в сфере защиты информации попутно разрабатывая и внедряя 
          небольшие решения для автоматизации рабочих процессов.</p>
      <v-list>
        <v-list-item>Email: d.denis87@mail.ru</v-list-item>
        <v-list-item>тел: +7 909 816 12 68 (он же WhatsApp, Telegram)</v-list-item>
        <v-list-item>Ссылка на портфолио:<a href="https://ddenis87.github.io/vue__portfolio/" target="_blank" >https://ddenis87.github.io/vue__portfolio/</a></v-list-item>
        <v-list-item>Ссылка на Github:<a href="https://github.com/ddenis87" target="_blank" >https://github.com/ddenis87</a></v-list-item>
      </v-list>
      <p>Что касаемо тестового задания:</p>
      <p>1. Сервер не отдает напрямую данные, приходиться использовать сторонний сервер для обхода блокировки CORS запроса:</p>
      <img class="body-item__images" src="@/assets/images/cors.png">
      <p>2. При попытке получить данные методом OPTIONS выдает ошибку:</p>
      <img class="body-item__images" src="@/assets/images/options.png">
      <p>в связи с чем не возможно получить списки для фильтров и наименования полей таблицы. Данную информацию пришлось ввести статично в store.
        Если сервер будет отдавать данные, то достаточно будет изменить только store.</p>
    </div>
    
  </div>
</template>

<script>
import TableMultiline from '@/components/tables/TableMultiline/TableMultiline.vue';

export default {
  name: 'About',
  components: {
    TableMultiline,
  },
  data() {
    return {
      listMultiRow: true,
      viewTable: 'body',
      propsTable: {
        height: 500,
        fieldsTemplate: [  // only multirow table
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