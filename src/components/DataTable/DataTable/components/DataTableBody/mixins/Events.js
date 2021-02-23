export const Events = {
  data() {
    return {
      isRowFocus: false,
      isColumnEditing: false,
      isColumnFocus: false,
    }
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

    // EVENT FOCUS/SELECT/BLUR ROW
    eventRowFocus(event, itemRow) {
      this.isRowFocus = true;
      event.target.classList.remove('body-row_hover');
      event.target.classList.add('body-row_focus');
      this.$emit('event-row-focused', event, itemRow);
    },
    eventRowBlur(event) {
      this.isRowFocus = false;
      event.target.classList.remove('body-row_focus');
      this.emitBlurBody(event);
    },
    // eventRowClick(event, itemRow) {
    //   // this.$emit('event-row-focused', event, itemRow); /// ??????????
    // },
    eventRowDblclick(event, itemRow) {
      let newItemRow = Object.assign({}, itemRow);
      if ('text' in newItemRow) delete newItemRow.text;
      this.$emit('event-row-selected', event, newItemRow);
    },

    // EVENT FOCUS/BLUR COLUMN
    eventColumnFocus(event, itemRow) {
      this.isTooltipShow = false; // hide tooltip
      this.isColumnFocus = true;
      event.target.parentElement.classList.remove('body-row_hover');
      event.target.parentElement.classList.add('body-row_focus');
      event.target.classList.add('body-column_focus');
      this.$emit('event-row-focused', event, itemRow);
    },
    eventColumnBlur(event) {  // work if not editable
      if (!this.isColumnEditing) {
        this.isColumnFocus = false;
        event.target.parentElement.classList.remove('body-row_focus');
        event.target.classList.remove('body-column_focus');
      }
      this.emitBlurBody(event);
    },

    emitBlurBody(event) { if (!event.relatedTarget) this.$emit('event-body-blur'); },

    // EVENT TOGGLE EDITING COLUMN
    eventColumnDblclick(event, itemRow, columnProperties, columnValue) {
      // console.log(itemRow);
      if (!this.checkForEditable(event, columnProperties)) {    // checkForEditable - in mixin Editing
        if (this.isModeAdding) {
          // console.log(event.target.nextElementSibling);
          let nextEditableElement = event.target.nextElementSibling;
          if(!nextEditableElement) {
            this.editingAcceptedNewElement();
            return;
          }
          let nextEventDblclickToElement = new Event('dblclick', {bubbles: false});
          nextEditableElement.focus();
          nextEditableElement.dispatchEvent(nextEventDblclickToElement);
        }
        return;
      }
      this.switchDecorationToEdit(event);  // switchDecorationToEdit - in mixin Editing
      if (event.target.closest('.body-column').querySelector('.box-editing-default')) {
        let target = event.target.closest('.body-column').querySelector('.box-editing-default');
        this.mountEditingComponent(target, itemRow, columnProperties, columnValue);  // mountEditingComponent - in mixin Editing
      }
    },
  }
}