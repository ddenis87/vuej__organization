<template>
  <div class="header-grid" :style="listStyleLocation">
    <div class="header-grid__item" 
        v-for="(item, index) in listData" 
        :key="index"
        :style="styleItems[index]"
        @click="sortedField(item.key)">
      {{ (item) ? item.label : '' }}
    </div>
  </div>
</template>

<script>
import { TABLE_SPACE_MULTI_ROW } from './TableSpaceMultiRow.js';
export default {
  name: 'TableSpaceMultiRowHead',
  mixins: [
    TABLE_SPACE_MULTI_ROW,
  ],
  props: {
    listData: Array,
    listDataProps: Object,
    listStyleLocation: String,
  },
  methods: {
    sortedField(key) {
      this.$store.commit(this.listDataProps.state.commitSortedProps, {key: key, type: !this.$store.getters[this.listDataProps.state.getterSortedProps].type})
      this.$store.commit(this.listDataProps.state.commitSorted);
      console.log(key);
    },
  },
}
</script>

<style lang="scss" scoped>
.header-grid {
  position: sticky;
  top: 0px;
  padding: 10px 0px;
  background-color: #FAFAFA;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 10px;
    font-family: "Roboto", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    &:hover { cursor: pointer; }
  }
}
</style>