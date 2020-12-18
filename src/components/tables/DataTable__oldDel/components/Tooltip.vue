<template>
  <div class="tooltip" id="tooltip" @mouseout="hideTooltip" @click="hideTooltip"></div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    heightType: String,
  },
  methods: {
    showTooltip(event) {
      if (this.heightType == 'auto') return;
      if (event.target.parentElement.hasAttribute('data-overflow-text')) {
        let targetChild = event.target.parentElement;
        (document.documentElement.getBoundingClientRect().width - event.clientX < 400) ? this.tooltipShift.left = 250 : this.tooltipShift.left = 7;
        this.tooltipElement.style.left = targetChild.getBoundingClientRect().left - this.tooltipShift.left + 'px';
        this.tooltipElement.style.top = targetChild.getBoundingClientRect().top - this.tooltipShift.top + 'px';
        this.tooltipElement.style.width = targetChild.getBoundingClientRect().width + 'px';
        this.tooltipElement.innerHTML = targetChild.getAttribute('data-overflow-text');
        this.tooltipElement.style.visibility = 'visible';
      }
    },
    hideTooltip() {
      this.tooltipElement.style.visibility = 'hidden';
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'TableUno.scss';

.tooltip {
  position: fixed;
  left: 100px;
  top: 100px;
  max-width: 400px;
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