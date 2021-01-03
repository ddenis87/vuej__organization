<template>
  <div :class="`data-overflow ${dId}-data-overflow`" :style="styleParent">
    <div :class="`data-overflow-block ${dId}-data-overflow-block`">{{ content }}</div>
    <div :class="`data-overflow-line ${dId}-data-overflow-line`">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: 'DataTableOverflow',
  props: {
    dId: '',
    dataProperties: Object,
  },
  data() {
    return {
      isTimer: null,
    }
  },
  computed: {
    styleParent() {
      this.$emit('is-hide');
      setTimeout(() => this.computedOverflow(), 50);
      return {
        width: this.dataProperties.width - 24 + 'px',
        height: this.dataProperties.height + 'px',
      }
    },
    content() {
      this.$emit('is-hide');
      return this.dataProperties.text;
    },
  },
  methods: {
    computedOverflow() {
      let overflow = document.querySelector(`.${this.dId}-data-overflow`);
      let overflowBlock = document.querySelector(`.${this.dId}-data-overflow-block`);
      if (overflow.getBoundingClientRect().height + 10 < overflowBlock.getBoundingClientRect().height) {
        this.$emit('is-show');
        return;
      }
      let overflowLine = document.querySelector(`.${this.dId}-data-overflow-line`);
      if (overflow.getBoundingClientRect().width - 5 < overflowLine.getBoundingClientRect().width) {
        this.$emit('is-show');
        return;
      }
      this.$emit('is-hide');
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../DataTable.scss';

.data-overflow {
  position: absolute;
  left: 100px;
  top: 100px;
  border: thin solid purple;
  visibility: hidden;
  font-size: $bodyFontSize;
  font-weight: $bodyFontWeight;
  line-height: $bodyFontLineHeight;
  &-block {
    width: 100%;
    border: thin solid red;
  }
  &-line {
    display: inline;
    width: auto;
    border: thin solid blue;
  }
}
</style>