<template>
  <div class="box-overflow" :id="`box-overflow-${this.sequenceOverflowBox}`">
    <div class="box-full" :style="countRowStyle" :id="`box-full-${this.sequenceOverflowBox}`">
      <slot></slot>
    </div>
    <div class="tips" 
         :id="`tips-${sequenceOverflowBox}`" v-show="isShowTips">
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableOverflow',
  props: {
    countRow: Number,
  },
  computed: {
    // overflowContent() {
      
    // },
  },
  data() {
    return {
      sequenceOverflowBox: this.$store.getters.GET_SEQUENCE_OVERFLOW_BOX,
      countRowStyle: {'-webkit-line-clamp': ''},
      isShowTips: false,
      timerTips: {},
    }
  },
  created() {
    this.$store.commit('INCREMENT_SEQUENCE_OVERFLOW_BOX');
  },
  mounted() {
    let parentContainer = document.getElementById(`box-overflow-${this.sequenceOverflowBox}`);
    let fullContainer = document.getElementById(`box-full-${this.sequenceOverflowBox}`);
    if (fullContainer.getBoundingClientRect().height > parentContainer.getBoundingClientRect().height) {
      this.countRowStyle['-webkit-line-clamp'] = this.countRow;
      parentContainer.addEventListener('mouseover', this.showTips);
      parentContainer.addEventListener('mouseout', this.hideTips);
    }
  },
  methods: {
    showTips(event) {
      this.timerTips = setTimeout(() => this.isShowTips = true, 1000);
      console.log('show');
    },
    hideTips() {
      clearTimeout(this.timerTips);
      this.isShowTips = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.box-overflow {
  display: inline-flex;
  // padding: 5px;
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
    // align-items: center;
    // align-self: center;
    // border: thin solid blue;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>