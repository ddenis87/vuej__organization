<template>
  <div class="box-overflow">
    <div class="box-full">
      <slot></slot>
    </div>
    <div class=" box-overflow_linear-gradient"></div>
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
  // position: relative;
  width: inherit;
  height: inherit;
  text-align: inherit;
  // z-index: 80;
  overflow: hidden;
  // background-image: linear-gradient(white 50%, grey 100%);
  
  &_linear-gradient {
    // position: sticky;
    // z-index: 100;
    // left: 100px;
    // top: 100px;
    width: inherit;
    height: inherit;
    background-color: red;
    // background-image: linear-gradient(white 80%, grey 100%);
    
  }
  .box-full {
    // z-index: 80;
    border: 1px solid green;
    text-align: inherit;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
  }
}
</style>