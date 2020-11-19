<template>
  <thead class="header">
    <tr class="header__row">
      <th class="header__col" v-for="(item, index) in listItem" :key="index" :style="styleProps[index]">{{ (item) ? item.label : '' }}</th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'TableHaed',
  props: {
    listItem: {type: Array, default: []},
    listItemProps: {type: Array, default: []},
  },
  computed: {
    styleProps() {
      let styles = [];
      for (let i = 0; i < this.listItemProps.length; i++) {
        let styleProps = '';
        if ('width' in this.listItemProps[i]) styleProps += ` width: ${this.listItemProps[i].width}px; `;
        if ('align' in this.listItemProps[i]) styleProps += ` text-align: ${this.listItemProps[i].align}; `;
        if ('colorBackground' in this.listItemProps[i]) styleProps += ` background-color: ${this.listItemProps[i].colorBackground}; `;
        if ('colorText' in this.listItemProps[i]) styleProps += ` color: ${this.listItemProps[i].colorText}; `;
        styles.push(styleProps)
      }
      return styles;
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
    width: auto;
    padding: 5px 15px;
    background-color: white;
    box-shadow: 0px 3px 0px grey;
    
    // white-space: nowrap;
    &:hover { background-color: rgba(0, 0, 0, 0.1); cursor: pointer; }
  }
}
</style>