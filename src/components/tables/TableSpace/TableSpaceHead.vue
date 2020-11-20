<template>
  <thead class="header">
    <tr class="header__row">
      <th class="header__col" 
          v-for="(item, index) in listData" 
          :key="index" 
          :style="styleItems[index]"
          @click="sortedField(item.key)">{{ (item) ? item.label : '' }}</th>
    </tr>
  </thead>
</template>

<script>
import { TABLE_SPACE } from './TableSpace.js';

export default {
  name: 'TableHaed',
  mixins: [
    TABLE_SPACE,
  ],
  props: {
    listData: Array,
    listDataProps: Object,
  },
  methods: {
    sortedField(key) {
      this.$store.commit(this.listDataProps.state.commitSortedProps, {key: key, type: !this.$store.getters[this.listDataProps.state.getterSortedProps].type})
      this.$store.commit(this.listDataProps.state.commitSorted);
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0px;
  &__col {
    position: sticky;
    top: 0px;
    background-color: #FAFAFA;
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.12);
    text-align: start;
    align-items: center;
    padding: 20px 10px;
    font-family: "Roboto", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    &:hover { cursor: pointer; }
  }
}
</style>