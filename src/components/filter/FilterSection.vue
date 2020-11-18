<template>
  <v-form class="form-filter" ref="formFilter">
    <v-container>
      <v-row>
        <v-col v-for="(item, index) in listFilter" 
               :key="index" cols="12" 
               class="select-item">
          <filter-item-select :item="item" v-model="valueSelect" @input="createStringFilter"></filter-item-select>
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
import FilterItemSelect from '@/components/filter/FilterItemSelect.vue'
import FilterControl from '@/components/filter/FilterControl.vue';

export default {
  name: 'FilterSection',
  components: {
    FilterItemSelect,
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
      let optionRequest = {stringFilter: ''};
      for (let [key, value] of Object.entries(this.filterProps)) {
        optionRequest.stringFilter += `&${key}=${value}`;
      }
      this.$store.commit('SET_OPTIONS_REQUEST', optionRequest);
      this.actionFilter();
    },
    actionFilter() {
      this.$store.commit('CLEAR_LIST_DATA');
      this.$store.dispatch('GET_LIST_DATA');
      this.$emit('action-filter');
    },
  }
}
</script>