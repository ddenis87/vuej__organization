<template>
  <div class="el-button">
    <v-btn class="el-button__item" tabindex="1"
          :class="{'el-button__item_right': isLeftOrientation}"
           depressed
           dark
           small
           color="blue darken-1" 
           :height="isHeight"
           @click="$emit('click')" 
           @keydown="(event) => $emit('keydown', event)">
      <slot></slot>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ElButton',
  props: {
    isHeight: {type: String, default: '26'},
    isOrientation: {type: String, default: 'right'},
  },
  computed: {
    isLeftOrientation() { return (this.isOrientation == 'left') ? true : false; },
  },
}
</script>

<style lang="scss" scoped>
.el-button {
  outline: none;
  &__item {
    outline: none;
    margin-left: 10px;
    &_right {
      margin-left: 0px;
      margin-right: 10px;
    }
  }
}
</style>