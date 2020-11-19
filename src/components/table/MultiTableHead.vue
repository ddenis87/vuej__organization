<template>
  <div class="header-grid" :style="stylePosition">
    <div class="header-grid__item" 
        v-for="(item, index) in listItem" 
        :key="index"
        :style="styleProps[index]">
      {{ (item) ? item.label : '' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiTableHead',
  props: {
    listItem: {type: Array, default: []},
    listItemProps: {type: Array, default: []},
  },
  computed: {
    stylePosition() {
      let stylePosition = '';
    },
    styleProps() {
      let styles = [];
      for (let i = 0; i < this.listItemProps.length; i++) {
        let styleProps = '';
        if ('cols' in this.listItemProps[i]) {
          styleProps += ` grid-column-start: ${this.listItemProps[i].cols[0]}; grid-column-end: ${this.listItemProps[i].cols[1]}; `
        }
        if ('rows' in this.listItemProps[i]) {
          styleProps += ` grid-row-start: ${this.listItemProps[i].rows[0]}; grid-row-end: ${this.listItemProps[i].rows[1]}; `
        }
        if ('align' in this.listItemProps[i]) styleProps += ` text-align: ${this.listItemProps[i].align}; `;
        if ('colorBackground' in this.listItemProps[i]) styleProps += ` background-color: ${this.listItemProps[i].colorBackground}; `;
        if ('colorText' in this.listItemProps[i]) styleProps += ` color: ${this.listItemProps[i].colorText}; `;
        styles.push(styleProps)
      }
      return styles;
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
  &__item { border: 1px solid black; padding: 5px 10px; }
}
</style>