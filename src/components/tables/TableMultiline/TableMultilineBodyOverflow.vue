<template>
  <div class="box-overflow">
    <div class="box-full">
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
}
</script>

<style lang="scss" scoped>
.box-overflow {
  width: inherit;
  height: inherit;
  text-align: inherit;
  overflow: hidden;
  .box-full {
    border: 1px solid green;
    text-align: inherit;
  }
}
</style>