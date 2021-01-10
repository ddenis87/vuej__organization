export const Events = {
  data() {
    return {
      parentElement: null, // element table component
      isRowNowFocus: false,
      isElementNowEditing: false,
      isElementNowFocus: false,
      isTooltipProperties: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        text: ''
      },
      isTooltipTimer: null,
      isTooltipShow: false,
      // isTooltipShift: {
      //   left: 10,
      //   top: 4,
      // }
    }
  },
  computed: {
    calcTooltipShift() {
      let calcTooltipShift = { left: 10, top: 4 };
      if (this.heightType == 'fixed' && this.paddingType == 'fixed') { calcTooltipShift.left = 10; calcTooltipShift.top = -2; return calcTooltipShift};
      if (this.heightType == 'fixed' && this.paddingType == 'dense') { calcTooltipShift.left = 0; calcTooltipShift.top = -2; return calcTooltipShift};
      if (this.heightType == 'dense' && this.paddingType == 'dense') { calcTooltipShift.left = 0; calcTooltipShift.top = -2; return calcTooltipShift};
      // if (this.heightType == 'auto' && this.paddingType == 'fixed') { calcTooltipShift.left = 10; calcTooltipShift.top = 4; return calcTooltipShift};
      // if (this.heightType == 'fixed' && this.paddingType == 'fixed') { calcTooltipShift.left = 10; calcTooltipShift.top = 4; return calcTooltipShift};
      return calcTooltipShift;
    },
  },
  mounted() {
    this.parentElement = document.getElementById(this.parentId);
  },
  methods: {
    // events Body ---------------
    eventBodyMouseOver(event) {
      if (event.target.classList.contains('content')) {
        let parent = event.target.closest('.table-body__col');
        if (parent.classList.contains('table-body__col_focus')) return;
          this.isTooltipTimer = setTimeout(() => {
            this.isTooltipProperties = {
              top: parent.getBoundingClientRect().top + this.calcTooltipShift.top,
              left: parent.getBoundingClientRect().left + this.calcTooltipShift.left,
              width: parent.getBoundingClientRect().width,
              height: parent.getBoundingClientRect().height,
              text: parent.getAttribute('data-overflow-text'),
            };
          }, 1300);
      }
    },
    eventBodyMouseOut(event) {
      if (event.relatedTarget?.classList?.contains('tooltip')) return;
      this.isTooltipShow = false;
      clearTimeout(this.isTooltipTimer);
    },
    // ---------------------------

    // events Row ----------------
    eventRowMouseEnter(event) { // work if not editable and not focus
      if (!this.isElementNowEditing && !this.isElementNowFocus && !this.isRowNowFocus)
        event.target.classList.add('table-body__row_hover');
        event.target.classList.add('table-body__row_max');
    },
    eventRowMouseLeave(event) { // work if not editable and not focus
      if (!this.isElementNowEditing && !this.isElementNowFocus && !this.isRowNowFocus)
        event.target.classList.remove('table-body__row_hover');
    },
    eventRowFocus(event) {
      // check for editable ?????
      this.isRowNowFocus = true;
      event.target.classList.remove('table-body__row_hover');
      event.target.classList.add('table-body__row_focus');
    },
    eventRowBlur(event) {
      this.isRowNowFocus = false;
      event.target.classList.remove('table-body__row_focus');
      // this.$emit('event-row-focused', event, null);  // ?????
    },
    eventRowClick(event, itemRow) {
      this.$emit('event-row-focused', event, itemRow);
    },
    eventRowDblclick(event, itemRow) {
      this.$emit('event-row-selected', event, itemRow);
    },
    eventRowKeydown(event) {
      if (event.code.includes('Arrow') || event.code == 'Tab') {
        event.preventDefault();
        if ((event.code == 'ArrowDown' && event.target.nextElementSibling) || (event.code =='Tab' && event.shiftKey == false)) { event.target.nextElementSibling.focus(); return }
        if ((event.code == 'ArrowUp' && event.target.previousElementSibling) || (event.code =='Tab' && event.shiftKey == true)) { event.target.previousElementSibling.focus(); return }
      }
    },
    // ---------------------------

    // events Column ----------------
    eventElementFocus(event) {
      // -- hide tooltip ---------------
      this.isTooltipShow = false;
      clearTimeout(this.isTooltipTimer);
      // -------------------------------
      this.isElementNowFocus = true;
      event.target.parentElement.classList.remove('table-body__row_hover');
      event.target.parentElement.classList.add('table-body__row_focus');
      event.target.classList.add('table-body__col_focus');
    },
    eventElementBlur(event) {  // work if not editable
      if (!this.isElementNowEditing) {
        this.isElementNowFocus = false;
        event.target.parentElement.classList.remove('table-body__row_focus');
        event.target.classList.remove('table-body__col_focus');
        // this.$emit('event-row-focused', event, null) // ????? может другое имя события? чтоб не путаться
      }
    },

    // event transition edit mode
    eventElementDblclick(event, rowProperties, columnProperties, columnValue) {
      if (!this.checkForEditable(event, columnProperties)) return;  // checkForEditable - in mixin Editing
      this.switchDecorationToEdit(event);  // switchDecorationToEdit - in mixin Editing
      if (event.target.closest('.table-body__col').querySelector('.box-editing-default')) {
        let target = event.target.closest('.table-body__col').querySelector('.box-editing-default');
        this.mountEditingComponent(target, rowProperties.id, columnProperties, columnValue);  // mountEditingComponent - in mixin Editing
      }
    },

    // event navigation for table
    eventElementKeydown(event, rowProperties, columnProperties, columnValue) {
      if (event.code.includes('Arrow') || event.code == 'Tab') {
        event.preventDefault();
        if ((event.code == 'ArrowRight' && event.target.nextElementSibling) || (event.code =='Tab' && event.shiftKey == false)) { event.target.nextElementSibling.focus(); return }
        if ((event.code == 'ArrowLeft' && event.target.previousElementSibling) || (event.code =='Tab' && event.shiftKey == true)) { event.target.previousElementSibling.focus(); return }
        if (event.code == 'ArrowDown' && event.target.parentElement.nextElementSibling) { event.target.parentElement.nextElementSibling.children[event.target.getAttribute('tabindex')].focus(); return; }
        if (event.code == 'ArrowUp' && event.target.parentElement.previousElementSibling) { event.target.parentElement.previousElementSibling.children[event.target.getAttribute('tabindex')].focus(); return; }
      }
      if (event.code.includes('Key') || event.code.includes('Digit')) this.eventElementDblclick(event, rowProperties, columnProperties, columnValue);
    }
  },
}