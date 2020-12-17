<template>
  <div class="table-head" :class="`table-head_${heightType}`">
    <div class="table-head__item-uno"
         :class="`table-head__item-uno_${heightType}`"
         v-for="(item, index) in listData" 
         :key="index"
         :style="item.position">
      <span class="content" :class="`content_${heightType}`">
        <slot :name="`${item.value}`" v-bind:itemValue="item.value">
          {{ item.label }}
        </slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTableHead',
  props: {
    listData: Array,
    heightType: {type: String, default: 'fixed'},
  },
}
</script>

<style lang="scss" scoped>
@import './DataTableHead.scss';

.table-head {
  display: grid;
  border-bottom: $headRowBorder;

  &_fixed { grid-auto-rows: $headRowHeight; }
  &_dense { grid-auto-rows: $headDenseRowHeight; }
  &_auto { grid-auto-rows: $headAutoRowHeight; }

  &__item-uno {
    display: inline-flex;
    justify-content: $headHorizontalAlign;
    align-items: $headVerticalAlign;

    font-size: $headFontSize;
    font-weight: $headFontWeight;
    line-height: $headFontLineHeight;
    color: $headFontColor;
    
    background-color: $headRowBackgroundColor;

    &_fixed { padding: $headPaddingTB $headPaddingLR; }
    &_dense { padding: $headDensePaddingTB $headDensePaddingLR; }
    &_auto { padding: $headAutoPaddingTB $headAutoPaddingLR; }

    .content {
      &_fixed {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &_dense {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &_auto {
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>