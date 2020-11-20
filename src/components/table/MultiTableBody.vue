<template>
  <div class="body">          
    <div class="body-grid__item" :style="stylePosition"
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
        return stylePosition;
    },
    styleProps() {
      let styles = [];
      for (let i = 0; i < this.listItemProps.length; i++) {
        let styleProps = '';
        styleProps += `grid-area: ${this.listItemProps[i].name}; `;

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
    // grid-template-rows: repeat(2, 1fr);
    // grid-template-columns: repeat(12, 1fr);
    grid-template-rows: auto;
    grid-template-columns: auto;
    // grid-gap: 3px;
    background-color:  rgba(0, 0, 0, 0.1);
    &:nth-child(2n) { background-color:  white; }
    &-col {
      padding: 5px 10px;
      // border: 1px solid grey;
    }
  }
}
</style>