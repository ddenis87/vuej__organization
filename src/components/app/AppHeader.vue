<template>
  <v-toolbar color="teal">
    <v-toolbar-items>
      <v-list dense color="teal">
        <v-list-item class="list" to="/Register/Organization" tag="router-link" dense color="white">Организации</v-list-item>
        <v-list-item class="list" to="/Catalog/Bk" tag="router-link" dense color="white">БК</v-list-item>
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