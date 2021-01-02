export const Events = {
  data() {
    return {
      isTooltipProperties: {
        top: 0,
        left: 0,
        text: ''
      },
      isTooltipTimer: null,
      isTooltipShow: false,
    }
  },
  methods: {
    // events Head ---------------

    eventHeadMouseOver(event) {
      if (event.target.classList.contains('content')) {
        let parent = event.target.closest('.table-head__col');
        if (!parent.hasAttribute('data-overflow-text')) return;
          this.isTooltipTimer = setTimeout(() => {
            this.isTooltipProperties = {
              top: parent.getBoundingClientRect().top + 4,
              left: parent.getBoundingClientRect().left + 10,
              width: parent.getBoundingClientRect().width,
              text: parent.getAttribute('data-overflow-text'),
            };
            this.isTooltipShow = true;
          }, 1300);
      }
    },

    eventHeadMouseOut() {
      this.isTooltipShow = false;
      clearTimeout(this.isTooltipTimer);
    },
    // ---------------------------
  }
}