<template>
  <v-app class="app">
    <div class="app-header maxWidth">
      <app-header></app-header>
    </div>
    <div class="app-body maxWidth">
      <component :is="layout">
        <router-view></router-view>
      </component>
    </div>
  </v-app>
</template>

<script>
import AppHeader from '@/components/app/AppHeader';

import LayoutMain from '@/layout/LayoutMain.vue';
import LayoutCatalog from '@/layout/LayoutCatalog.vue';
import LayoutTables from '@/layout/LayoutTables.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    LayoutMain,
    LayoutCatalog,
    LayoutTables,
  },
  computed: {
    layout() { return 'Layout' + (this.$route.meta.layout || 'Main') },
  },
};
</script>

<style lang="scss">
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
  grid-template-columns: 100%;
  grid-template-rows: 80px 1fr 60px;
  max-width: 100%;
  width: 100%;
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
    width: 100%;
  }
}
.tooltip-text {
  display: block;
  padding: 2px 6px;
  width: 100%;
  height: 100%;
  border: thin solid rgba(0, 0, 0, .87);
  border-radius: 4px;
  font-size: .875rem;
  color: rgba(0, 0, 0, .87);
}
</style>