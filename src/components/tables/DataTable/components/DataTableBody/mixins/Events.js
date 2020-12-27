export const Events = {
  data() {
    return {
      parentElement: null, // element table component
      isRowNowFocus: false,
      isElementNowEditing: false,
      isElementNowFocus: false,
    }
  },
  mounted() {
    this.parentElement = document.getElementById(this.parentId);
  },
  methods: {
    // events row
    eventRowMouseEnter(event) { // work if not editable and not focus
      if (!this.isElementNowEditing && !this.isElementNowFocus && !this.isRowNowFocus)
        event.target.classList.add('table-body__row_hover');
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
      this.$emit('event-row-focused', event, null);  // ?????
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

    // events element
    eventElementFocus(event) {
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
      }
    },

    // events mouse action
    eventElementDblclick(event, rowProperties, columnProperties, columnValue) {
      if (!this.checkForEditable(event, columnProperties)) return;
      this.switchDecorationToEdit(event);
      if (event.target.closest('.table-body__col').querySelector('.box-editing-default')) {
        let target = event.target.closest('.table-body__col').querySelector('.box-editing-default');
        this.mountEditingComponent(target, rowProperties.id, columnProperties, columnValue);
      }
    },

    eventElementKeydown(event) {
      if (event.code.includes('Arrow') || event.code == 'Tab') {
        event.preventDefault();
        if ((event.code == 'ArrowRight' && event.target.nextElementSibling) || (event.code =='Tab' && event.shiftKey == false)) { event.target.nextElementSibling.focus(); return }
        if ((event.code == 'ArrowLeft' && event.target.previousElementSibling) || (event.code =='Tab' && event.shiftKey == true)) { event.target.previousElementSibling.focus(); return }
        if (event.code == 'ArrowDown' && event.target.parentElement.nextElementSibling) { event.target.parentElement.nextElementSibling.children[event.target.getAttribute('tabindex')].focus(); return; }
        if (event.code == 'ArrowUp' && event.target.parentElement.previousElementSibling) { event.target.parentElement.previousElementSibling.children[event.target.getAttribute('tabindex')].focus(); return; }
      }
    }
  },
}