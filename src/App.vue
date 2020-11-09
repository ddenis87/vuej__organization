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
    <div class="block" :class="{'block_show': loading}" tabindex="-1">
      <div class="block__progress">
        <v-progress-circular :size="40"
                             :width="5"
                             color="primary"
                             indeterminate></v-progress-circular>
      </div>
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
  computed: {
    loading() { return this.$store.getters.GET_STATUS_LOAD; }
  },
};
</script>

<style lang="scss">
.app {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-areas: "app-header" "app-body" "app-footer";
  grid-template-columns: 100%;
  grid-template-rows: 80px auto 80px;
  max-width: 1240px;
  width: 100%;

  .block {
    position: absolute;
    top: 0px;
    left: 0px;
    display: none;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: .7;
    z-index: 888;
    &_show {
      display: flex;
    }
    &__progress {
      position: fixed;
      top: 15px;
      right: 20px;
    }
  }
}
.bor {
  border: 2px solid green;
}
</style>