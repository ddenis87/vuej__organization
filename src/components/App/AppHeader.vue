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
                     :to="item.link" :disabled="item.disabled">{{ item.value }}</v-list-item>
      </v-list>
      <v-toolbar-title>I'm work!</v-toolbar-title>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      menuMain: [
        {value: 'Домой', link: '/', disabled: false},
        // {value: 'Организации', link: '/Table/TableOrganisations', disabled: false},
        // {value: 'БК', link: '/Table/TableBudgetClassifications', disabled: false},
        {value: 'Таблицы', link: '/Table/PageTable', disabled: false},
        {value: 'Документы', link: '/Document/PageDocument', disabled: true},
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