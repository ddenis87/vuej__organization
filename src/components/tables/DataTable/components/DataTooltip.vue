<template>
  <div class="tooltip" id="tooltip" @click="$emit('hide-tooltip')" @mouseout="$emit('hide-tooltip')"></div>
</template>

<script>
export default {
  name: 'DataTooltip',
}
</script>

<style lang="scss" scoped>
@import '../DataTable.scss';

.tooltip {
  position: fixed;
  left: 100px;
  top: 100px;
  min-width: 400px;

  font-size: $tooltipFontSize;
  color: $tooltipFontColor;
  border: thin solid rgba(0,0,0,.3);
  border-radius: 10px;
  box-shadow: 2px 2px 4px 0px rgba(0,0,0,.12);
  background-color: white;
  padding: 4px 6px;
  opacity: 1;
  z-index: 100;
  visibility: hidden;
}
</style>