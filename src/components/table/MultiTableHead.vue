<template>
  <div class="header-grid" :style="stylePosition">
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
    propsArea: Array,
  },
  computed: {
    stylePosition() {
      let stylePosition = 'grid-template-columns:';
      for (let i = 0; i < this.propsArea[1].length; i++) stylePosition += ` ${(this.propsArea[0][i]) ? `${this.propsArea[0][i]}px` : 'auto'}`;
      stylePosition += `; `;
      stylePosition += 'grid-template-areas:';
      for (let i = 1; i < this.propsArea.length; i++) stylePosition += ` "${this.propsArea[i].join(' ')}"`;
      stylePosition += `; `;
      console.log(stylePosition);
      return stylePosition;
    },
    styleProps() {
      let styles = [];
      for (let i = 0; i < this.listItemProps.items.length; i++) {
        let styleProps = '';
        styleProps += `grid-area: ${this.listItemProps.items[i].name}; `;
        
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
  
  // grid-template-rows: repeat(2, 1fr);
  // grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  grid-template-columns: auto;
  // grid-gap: 3px;
  box-shadow: 0px 3px 0px grey;
  
  &__item {
    padding: 5px 10px;
    // border: 1px solid black;
    &:hover { cursor: pointer; }
  }
}
</style>