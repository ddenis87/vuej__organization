<template>
  <div class="box-display-default-component">
      <span class="content" 
            :class="`content_${heightType}`"
            :style="`text-align: ${dataProps.align}`"
            @mouseover.stop.prevent="() => {return false}"
            @mousedown="() => {return false}">
        {{ dataValue }}
      </span>
  </div>
</template>

<script>
export default {
  name: 'CellDisplay',
  components: {
  },
  props: {
    dataValue: String,
    dataProps: Object,
    heightType: String,
  },
}
</script>

<style lang="scss" scoped>
.box-display-default-component {
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
}
</style>