<template>
  <div class="table-body">
    <div class="table-body__row" :style="listStyle" v-for="(itemRow, indexRow) in listData" :key="`bodyRow-${indexRow}`" @mouseout="showTooltip">
      <div class="table-body__col" v-for="(itemCol, indexCol) in listDataHeader" :key="`bodyCol-${indexCol}`" :style="itemCol.style">
        

        <table-uno-overflow :count-row="countRow" :text-content="itemRow[itemCol.key]">
          <slot :name="`${itemCol.key}`" v-bind:itemValue="itemRow[itemCol.key]">{{ itemRow[itemCol.key] }}</slot>
        </table-uno-overflow>
        <!-- <table-overflow :row-count="rowCount" :window-width="windowsWidth" :text-content="itemRow[itemCol.key]"> -->
          <!-- <slot :name="`${itemCol.key}`" v-bind:itemValue="itemRow[itemCol.key]">{{ itemRow[itemCol.key] }}</slot> -->
        <!-- </table-overflow> -->
        
      </div>
      <div class="table-body__col-action">
        <slot name="action" v-bind:activeValue="itemRow['title']"></slot>
      </div>
    </div>
    
  </div>
</template>

<script>
import TableUnoOverflow from './TableUnoOverflow';
import TableOverflow from '../TableOverflow.vue';

export default {
  name: 'TableUnoBody',
  components: {
    TableUnoOverflow,
    TableOverflow,
  },
  props: {
    listData: Array,
    listDataHeader: Array,
    listStyle: Object,
    countRow: Number,
  },
  computed: {
  },
  data() {
    return {
      windowsWidth: Number,
      tooltipTimer: {},
    }
  },
  created() {
    window.addEventListener('resize', this.getWindowWidth);
  },
  methods: {
    getWindowWidth() {
      this.windowsWidth = document.documentElement.getBoundingClientRect().width;
    },
    showTooltip(event) {
      // this.$emit('hide-tooltip');
      // if (this.tooltipTimer) {clearTimeout(this.tooltipTimer); }
      // if (event.relatedTarget && event.relatedTarget.getAttribute('data-overflow')) {
      //   let tooltipProps = {
      //     left: event.relatedTarget.getBoundingClientRect().left - 24,
      //     top: event.relatedTarget.getBoundingClientRect().top - 200,
      //     content: event.relatedTarget.getAttribute('data-overflow-text'),
      //   }
      //   this.tooltipTimer = setTimeout(() => this.$emit('show-tooltip', tooltipProps), 500);
      // } 
      // else {
      //   this.$emit('hide-tooltip');
      // }
    },
    // hideTooltip() {
    //   console.log('By');
    // }
  },
}
</script>

<style lang="scss" scoped>
@import 'TableUno';

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