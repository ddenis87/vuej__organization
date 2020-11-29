<template>
  <v-app class="app">
    <div class="app-header maxWidth">
      <app-header></app-header>
    </div>
    <div class="app-body maxWidth">
      <router-view></router-view>
    </div>
    <!-- <app-lock></app-lock>
    <app-button-up class="button-up"></app-button-up> -->
  </v-app>
</template>

<script>
import AppHeader from '@/components/app/AppHeader';
import AppLock from '@/components/app/AppLock';
import AppButtonUp from '@/components/app/AppButtonUp';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppLock,
    AppButtonUp
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
.app {
  // position: relative;
  display: grid;
  grid-template-areas: "app-header" "app-body";
  grid-template-columns: 100%;
  grid-template-rows: 80px 1fr;
  width: 100%;
  .button-up {
    z-index: 999;
  }
  &-header { grid-area: app-header; }
  &-body {
    // position: relative;
    padding: 10px 10px;
    grid-area: app-body;
    min-height: calc(100vh - 70px);
    
    box-sizing: border-box;
    // border: 1px solid grey;
  }
  &-footer { grid-area: app-footer; }

  .maxWidth {
    margin-left: auto;
    margin-right: auto;
    // max-width: 2560px;
    // min-width: 1240px;
    width: 100%;
  }
}
</style>