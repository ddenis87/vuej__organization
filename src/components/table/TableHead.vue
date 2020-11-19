<template>
  <thead class="header">
    <tr class="header__row">
      <th class="header__col" 
          v-for="(item, index) in listItem" 
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
    listItem: {type: Array, default: []},
    listItemProps: {type: Object, default: {}},
  },
  computed: {
    styleProps() {
      let styles = [];
      for (let i = 0; i < this.listItemProps.items.length; i++) {
        let styleProps = '';
        if ('width' in this.listItemProps.items[i]) styleProps += ` width: ${this.listItemProps.items[i].width}px; `;
        if ('align' in this.listItemProps.items[i]) styleProps += ` text-align: ${this.listItemProps.items[i].align}; `;
        if ('colorBackground' in this.listItemProps.items[i]) styleProps += ` background-color: ${this.listItemProps.items[i].colorBackground}; `;
        if ('colorText' in this.listItemProps.items[i]) styleProps += ` color: ${this.listItemProps.items[i].colorText}; `;
        styles.push(styleProps)
      }
      return styles;
    },
  },
  methods: {
    sortedField(key) {
      console.log(key);
      this.$store.commit(this.listItemProps.state.commitSortedProps, {key: key, type: !this.$store.getters[this.listItemProps.state.getterSortedProps].type})
      this.$store.commit(this.listItemProps.state.commitSorted);
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  padding-top: 10px;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.8rem;
  &__col {
    position: sticky;
    top: 0px;
    height: 80px;
    width: auto;
    padding: 5px 15px;
    background-color: white;
    box-shadow: 0px 3px 0px grey;
    &:hover { cursor: pointer; }
  }
}
</style>