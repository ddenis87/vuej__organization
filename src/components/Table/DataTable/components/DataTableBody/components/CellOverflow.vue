<template>
  <div class="box-overflow" :id="`box-overflow`">
    <div class="box-full" :id="`box-full`">
      {{ content }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CellOverflow',
  props: {
    content: '',
  },
  mounted() {
    this.computedOverflow();
  },
  methods: {
    computedOverflow() {
      
      let parentContainer = document.getElementById(`box-overflow`);
      let fullContainer = document.getElementById(`box-full`);
      if (fullContainer.getBoundingClientRect().height > parentContainer.getBoundingClientRect().height + 10) {
        parentContainer.closest('.table-body__col').setAttribute('data-overflow', true);
      }
      this.$emit('destroy-self');
    },
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