<template>
  <div class="box-overflow-head" :id="`box-overflow-head-${sequenceOverflowBox}`">
    <div class="head-box-full" :id="`head-box-full-${sequenceOverflowBox}`">
      
      <slot></slot>
    </div>
    <div class="head-box-short" 
         :class="{'head-box-short__tooltips': tooltipsShow}" 
         :id="`head-box-short-${sequenceOverflowBox}`"
         :data-text="textContent">
      {{ textContent }}
    </div>
    <v-tooltip v-model="tooltipsShow"
                max-width="400" 
                :fixed="true"
                right
                :position-x="+tooltipsPosition.left"
                :position-y="+tooltipsPosition.top">
      <!-- <div class="tooltip"> -->
        {{ textContent }}
      <!-- </div> -->
      
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'TablOverflowHead',
  props: {
    textContent: String,
  },
  data() {
    return {
      sequenceOverflowBox: this.$store.getters.GET_SEQUENCE_OVERFLOW_BOX,
      tooltipsShow: false,
      tooltipsTimer: {},
      tooltipsPosition: {left: '0', top: '0'},
    }
  },
  mounted() {
    this.computedOverflow();
  },
  created() {
    this.$store.commit('INCREMENT_SEQUENCE_OVERFLOW_BOX');
  },
  methods: {
    computedOverflow() {
      let parentContainer = document.getElementById(`box-overflow-head-${this.sequenceOverflowBox}`);
      let fullContainer = document.getElementById(`head-box-full-${this.sequenceOverflowBox}`);
      if (fullContainer.getBoundingClientRect().width > parentContainer.getBoundingClientRect().width + 10) {
        // console.log('123')
        parentContainer.addEventListener('mouseover', this.showTips);
        parentContainer.addEventListener('mouseout', this.hideTips);
      }
    },
    showTips(event) {
      let parentContainer = document.getElementById(`box-overflow-head-${this.sequenceOverflowBox}`).getBoundingClientRect();
      // let shiftLeft = (document.documentElement.getBoundingClientRect().width - event.clientX < 400) ?
      //   parentContainer.left - (400 - (document.documentElement.getBoundingClientRect().width - event.clientX)) :
      //     parentContainer.left + parentContainer.width + 20;

      let shiftLeft = `${parentContainer.left - 26}`; 
      let shiftTop = `${parentContainer.top + 8}`;
      this.tooltipsPosition = {left: shiftLeft, top: shiftTop};
      this.tooltipsTimer = setTimeout(() => this.tooltipsShow = true, 500);
      // this.tooltipsShow = true
    },
    hideTips() {
      clearTimeout(this.tooltipsTimer);
      this.tooltipsShow = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.box-overflow-head {
  // position: relative;
  display: flex;
  width: 100%;
  // border: thin solid teal;
  overflow: hidden;
  .head-box-full {
    position: absolute;
    // display: inline;
    top: 5px;
    left: 0px;
    visibility: hidden;
    white-space: nowrap;
    // border: thin solid red;
  }
  .head-box-short {
    display: inline;
    text-overflow: ellipsis;
    // white-space: nowrap;
    overflow: hidden;
// border: thin solid orange;
  }
  .tooltip {
    padding: 6px 6px !important;
    font-size: .75rem;
    font-weight: bold;
    width: 100% !important;
    opacity: 1;
    // color: rgba(0, 0, 0, .6);
    background-color: lemonchiffon;
  }
}
</style>