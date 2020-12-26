export const Events = {
  data() {
    return {
      isElementNowEditing: false,
      isElementNowFocus: false,
    }
  },
  methods: {
    // events mouse move
    eventMouseEnterRow(event) { // work if not editable and not focus
      if (!this.isElementNowEditing && !this.isElementNowFocus)
        event.target.classList.add('table-body__row_hover');
    },
    eventMouseLeaveRow(event) { // work if not editable and not focus
      if (!this.isElementNowEditing && !this.isElementNowFocus) 
        event.target.classList.remove('table-body__row_hover');
    },
    eventFocusToElement(event) {
      this.isElementNowFocus = true;
      event.target.parentElement.classList.remove('table-body__row_hover');
      event.target.parentElement.classList.add('table-body__row_focus');
      event.target.classList.add('table-body__col_focus');
    },
    eventBlurToElemet(event) {
      this.isElementNowFocus = false;
      event.target.parentElement.classList.remove('table-body__row_focus');
      event.target.classList.remove('table-body__col_focus');
    },

    // events mouse action
    eventDblclickToElement(event, rowProperties, columnProperties, columnValue) {
      console.log(event);
      console.log(rowProperties);
      console.log(columnProperties);
      console.log(columnValue);
      if (!this.checkForEditable(event, columnProperties)) return;
      this.switchDecorationToEdit(event);

      console.log('run edit');
    },

    // function
    checkForEditable(event, columnProperties) {
      if (!this.editable) { return false; } // if table properties editable set in false // ??? emit rowProperties
      if (columnProperties['read_only']) { return false; } // field not can edit
      if (event.target.closest('.table-body__col').querySelector('.box-display.display-none')) { return false; } // if we are already editing
      return true;
    },

    editingCanceled() { this.switchDecorationToDisplay(); },
    editingAccepted() { this.switchDecorationToDisplay(); },

    switchDecorationToDisplay() {
      this.isElementNowEditing = false; // status editing
      let editableElement = document.querySelector('.table-body__col_editing');
      editableElement.classList.remove('table-body__col_editing');
      editableElement.querySelector('.box-display').classList.remove('display-none');
      editableElement.querySelector('.box-editing').classList.add('display-none');
      // editableElement.parentElement.classList.remove('table-body__row_hover');
    },
    switchDecorationToEdit(event) {
      this.isElementNowEditing = true; // status editing
      let editableElement = event.target.closest('.table-body__col');
      editableElement.classList.add('table-body__col_editing');
      editableElement.querySelector('.box-display').classList.add('display-none');
      editableElement.querySelector('.box-editing').classList.remove('display-none');
      // editableElement.parentElement.classList.add('table-body__row_hover');
    },
  },
}