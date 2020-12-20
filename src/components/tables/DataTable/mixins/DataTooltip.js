export const MDataTooltip = {
  data() {
    return {
      tooltipElement: {},
      tooltipShift: { left: 7, top: 5 },
      tooltipWidth: 400,
      tooltipTimer: {},
    }
  },
  mounted() {
    this.tooltipElement = document.querySelector(`#tooltip`);
  },
  methods: {
    showTooltip(event) {
      if (this.tooltipTimer) clearTimeout(this.tooltipTimer); 
      if (this.heightType == 'auto') return;
      if (event.relatedTarget && event.relatedTarget.classList.contains('content')) return;
      if (!event.target.hasAttribute('data-overflow')) return;
      this.tooltipTimer = setTimeout(() => this.visibleTooltip(event), 1500);
    },
    visibleTooltip(event) {
        let targetChild = event.target.querySelector('.box-display-default');
        (document.documentElement.getBoundingClientRect().width - event.clientX < 400) ? this.tooltipShift.left = 250 : this.tooltipShift.left = 7;
        this.tooltipElement.style.left = targetChild.getBoundingClientRect().left - this.tooltipShift.left + 'px';
        this.tooltipElement.style.top = targetChild.getBoundingClientRect().top - this.tooltipShift.top + 'px';
        this.tooltipElement.style.width = targetChild.getBoundingClientRect().width + 'px';
        this.tooltipElement.innerHTML = targetChild.getAttribute('data-value');
        this.tooltipElement.style.visibility = 'visible';
    },
    hideTooltip() {
      this.tooltipElement.style.visibility = 'hidden';
    },
  }
}