<template>
  <v-card>
    <v-toolbar dark flat tile 
               color="blue darken-3">
      <v-list dense
              class="menu-main"
              color="blue darken-3">
        <v-list-item class="menu-main__item"
                     tag="router-link"
                     v-for="item in menuMain"
                     :key="item.link"
                     :to="item.link">{{ item.value }}</v-list-item>
      </v-list>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      menuMain: [
        {value: 'Домой', link: '/'},
        {value: 'Организации', link: '/Table/TableOrganisations'},
        {value: 'БК', link: '/Table/TableBudgetClassifications'},
        {value: 'Таблицы', link: '/Table/PageTable'},
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.menu-main {
  &__item {
    display: inline-flex;
  }
}
</style>