<template>
  <div class="box-overflow" :id="`box-overflow-${this.sequenceOverflowBox}`">
    <div class="box-full" :id="`box-full-${this.sequenceOverflowBox}`">
      {{ content }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TableOverflow',
  props: {
    content: '',
    countRow: Number,
  },
  data() {
    return {
      sequenceOverflowBox: this.$store.getters.GET_SEQUENCE_OVERFLOW_BOX,
      tooltipTimer: {},
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
      if (fullContainer.getBoundingClientRect().height > parentContainer.getBoundingClientRect().height + 10) {
        parentContainer.setAttribute('data-overflow-text', this.content);
        parentContainer.addEventListener('mouseover', this.showTooltip);
        parentContainer.addEventListener('mouseout', this.hideTooltip);
      }
    },
    showTooltip(event) {
      this.tooltipTimer = setTimeout(() => this.$emit('show-tooltip', event), 1500);
    },
    hideTooltip() {
      clearTimeout(this.tooltipTimer); 
    }
  }
}
</script>

<style lang="scss" scoped>
.box-overflow {
  position: relative;
  display: inline-flex;
  justify-content: inherit;
  align-items: inherit;
  height: 100%;
  width: 100%;
  background-color: inherit;
  overflow: hidden;
  .box-full {
    position: absolute;
    left: 0px;
    top: 0px;
    border: thin solid red;
    width: 100%;
    line-height: 1.5;
    visibility: hidden;
  }
}
</style>