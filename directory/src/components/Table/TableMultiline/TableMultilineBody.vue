<template>
  <div class="table-body">
    <div class="table-body__row" :style="listStyle" v-for="(itemRow, indexRow) in listData" :key="`bodyRow-${indexRow}`">
      <div class="table-body__col" v-for="(itemCol, indexCol) in listDataHeader" :key="`bodyCol-${indexCol}`" :style="itemCol.style">
        
        <!-- <table-overflow :row-count="rowCount" :window-width="windowsWidth" :text-content="itemRow[itemCol.key]"> -->
          <slot :name="`${itemCol.key}`" v-bind:itemValue="itemRow[itemCol.key]">{{ itemRow[itemCol.key] }}</slot>
        <!-- </table-overflow> -->
        
      </div>
      <div class="table-body__col-action">
        <slot name="action" v-bind:activeValue="itemRow['title']"></slot>
      </div>
    </div>
    
  </div>
</template>

<script>
// import TableOverflow from '../TableOverflow.vue'

export default {
  // components: { TableOverflow },
  name: 'TableMultilineBody',
  props: {
    listData: Array,
    listDataHeader: Array,
    listStyle: Object,
    rowCount: Number,
  },
  computed: {
  },
  data() {
    return {
      windowsWidth: Number,
    }
  },
  created() {
    window.addEventListener('resize', this.getWindowWidth);
  },
  methods: {
    getWindowWidth() {
      this.windowsWidth = document.documentElement.getBoundingClientRect().width;
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'TableMultiline';

.table-body {
  &__row {
    display: grid;
    grid-auto-rows: $bodyRowHeight;
    border-bottom: $bodyRowBorder;
    &:hover > .table-body__col { background-color: $bodyRowBackgroundColorHover; }
    &:hover > .table-body__col-action > .action-box { opacity: 1; }

    .table-body__col {
      display: flex;
      justify-content: $bodyHorizontalAlign;
      align-items: $bodyVerticalAlign;
      padding: $bodyPaddingTB $bodyPaddingLR;

      font-size: $bodyFontSize;
      font-weight: $bodyFontWeight;
      line-height: $bodyFontLineHeight;
      color: $bodyFontColor;

      background-color: $bodyRowBackgroundColor;
      transition-delay: .1s;
      overflow: hidden;
      &-action {
        position: sticky;
        right: 0px;
        grid-area: action_box;
      }
    }
  }
}
</style>