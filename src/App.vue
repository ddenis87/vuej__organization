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
// @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

html, body {
  overflow-y: hidden;
  height: 100%;
  box-sizing: border-box;
  a { text-decoration: none; }
}
.app {
  display: grid;
  min-height: 100%;
  grid-template-areas: "app-header" "app-body";
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr 60px;
  .button-up {
    z-index: 999;
  }
  &-header { 
    grid-area: app-header;
    
  }
  &-body {
    grid-area: app-body;
    border: thin solid purple;
    height: 100%;
    padding: 3px;
  }

  .maxWidth {
    // margin-left: auto;
    // margin-right: auto;
    width: 100%;
  }
  .tooltip-body {
    max-width: 400px;
    color:rgba(0, 0, 0, .87);
    border: thin solid rgba(0,0,0,.3);
    border-radius: 10px;
    box-shadow: 2px 2px 4px 0px rgba(0,0,0,.12);
    background-color: white;
    padding: 6px;
    opacity: 1;
  }
}
</style>