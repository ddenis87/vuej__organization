<template>
  <v-app class="app">
    <div class="app-header">
      <app-header></app-header>
    </div>
    <div class="app-body">
      <router-view></router-view>
    </div>
    <div class="app-footer">

    </div>
  </v-app>
</template>

<script>
import AppHeader from '@/components/app/app__header';

export default {
  name: 'App',
  components: {
    AppHeader,
  },
};
</script>

<style lang="scss">
.app {
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-areas: "app-header" "app-body" "app-footer";
  grid-template-columns: 100%;
  grid-template-rows: 80px auto 80px;
  max-width: 1240px;
  width: 100%;
}
.bor {
  border: 2px solid green;
}
</style>