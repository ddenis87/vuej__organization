export const Tooltip = {
  data() {
    return {
      tooltipElement: {},
      tooltipShift: { left: 7, top: 6 },
    }
  },
  mounted() {
    this.tooltipElement = document.querySelector(`#${this.parentId} .table-tooltip`);
  },
  updated() {
    switch(this.heightType) {
      case 'fixed': { this.tooltipShift.left = 7; this.tooltipShift.top = 7; break; }
      case 'dense': { this.tooltipShift.left = 7; this.tooltipShift.top = 0; break; }
      case 'auto': { this.tooltipShift.left = 7; this.tooltipShift.top = 7; break; }
    }
  },
  methods: {
    showTooltip(event) {
      if (this.heightType == 'auto') return;
      if (event.target.parentElement.hasAttribute('data-overflow-text')) {
        let targetChild = event.target.parentElement;
        (document.documentElement.getBoundingClientRect().width - event.clientX < 400) ? this.tooltipShift.left = 250 : this.tooltipShift.left = 7;
        this.tooltipElement.style.left = targetChild.getBoundingClientRect().left - this.tooltipShift.left + 'px';
        this.tooltipElement.style.top = targetChild.getBoundingClientRect().top - this.tooltipShift.top + 'px';
        this.tooltipElement.innerHTML = targetChild.getAttribute('data-overflow-text');
        this.tooltipElement.style.visibility = 'visible';
      }
    },
    hideTooltip() {
      this.tooltipElement.style.visibility = 'hidden';
    },
  },
}