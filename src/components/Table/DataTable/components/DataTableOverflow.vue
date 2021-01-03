<template>
  <div class="data-overflow">
    <div class="data-overflow-block">{{ content }}</div>
    <div class="data-overflow-line">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: 'DataTableOverflow',
  props: {
    content: '',
  },
  mounted() { this.computedOverflow(); },
  methods: {
    computedOverflow() {
      let overflow = document.querySelector('.data-overflow');
      let overflowBlock = document.querySelector('.data-overflow-block');
      
      if (overflow.getBoundingClientRect().height + 10 < overflowBlock.getBoundingClientRect().height) {
        if (overflow.closest('.table-body__col')) overflow.closest('.table-body__col').setAttribute('data-overflow', true);
        if (overflow.closest('.table-head__col')) overflow.closest('.table-head__col').setAttribute('data-overflow', true);
        overflow.remove();
        return;
      }
      let overflowLine = document.querySelector('.data-overflow-line');
      if (overflow.getBoundingClientRect().width - 10 < overflowLine.getBoundingClientRect().width) {
        if (overflow.closest('.table-body__col')) overflow.closest('.table-body__col').setAttribute('data-overflow', true);
        if (overflow.closest('.table-head__col')) overflow.closest('.table-head__col').setAttribute('data-overflow', true);
        overflow.remove();
        return;
      }
      overflow.remove();
    }
  },
}
</script>

<style lang="scss" scoped>
.data-overflow {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%; //inherit;
  height: inherit;
  border: thin solid purple;

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