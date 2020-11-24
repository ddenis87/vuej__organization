<template>
  <v-app class="app">
    <div class="app-header maxWidth">
      <app-header></app-header>
    </div>
    <div class="app-body maxWidth">
      <router-view></router-view>
    </div>
    <app-lock></app-lock>
    <app-button-up></app-button-up>
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
.app {
  position: relative;
  display: grid;
  grid-template-areas: "app-header" "app-body" "app-footer";
  grid-template-columns: 100%;
  grid-template-rows: 80px auto 80px;
  width: 100%;

  &-header { grid-area: app-header; width: 100%; }
  &-body {
    padding: 0px 10px;
    grid-area: app-body;
    min-height: calc(100vh - 160px);
    height: 100%;
    box-sizing: border-box;
  }
  &-footer { grid-area: app-footer; }

  .maxWidth {
    margin-left: auto;
    margin-right: auto;
    max-width: 2560px;
    min-width: 1240px;
    width: 100%;
  }
}
</style>