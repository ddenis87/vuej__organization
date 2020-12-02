<template>
  <div class="table-head">
    <div class="table-head__item-uno" 
        v-for="(item, index) in listData" 
        :key="index"
        :style="item.style" :data-text="item.label">
        <span class="table-head__item-uno_text" :data-text="item.label">
          <slot :name="`${item.key}`" v-bind:itemValue="item.label">{{ item.label }}</slot>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableMultilineHead',
  props: {
    listData: Array,
  }
}
</script>

<style lang="scss" scoped>
@import 'TableMultiline.scss';

.table-head {
  display: grid;
  grid-auto-rows: $headRowHeight;
  border-bottom: $headRowBorder;
  &__item-uno {
    display: flex;
    justify-content: $headHorizontalAlign;
    align-items: $headVerticalAlign;
    padding: $headPaddingTB $headPaddingLR;

    font-size: $headFontSize;
    font-weight: $headFontWeight;
    line-height: $headFontLineHeight;
    color: $headFontColor;
    
    background-color: $headRowBackgroundColor;
    &_text { 
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>