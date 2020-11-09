<template>
  <v-toolbar color="teal">
    <v-toolbar-items>
      <v-list dense color="teal">
        <v-list-item class="list" to="/" tag="router-link" dense color="white">Организации</v-list-item>
        <v-list-item class="list" to="/about" tag="router-link" dense color="white">Обо мне</v-list-item>
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