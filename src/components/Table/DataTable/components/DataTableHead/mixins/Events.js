export const Events = {
  data() {
    return {
      isTooltipProperties: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        text: ''
      },
      isTooltipTimer: null,
      isTooltipShow: false,
    }
  },
  computed: {
    calcTooltipShift() {
      let calcTooltipShift = { left: 10, top: 4 };
      // if (this.heightType == 'fixed') { calcTooltipShift.left = 10; calcTooltipShift.top = 4; return calcTooltipShift};
      // if (this.heightType == 'dense') { calcTooltipShift.left = 10; calcTooltipShift.top = 3; return calcTooltipShift};
      // if (this.heightType == 'auto') { calcTooltipShift.left = 10; calcTooltipShift.top = -2; return calcTooltipShift};
      return calcTooltipShift;
    }
  },
  methods: {
    // events Head ---------------
    eventHeadMouseOver(event) {
      if (event.target.classList.contains('content')) {
        let parent = event.target.closest('.table-head__col');
          this.isTooltipTimer = setTimeout(() => {
            this.isTooltipProperties = {
              top: parent.getBoundingClientRect().top + this.calcTooltipShift.top,
              left: parent.getBoundingClientRect().left + this.calcTooltipShift.left,
              width: parent.getBoundingClientRect().width,
              height: parent.getBoundingClientRect().height,
              text: parent.getAttribute('data-overflow-text'),
            };
            this.isTooltipShow = true;
          }, 1300);
      }
    },
    eventHeadMouseOut(event) {
      if (event.relatedTarget?.classList?.contains('tooltip')) return;
      this.isTooltipShow = false;
      clearTimeout(this.isTooltipTimer);
    },
    // ---------------------------
  }
}