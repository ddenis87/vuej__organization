<template>
  <thead class="header">
    <tr class="header__row">
      <th class="header__col" 
          v-for="(item, index) in listData" 
          :key="index" 
          :style="styleProps[index]"
          @click="sortedField(item.key)">{{ (item) ? item.label : '' }}</th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'TableHaed',
  props: {
    listData: Array,
    listDataProps: Object,
  },
  computed: {
    styleProps() {
      let styles = [];
      for (let i = 0; i < this.listDataProps.items.length; i++) {
        let styleProps = '';
        if ('width' in this.listDataProps.items[i]) styleProps += ` width: ${this.listDataProps.items[i].width}px; `;
        if ('align' in this.listDataProps.items[i]) styleProps += ` text-align: ${this.listDataProps.items[i].align}; `;
        if ('colorBackground' in this.listDataProps.items[i]) styleProps += ` background-color: ${this.listDataProps.items[i].colorBackground}; `;
        if ('colorText' in this.listDataProps.items[i]) styleProps += ` color: ${this.listDataProps.items[i].colorText}; `;
        styles.push(styleProps)
      }
      return styles;
    },
  },
  methods: {
    sortedField(key) {
      console.log(key);
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
  background-color: white;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.12);
  &__col {
    justify-content: flex-start;
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