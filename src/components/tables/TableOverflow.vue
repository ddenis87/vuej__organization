<template>
  <div class="box-overflow" :id="`box-overflow-${this.sequenceOverflowBox}`">
    
    <div class="box-full" :style="rowCountStyle" :id="`box-full-${this.sequenceOverflowBox}`">
      <slot></slot>
    </div>

    <v-tooltip v-model="tooltipsShow"
               max-width="600"
               :fixed="true"
               bottom
               :position-x="+tooltipsPosition.left"
               :position-y="+tooltipsPosition.top">
      <span>{{ textContent }}</span>
    </v-tooltip>
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
      tooltipsPosition: {left: '0', top: '0'},
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
      // let shiftLeft = (document.documentElement.getBoundingClientRect().width - event.clientX < 400) ?
      //   parentContainer.left - (400 - (document.documentElement.getBoundingClientRect().width - event.clientX)) :
      //     parentContainer.left + parentContainer.width + 20;
      // let shiftTop = parentContainer.top;
      // this.tooltipsPosition = {left: event.clientX, top: event.clientY};
      

      let shiftLeft = `${parentContainer.left + 285}`; 
      let shiftTop = `${parentContainer.top - 8}`;
      this.tooltipsPosition = {left: shiftLeft, top: shiftTop};
      this.tooltipsTimer = setTimeout(() => this.tooltipsShow = true, 500);
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
  overflow: hidden;
  .box-full {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    width: 100%;
    line-height: 1.5;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .tooltip {
    color: rgba(255, 255, 255);
    background-color: rgba(0, 0, 0, 1);
  }
}
</style>