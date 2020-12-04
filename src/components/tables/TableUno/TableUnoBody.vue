<template>
  <div class="table-body">
    <div v-for="(itemRow, indexRow) in listData"
         :key="`bodyRow-${indexRow}`"
         class="table-body__row"
         :class="`table-body__row_${heightType}`"
         :style="fieldsTemplate">
      <div v-for="(itemCol, indexCol) in listDataHeader" 
           :key="`bodyCol-${indexCol}`" 
           class="table-body__col"
           :class="`table-body__col_${heightType}`" @mouseenter="showTooltip">
        <slot :name="`${itemCol.value}`" v-bind:itemValue="itemRow[itemCol.value]">
          <table-uno-overflow :content="itemRow[itemCol.value]">
            <span class="content" :class="`content_${heightType}`" :style="`text-align: ${itemCol.align}`">
              {{ itemRow[itemCol.value] }}
            </span>
          </table-uno-overflow>
        </slot>
      </div>
      <div class="table-body__col-action">
        <slot name="action" v-bind:activeValue="itemRow['title']"></slot>
      </div>
    </div>
    
  </div>
</template>

<script>
import { TableUnoBodyTooltip } from './TableUnoBodyTooltip.js';
import TableUnoOverflow from './TableUnoOverflow.vue';

export default {
  name: 'TableUnoBody',
  mixins: [
    TableUnoBodyTooltip,
  ],
  components: {
    TableUnoOverflow,
  },
  props: {
    listData: Array,
    listDataHeader: Array,
    fieldsTemplate: Object,
    heightType: {type: String, default: 'fixed'},
  },
}
</script>

<style lang="scss" scoped>
@import 'TableUno';

.table-body {
  &__row {
    display: grid;
    border-bottom: $bodyRowBorder;

    &_fixed { grid-auto-rows: $bodyRowHeight; }
    &_dense { grid-auto-rows: $bodyDenseRowHeight; }
    &_auto { grid-auto-rows: auto; }

    &:hover > .table-body__col { background-color: $bodyRowBackgroundColorHover; }
    &:hover > .table-body__col-action > .action-box { opacity: 1; }

    .table-body__col {
      display: inline-flex;
      justify-content: $bodyHorizontalAlign;
      align-items: $bodyVerticalAlign;

      font-size: $bodyFontSize;
      font-weight: $bodyFontWeight;
      line-height: $bodyFontLineHeight;
      color: $bodyFontColor;

      background-color: $bodyRowBackgroundColor;
      transition-delay: .1s;
      overflow: hidden;

      &_fixed { padding: $bodyPaddingTB $bodyPaddingLR; }
      &_dense { padding: $bodyDensePaddingTB $bodyDensePaddingLR; }
      &_auto { padding: $bodyDensePaddingTB $bodyDensePaddingLR; }

      .content {
        width: 100%;
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

      &-action {
        position: sticky;
        right: 0px;
        grid-area: action_box;
      }
    }
  }
}
</style>