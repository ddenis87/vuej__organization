<template>
  <div class="box-display-default-component">
    <!-- <cell-overflow :content="dataValue" 
                   @show-tooltip="(event) => $emit('show-tooltip', event)"> -->
      <span class="content" 
            :class="`content_${heightType}`"
            :style="`text-align: ${dataProps.align}`"
            
            @mousedown="() => {return false}">
        {{ dataValue }}
      </span>
    <!-- </cell-overflow> -->
  </div>
</template>

<script>
// import CellOverflow from './CellOverflow.vue';

export default {
  name: 'CellDisplay',
  components: {
    // CellOverflow,
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