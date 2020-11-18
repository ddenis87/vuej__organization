<template>
  <thead class="header">
    <tr class="header__row">
      <th class="header__col" v-for="(item, index) in listItem" :key="index" :style="columnWidth[index]">{{ (item) ? item.label : '' }}</th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'TableHaed',
  props: {
    listItem: {type: Array, default: []},
    columnWidthHeader: {type: Array},
  },
  computed: {
    columnWidth() {
      let columnWidth = [];
      for (let i = 0; i < this.listItem.length; i++) {
        columnWidth.push( (this.columnWidthHeader[i]) ? `width: ${this.columnWidthHeader[i]}px` : 'width: auto' )
      }
      return columnWidth;
    },
  },
  data() {
    return {
      timeoutMenuContext: Object,
    }
  },
  methods: {
    showMenuContext(item) {
      this.timeoutMenuContext = setTimeout(() => {
        console.log(item);
      }, 800);
    },
    closeMenuContext() {
      clearTimeout(this.timeoutMenuContext);
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
    padding: 5px 15px;
    background-color: white;
    box-shadow: 0px 3px 0px grey;
    // white-space: nowrap;
    &:hover { background-color: rgba(0, 0, 0, 0.1); cursor: pointer; }
  }
}
</style>