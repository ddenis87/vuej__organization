<template>
  <div class="control__user">
    <v-expansion-panels v-model="closeFilter">
      <v-expansion-panel>
        <v-expansion-panel-header>Фильтр</v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content>
          <filter-section @action-filter="() => closeFilter = !closeFilter"></filter-section>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- <v-expansion-panel>
        <v-expansion-panel-header>Сортировка</v-expansion-panel-header>
        <v-divider></v-divider>
        <v-expansion-panel-content class="block-dark">
          <sorting-section @accept-sorting="() => closeFilter = !closeFilter"></sorting-section>
        </v-expansion-panel-content>
      </v-expansion-panel> -->
    </v-expansion-panels>
  </div>
</template>

<script>
import FilterSection from '@/components/filter/FilterSection';
// import SortingSection from '../sorting/SortingSection.vue';

export default {
  name: 'ControlUser',
  components: {
    FilterSection,
    // SortingSection,
  },
  data() {
    return {
      closeFilter: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.control__user {
  height: 60px;
  align-items: center;
  width: 100%;
}
.block-dark { background-color: lightgrey; }
</style>