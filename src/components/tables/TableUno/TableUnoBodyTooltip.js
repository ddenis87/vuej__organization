export const TableUnoBodyTooltip = {
  data() {
    return {
      tooltipElement: {},
      tooltipTimer: {},
      tooltipShift: { left: 7, top: 6 },
    }
  },
  mounted() {
    this.tooltipElement = document.getElementById("table-tooltip");
  },
  updated() {
    switch(this.heightType) {
      case 'fixed': { this.tooltipShift.left = 7; this.tooltipShift.top = 6; break; }
      case 'dense': { this.tooltipShift.left = 7; this.tooltipShift.top = 0; break; }
      case 'auto': { this.tooltipShift.left = 7; this.tooltipShift.top = 6; break; }
    }
  },
  methods: {
    showTooltip(event) {
      if (this.heightType == 'auto') return;
      this.tooltipElement.style.visibility = 'hidden';
      clearTimeout(this.tooltipTimer);
      let targetChild = event.target.firstChild;  
      // console.log(document.documentElement.getBoundingClientRect().width);
      // console.log(event.clientX);
      if (document.documentElement.getBoundingClientRect().width - event.clientX < 400) {
        this.tooltipShift.left = 250;
      } else { this.tooltipShift.left = 7; }

      if (typeof targetChild === 'object') {
        if (targetChild.hasAttribute('data-overflow-text')) {
          this.tooltipElement.style.left = targetChild.getBoundingClientRect().left - this.tooltipShift.left + 'px';
          this.tooltipElement.style.top = targetChild.getBoundingClientRect().top - this.tooltipShift.top + 'px';
          this.tooltipElement.innerHTML = targetChild.getAttribute('data-overflow-text');
          this.tooltipTimer = setTimeout(() => this.tooltipElement.style.visibility = 'visible', 1000);
          // console.log('show');
        }
      }
    },
    // hideTooltip() {
    //   clearTimeout(this.tooltipTimer);
    //   this.tooltipElement.style.visibility = 'hidden';
    // },
  },
}