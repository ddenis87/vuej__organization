<template>
  <div class="about">
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