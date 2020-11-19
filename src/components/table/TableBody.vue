<template>
  <tbody class="body">
    <tr class="body__row" v-for="(itemI, indexI) in listItem" :key="indexI">
      <td class="body__col" v-for="(itemF, indexF) in listItemHeader" :key="indexF" :style="styleProps[indexF]">{{ itemI[itemF.key] }}</td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'TableBody',
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
  font-size: 0.875rem;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.87);
  &__row {
    border-bottom: 1px solid grey;
    // background-color:  rgba(0, 0, 0, 0.1);
    // &:nth-child(2n) { background-color:  whitesmoke; }
  }
  &__col {
    padding: 3px 16px;
  }
}
</style>