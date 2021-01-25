export const Events = {
  data() {
    return {
      isRowFocus: false,
      isColumnEditing: false,
      isColumnFocus: false,

      isTooltipShow: false,
      isTooltipTimer: null,
      isTooltipProperties: { top: 0, left: 0, width: 0, height: 0, text: '' },
    }
  },
  computed: {
    computedTooltipShift() {
      let calcTooltipShift = { left: 10, top: 4 };
      if (this.typeHeight == 'fixed' && this.typeColumn == 'fixed') { calcTooltipShift.left = 4; calcTooltipShift.top = -2; return calcTooltipShift};
      if (this.typeHeight == 'fixed' && this.typeColumn == 'dense') { calcTooltipShift.left = 0; calcTooltipShift.top = -2; return calcTooltipShift};
      if (this.typeHeight == 'dense' && this.typeColumn == 'fixed') { calcTooltipShift.left = 4; calcTooltipShift.top = -2; return calcTooltipShift};
      if (this.typeHeight == 'dense' && this.typeColumn == 'dense') { calcTooltipShift.left = 0; calcTooltipShift.top = -2; return calcTooltipShift};
      return calcTooltipShift;
    },
  },
  methods: {
    // EVENT EXPANSION ROW
    eventExpansionRow(event) {
      event.target.closest('.action-btn').classList.toggle('action-btn_action');
      event.target.closest('.body-row').classList.toggle('body-row_auto');
      let celsDisplay = event.target.closest('.body-row').querySelectorAll('.content-display');
      celsDisplay.forEach(element => {
        element.classList.toggle('content-display_auto');
      });
    },

    // EVENT HOVER BODY TABLE (HOVER ROW, TOOLTIP)
    eventMouseOver(event) {
      if (!this.isColumnEditing && !this.isRowFocus) {
        event.target.closest('.body-row')?.classList.add('body-row_hover');
        this.tooltipShow(event);
      }
    },
    eventMouseOut(event) {
      if (event.relatedTarget?.classList?.contains('tooltip')) return;
      if (!this.isColumnEditing && !this.isRowFocus) {
        event.target.closest('.body-row')?.classList.remove('body-row_hover');
        this.tooltipHide(event);
      }
    },
    
    // EVENT FOCUS/SELECT/BLUR ROW
    eventRowFocus(event) {
      this.isRowFocus = true;
      event.target.classList.remove('body-row_hover');
      event.target.classList.add('body-row_focus');
    },
    eventRowBlur(event) {
      this.isRowFocus = false;
      event.target.classList.remove('body-row_focus');
    },
    eventRowClick(event, itemRow) {
      this.$emit('event-row-focused', event, itemRow);
    },
    eventRowDblclick(event, itemRow) {
      this.$emit('event-row-selected', event, itemRow);
    },

    // EVENT FOCUS/BLUR COLUMN
    eventColumnFocus(event) {
      this.isTooltipShow = false; // hide tooltip
      this.isColumnFocus = true;
      event.target.parentElement.classList.remove('body-row_hover');
      event.target.parentElement.classList.add('body-row_focus');
      event.target.classList.add('body-column_focus');
    },
    eventColumnBlur(event) {  // work if not editable
      if (!this.isColumnEditing) {
        this.isColumnFocus = false;
        event.target.parentElement.classList.remove('body-row_focus');
        event.target.classList.remove('body-column_focus');
      }
    },

    // EVENT TOGGLE EDITING COLUMN
    eventColumnDblclick(event, rowProperties, columnProperties, columnValue) {
      if (!this.checkForEditable(event, columnProperties)) return;  // checkForEditable - in mixin Editing
      this.switchDecorationToEdit(event);  // switchDecorationToEdit - in mixin Editing
      if (event.target.closest('.body-column').querySelector('.box-editing-default')) {
        let target = event.target.closest('.body-column').querySelector('.box-editing-default');
        this.mountEditingComponent(target, rowProperties.id, columnProperties, columnValue);  // mountEditingComponent - in mixin Editing
      }
    },

    // EVENT NAVIGATION FOR TABLE
    eventRowKeydown(event) {
      if (event.code.includes('Arrow') || event.code == 'Tab') {
        event.preventDefault();
        if ((event.code == 'ArrowDown' && event.target.nextElementSibling) || (event.code =='Tab' && event.shiftKey == false)) { event.target.nextElementSibling.focus(); return }
        if ((event.code == 'ArrowUp' && event.target.previousElementSibling) || (event.code =='Tab' && event.shiftKey == true)) { event.target.previousElementSibling.focus(); return }
      }
    },
    eventColumnKeydown(event, rowProperties, columnProperties, columnValue) {
      if (event.code.includes('Arrow') || event.code == 'Tab') {
        event.preventDefault();
        if ((event.code == 'ArrowRight' && event.target.nextElementSibling) || (event.code =='Tab' && event.shiftKey == false)) { event.target.nextElementSibling.focus(); return }
        if ((event.code == 'ArrowLeft' && event.target.previousElementSibling) || (event.code =='Tab' && event.shiftKey == true)) { event.target.previousElementSibling.focus(); return }
        if (event.code == 'ArrowDown' && event.target.parentElement.nextElementSibling) { event.target.parentElement.nextElementSibling.children[event.target.getAttribute('tabindex')].focus(); return; }
        if (event.code == 'ArrowUp' && event.target.parentElement.previousElementSibling) { event.target.parentElement.previousElementSibling.children[event.target.getAttribute('tabindex')].focus(); return; }
      }
      if (event.code.includes('Key') || event.code.includes('Digit')) this.eventColumnDblclick(event, rowProperties, columnProperties, columnValue);
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
      if (event.relatedTarget?.classList?.contains('tooltip')) return;
      this.isTooltipShow = false;
      clearTimeout(this.isTooltipTimer);
    },
  }
}