<template>
  <div class="data-overflow-line">
    <div class="data-overflow-line_full"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'DataOverflowLine',
  mounted() {
    this.computedOverflow();
  },
  methods: {
    computedOverflow() {
      let containerParent = document.querySelector('.data-overflow-line');
      let containerLineFull = document.querySelector('.data-overflow-line_full');
      if (containerParent.getBoundingClientRect().width < containerLineFull.getBoundingClientRect().width) {
        if (containerParent.closest('.table-body__col'))
          containerParent.closest('.table-body__col').setAttribute('data-overflow-text', containerLineFull.innerText);
      }
      containerParent.remove();
    }
    
  },
}
</script>

<style lang="scss" scoped>
.data-overflow-line {
  position: absolute;
  left: 0px;
  top: 0px;
  border: thin solid purple;
  width: inherit;
  height: inherit;
  &_full {
    display: inline;
    width: auto;
    border: thin solid red;
  }
}
</style>