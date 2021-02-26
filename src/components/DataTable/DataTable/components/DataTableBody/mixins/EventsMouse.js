export const EventsMouse = {
  data() {
    return {
      isTooltipShow: false,
      isTooltipTimer: null,
      isTooltipProperties: { top: 0, left: 0, width: 0, height: 0, text: '' },
    }
  },
  computed: {
    computedTooltipShift() {
      let calcTooltipShift = { left: -10, top: -50 };
      if (this.typeHeight == 'fixed' && this.typeColumn == 'fixed') { calcTooltipShift.left = -1; calcTooltipShift.top = -2; return calcTooltipShift};
      if (this.typeHeight == 'fixed' && this.typeColumn == 'dense') { calcTooltipShift.left = 0; calcTooltipShift.top = -2; return calcTooltipShift};
      if (this.typeHeight == 'dense' && this.typeColumn == 'fixed') { calcTooltipShift.left = 4; calcTooltipShift.top = -2; return calcTooltipShift};
      if (this.typeHeight == 'dense' && this.typeColumn == 'dense') { calcTooltipShift.left = 0; calcTooltipShift.top = -2; return calcTooltipShift};
      return calcTooltipShift;
    },
  },
  methods: {
    // EVENT HOVER BODY TABLE (HOVER ROW, TOOLTIP)
    eventMouseOver(event) {
      if (!this.isColumnFocus && !this.isColumnEditing && !this.isRowFocus)
        event.target.closest('.body-row')?.classList.add('body-row_hover');
      if (!this.isColumnEditing) this.tooltipShow(event);
      
    },
    eventMouseOut(event) {
      if (event.relatedTarget?.classList?.contains('tooltip')) return;
      // if (!this.isColumnFocus && !this.isColumnEditing && !this.isRowFocus) /// ???????
        event.target.closest('.body-row')?.classList.remove('body-row_hover');
      this.tooltipHide(event);
      
    },

    // FUNCTION TOOLTIP
    tooltipShow(event) {
      if (event.target.classList.contains('content-display')) {
        let parent = event.target.closest('.body-column');
        this.isTooltipTimer = setTimeout(() => {
          this.isTooltipProperties = {
            top: parent.getBoundingClientRect().top + this.computedTooltipShift.top,
            left: parent.getBoundingClientRect().left + this.computedTooltipShift.left,
            width: parent.getBoundingClientRect().width,
            height: parent.getBoundingClientRect().height,
            text: parent.getAttribute('data-overflow-text'),
          };
        }, 1100);
      }
    },
    tooltipHide(event) {
      this.isTooltipProperties = {
        top: -300,
        left: -300,
        width: 0,
        height: 0,
      };
      if (event.relatedTarget?.classList?.contains('tooltip')) return;
      this.isTooltipShow = false;
      clearTimeout(this.isTooltipTimer);
    },
  }
}