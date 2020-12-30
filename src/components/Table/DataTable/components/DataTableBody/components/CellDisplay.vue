<template>
  <span class="content" 
        :class="`content_${heightType}`"
        :style="`text-align: ${dataProps.align}`">
      {{ displayValue }}
  </span>
</template>

<script>
export default {
  name: 'CellDisplay',
  components: {
  },
  props: {
    dataValue: null,
    dataProps: Object,
    heightType: String,
  },
  computed: {
    displayValue() {
      let newValue = '';
      if (this.dataProps.type == 'string' || this.dataProps.type == 'integer') newValue = this.dataValue;
      if (this.dataProps.type == 'choice') newValue = this.dataValue?.display_name;
      if (this.dataProps.type == 'nested object') newValue = this.dataValue[this.dataProps.objectValue];
      return newValue;
    }
  },
}
</script>

<style lang="scss" scoped>
  .content {
    width: 100%;
    -webkit-user-select: none;
    text-overflow: ellipsis;
    overflow: hidden;
    &_fixed {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    &_dense { white-space: nowrap; }
    // &_auto {  }
  }
</style>