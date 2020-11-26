<template>
  <div class="box-overflow" :class="{'box-overflow_cut': cutContent}" :id="`box-overflow-${sequenceOverflowBox}`">
    <div class="box-full" :class="{'box-full_cut': cutContent}" :style="countRowStyle" :id="`box-full-${sequenceOverflowBox}`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableMultilineBodyOverflow',
  props: {
    itemData: String,
  },
  data() {
    return {
      countRowStyle: '',
      sequenceOverflowBox: this.$store.getters.GET_SEQUENCE_OVERFLOW_BOX,
      cutContent: false,
    }
  },
  created() {
    this.$store.commit('INCREMENT_SEQUENCE_OVERFLOW_BOX');
  },
  mounted() {
    this.countRowStyle = '-webkit-line-clamp: ' + (document.getElementById(`box-overflow-${this.sequenceOverflowBox}`).getBoundingClientRect().height / 25) + ';';
    (document.getElementById(`box-full-${this.sequenceOverflowBox}`).getBoundingClientRect().height > document.getElementById(`box-overflow-${this.sequenceOverflowBox}`).getBoundingClientRect().height) ? this.cutContent = true : this.cutContent = false;
  }
}
</script>

<style lang="scss" scoped>
.box-overflow {
  position: relative;
  width: inherit;
  height: inherit;
  text-align: inherit;
  overflow: hidden;

  &_cut {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.87) 60%, white 100%);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .box-full {
    &_cut {
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
}
</style>