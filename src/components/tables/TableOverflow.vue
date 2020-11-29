<template>
  <div class="box-overflow" :id="`box-overflow-${this.sequenceOverflowBox}`">
    <div class="box-full" :style="rowCountStyle" :id="`box-full-${this.sequenceOverflowBox}`">
      <slot></slot>
    </div>
    <div class="tooltip" :style="tooltipsPosition"
         :id="`tooltip-${sequenceOverflowBox}`" v-show="tooltipsShow">{{ textContent }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableOverflow',
  props: {
    textContent: '',
    rowCount: Number,
    windowWidth: 0,
  },
  watch: {
    windowWidth() {
      this.computedOverflow();
    },
  },
  data() {
    return {
      sequenceOverflowBox: this.$store.getters.GET_SEQUENCE_OVERFLOW_BOX,
      rowCountStyle: {'-webkit-line-clamp': ''},
      tooltipsShow: false,
      tooltipsTimer: {},
      tooltipsPosition: {left: '0px', top: '0px'},
      // isShowTips: false,
      // timerTips: {},
    }
  },
  created() {
    this.$store.commit('INCREMENT_SEQUENCE_OVERFLOW_BOX');
  },
  mounted() {
    this.computedOverflow();
  },
  methods: {
    computedOverflow() {
      let parentContainer = document.getElementById(`box-overflow-${this.sequenceOverflowBox}`);
      let fullContainer = document.getElementById(`box-full-${this.sequenceOverflowBox}`);
      if (fullContainer.getBoundingClientRect().height > parentContainer.getBoundingClientRect().height) {
        this.rowCountStyle['-webkit-line-clamp'] = this.rowCount;
        parentContainer.addEventListener('mouseover', this.showTips);
        parentContainer.addEventListener('mouseout', this.hideTips);
      }
    },
    showTips(event) {
      let parentContainer = document.getElementById(`box-overflow-${this.sequenceOverflowBox}`).getBoundingClientRect();
      // let tooltipsContainer = document.getElementById(`tooltip-${this.sequenceOverflowBox}`);
      let shiftLeft = (document.documentElement.getBoundingClientRect().width - event.clientX < 400) ?
        parentContainer.left - (400 - (document.documentElement.getBoundingClientRect().width - event.clientX)) :
          parentContainer.left + parentContainer.width + 20;
      let shiftTop = parentContainer.top;
      this.tooltipsPosition = {left: `${shiftLeft}px`, top: `${shiftTop}px`};
      // console.log(shiftLeft);
      this.tooltipsTimer = setTimeout(() => this.tooltipsShow = true, 1000);
      
    },
    hideTips() {
      clearTimeout(this.tooltipsTimer);
      this.tooltipsShow = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.box-overflow {
  display: inline-flex;
  align-items: center;
  height: 100%;
  width: 100%;
  // border: thin solid red;
  overflow: hidden;
  .box-full {
    display: -webkit-box;
    // -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width: 100%;
    line-height: 1.5;
    // border: thin solid blue;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .tooltip {
    position: fixed;
    padding: 5px 10px;
    max-width: 400px;
    border-radius: 10px;
    font-size: .8em;
    color: rgba(255, 255, 255);
    background-color: rgba(0, 0, 0, 0.816);
    z-index: 999;
  }
}
</style>