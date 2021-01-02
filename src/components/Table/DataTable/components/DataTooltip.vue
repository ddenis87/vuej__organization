<template>
  <div id="tooltip"
       class="tooltip" 
       :class="{'tooltip_show': isShow}" 
       :style="position" 
       @click="$emit('click')" @mousemove="$emit('mousemove')">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DataTooltip',
  props: {
    isShow: {type: Boolean, default: false},
    tLeft: Number,
    tTop: Number,
    tMinWidth: Number,
  },
  computed: {
    position() {
      return {
        left: this.tLeft + 'px',
        top: this.tTop + 'px',
        'min-width': this.tMinWidth + 'px',
        'max-width': (this.tMinWidth * 2) + 'px'
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.tooltip {
  position: fixed;
  left: 100px;
  top: 100px;
  padding: 2px 6px;
  padding-bottom: 1px;

  font-size: .875rem;
  color: rgba(0, 0, 0, .87);

  border: thin solid rgba(0,0,0,.3);
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 1);
  
  z-index: 100;
  visibility: hidden;
  &_show {
    visibility: visible;
  }
}
</style>