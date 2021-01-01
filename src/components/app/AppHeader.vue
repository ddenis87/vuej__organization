<template>
  <v-toolbar color="teal">
    <v-toolbar-items>
      <v-list dense color="teal">
        <v-list-item class="list" to="/Table/TableOrganisations" tag="router-link" dense color="white">Организации</v-list-item>
        <!-- <v-list-item class="list" to="/TableForm/TableFormOrganisations" tag="router-link" dense color="white">Организации</v-list-item> -->
        <v-list-item class="list" to="/Table/TableBudgetClassifications" tag="router-link" dense color="white">БК</v-list-item>
        <!-- <v-list-item class="list" to="/Register/Test" tag="router-link" dense color="white">TEST</v-list-item> -->
      </v-list>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>

<style lang="scss" scoped>
.list {
  display: inline-flex;
  align-items: center;
}
</style>