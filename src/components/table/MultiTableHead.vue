<template>
  <div class="header-grid">
    <div class="header-grid__item"
        v-for="(item, index) in listItem" 
        :key="index"
        :style="styleProps[index]"
        @click="sortedField(item.key)">
      {{ (item) ? item.label : '' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiTableHead',
  props: {
    listItem: {type: Array, default: []},
    listItemProps: {type: Object, default: {}},
  },
  computed: {
    styleProps() {
      let styles = [];
      for (let i = 0; i < this.listItemProps.items.length; i++) {
        let styleProps = '';
        if ('cols' in this.listItemProps.items[i]) {
          styleProps += ` grid-column-start: ${this.listItemProps.items[i].cols[0]}; grid-column-end: ${this.listItemProps.items[i].cols[1]}; `
        }
        if ('rows' in this.listItemProps.items[i]) {
          styleProps += ` grid-row-start: ${this.listItemProps.items[i].rows[0]}; grid-row-end: ${this.listItemProps.items[i].rows[1]}; `
        }
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
  box-shadow: 0px 3px 0px grey;
  &__item {
    padding: 5px 15px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.8rem;
    font-weight: bold;
  }
}
.header-grid {
  position: sticky;
  top: 0px;
  background-color: white;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 3px;
  box-shadow: 0px 3px 0px grey;
  
  &__item {
    padding: 5px 10px;
    border: 1px solid black;
    &:hover { cursor: pointer; }
  }
}
</style>