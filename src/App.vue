<template>
  <v-app class="app">
    <div class="app-header">
      <app-header></app-header>
    </div>
    <div class="app-body maxWidth">
      <router-view></router-view>
    </div>
    <!-- <div class="app-footer">
      <app-footer></app-footer>
    </div> -->
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
import AppHeader from '@/components/app/AppHeader';
import AppFooter from '@/components/app/AppFooter';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  computed: {
    loading() { return this.$store.getters.GET_STATUS_LOAD; }
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

  &-header { grid-area: app-header; }
  &-body {
    padding-left: 10px;
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
    width: 100%;
  }
  .block {
    position: absolute;
    top: 0px;
    left: 0px;
    display: none;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: .8;
    z-index: 888;
    &_show {
      display: flex;
    }
    &__progress {
      position: fixed;
      top: 10px;
      right: 20px;
    }
  }
}
</style>