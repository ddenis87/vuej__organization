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
import TableUnoOverflow from './TableUnoOverflow.vue';

export default {
  name: 'TableUnoBody',
  components: {
    TableUnoOverflow,
  },
  props: {
    listData: Array,
    listDataHeader: Array,
    fieldsTemplate: Object,
    heightType: {type: String, default: 'fixed'},
  },
  computed: {
  },
  data() {
    return {
      tooltipElement: {},
      tooltipTimer: {},
      // tooltipsPosition: { left: '0px', top: '0px', visibility: 'hidden' },
      tooltipShift: { left: 7, top: 6 },
    }
  },
  created() {
    
  },
  mounted() {
    this.tooltipElement = document.getElementById("table-tooltip");
  },
  updated() {
    switch(this.heightType) {
      case 'fixed': { this.tooltipShift.left = 7; this.tooltipShift.top = 6; break; }
      case 'dense': { this.tooltipShift.left = 7; this.tooltipShift.top = 0; break; }
      case 'auto': { this.tooltipShift.left = 7; this.tooltipShift.top = 6; break; }
    }
  },
  methods: {
    showTooltip(event) {
      if (this.heightType == 'auto') return;
      this.tooltipElement.style.visibility = 'hidden';
      clearTimeout(this.tooltipTimer);
      let targetChild = event.target.firstChild;  
      
      // console.log(document.documentElement.getBoundingClientRect().width);
      // console.log(event.clientX);
      if (document.documentElement.getBoundingClientRect().width - event.clientX < 400) {
        this.tooltipShift.left = 250;
      } else { this.tooltipShift.left = 7; }

      if (typeof targetChild === 'object') {
        if (targetChild.hasAttribute('data-overflow-text')) {
          this.tooltipElement.style.left = targetChild.getBoundingClientRect().left - this.tooltipShift.left + 'px';
          this.tooltipElement.style.top = targetChild.getBoundingClientRect().top - this.tooltipShift.top + 'px';
          this.tooltipElement.innerHTML = targetChild.getAttribute('data-overflow-text');
          this.tooltipTimer = setTimeout(() => this.tooltipElement.style.visibility = 'visible', 1000);
          // console.log('show');
        }
      }
    },
    // hideTooltip() {
    //   clearTimeout(this.tooltipTimer);
    //   this.tooltipElement.style.visibility = 'hidden';
    // },
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