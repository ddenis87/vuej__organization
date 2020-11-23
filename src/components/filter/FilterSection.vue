<template>
  <v-form class="form-filter" ref="formFilter">
    <v-container>
      <v-row>
        <v-col v-for="(item, index) in listFilter" 
               :key="index" 
               cols="12"
               class="form-filter__item">
          <filter-item :item="item" 
                        v-model="valueSelect" 
                        @input="createStringFilter" 
                        @clear="clearStringFilter"></filter-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <filter-control @accept-filter="acceptFilter"
                          @reset-filter="resetFilter"></filter-control>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import FilterItem from '@/components/filter/FilterItem.vue'
import FilterControl from '@/components/filter/FilterControl.vue';

export default {
  name: 'FilterSection',
  components: {
    FilterItem,
    FilterControl,
  },
  computed: {
    listFilter() { return this.$store.getters.GET_LIST_FILTER; },
  },
  data() {
    return {
      valueSelect: {},
      filterProps: {},
    }
  },
  methods: {
    clearStringFilter(key) {
      delete this.filterProps[key];
    },
    createStringFilter() {
      Object.assign(this.filterProps, this.valueSelect);
    },
    resetFilter() {
      this.$refs.formFilter.reset();
      this.filterProps = {};
      this.$store.commit('SET_OPTIONS_REQUEST');
      this.actionFilter();
    },
    acceptFilter() {
      this.$store.commit('CLEAR_LIST_DATA');
      let optionRequest = {stringFilter: ''};
      
      for (let [key, value] of Object.entries(this.filterProps)) {
        optionRequest.stringFilter += `&${key}=${value}`;
      }
      this.$store.commit('SET_OPTIONS_REQUEST', optionRequest);
      this.actionFilter();
    },
    actionFilter() {
      this.$store.dispatch('GET_LIST_DATA');
      this.$emit('action-filter');
    },
  }
}
</script>

<style lang="scss" scoped>
.form-filter {
  &__item {
    padding: 0px;
  }
}
</style>