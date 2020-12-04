<template>
  <div class="box-overflow" :id="`box-overflow-${this.sequenceOverflowBox}`" @mouseover.stop.prevent="">
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
  watch: {
  },
  data() {
    return {
      sequenceOverflowBox: this.$store.getters.GET_SEQUENCE_OVERFLOW_BOX,
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
        // parentContainer.setAttribute('data-overflow', "true"); // ?
        parentContainer.setAttribute('data-overflow-text', this.content);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.box-overflow {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 100%;
  width: 100%;
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