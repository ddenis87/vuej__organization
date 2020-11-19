<template>
  <div class="body">          
    <div class="body-grid__item"
          v-for="(itemI, indexI) in listItem" 
          :key="indexI">
      <div class="body-grid__item-col" 
            v-for="(itemF, indexF) in listItemHeader" 
            :key="indexF"
            :style="styleProps[indexF]">
        {{ itemI[itemF.key] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiTableBody',
  props: {
    listItem: Array,
    listItemProps: {type: Array, default: function () { return [] }},
    listItemHeader: Array,
  },
  computed: {
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
.body {
  .body-grid__item {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 0px;
    background-color:  rgba(0, 0, 0, 0.1);
    &:nth-child(2n) { background-color:  white; }
    &-col { border: 1px solid grey; padding: 5px 10px; }
  }
}
</style>