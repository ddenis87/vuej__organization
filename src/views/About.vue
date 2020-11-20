<template>
  <div class="about">
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
    <div class="body-item">
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
export default {
  name: 'About',
  data () {
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
            name: 'Frozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt loremFrozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt lorem Frozen Yogurt lorems',
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
      }
    },
}
</script>

<style lang="scss" scoped>
.body-item {
    &__text {
      text-indent: 25px;
      text-align: justify;
    }
    &__images {
      height: 80px;
    }
}
</style>