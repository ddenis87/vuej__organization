<template>
  <tbody class="body">
    <tr class="body__row" 
        v-for="(itemI, indexI) in listItem" 
        :key="indexI">
      <td class="body__col" 
          v-for="(itemF, indexF) in listDataHeader" 
          :key="indexF" 
          :style="styleProps[indexF]">{{ itemI[itemF.key] }}</td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'TableBody',
  props: {
    listDataProps: Object,
    listDataHeader: Array,
  },
  computed: {
    listItem() { return this.$store.getters[this.listDataProps.state.getterData]; },
    styleProps() {
      let styles = [];
      for (let i = 0; i < this.listDataProps.length; i++) {
        let styleProps = '';
        if ('align' in this.listDataProps[i]) styleProps += ` text-align: ${this.listDataProps[i].align}; `;
        if ('colorBackground' in this.listDataProps[i]) styleProps += ` background-color: ${this.listDataProps[i].colorBackground}; `;
        if ('colorText' in this.listDataProps[i]) styleProps += ` color: ${this.listDataProps[i].colorText}; `;
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
    border-bottom: thin solid rgba(0, 0, 0, 0.12);
    &:hover { background-color: rgba(0, 0, 0, 0.08); }
  }
  &__col {
    justify-content: start;
    align-items: center;
    padding: 5px 10px;
    text-align: start;
    font-family: "Roboto", sans-serif;
    font-size: 0.875rem;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.87);
  }
}
</style>