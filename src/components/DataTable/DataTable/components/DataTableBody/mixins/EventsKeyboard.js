export const EventsKeyboard = {
  methods: {
    // EVENT NAVIGATION FOR TABLE
    eventRowKeydown(event, itemRow) { // НАВИГАЦИЯ ПРИ ЗАБЛОКИРОВАННОЙ ТАБЛИЦЕ НА РЕДАКТИРОВАНИЕ (НАВИГАЦИЯ ПО СТРОКАМ)
      console.log('event row keydown');
      if (event.code.includes('Arrow') || event.code == 'Tab') {
        event.preventDefault();
        if ((event.code == 'ArrowDown' && event.target.nextElementSibling) || (event.code =='Tab' && event.shiftKey == false)) { event.target.nextElementSibling.focus(); }
        if ((event.code == 'ArrowUp' && event.target.previousElementSibling) || (event.code =='Tab' && event.shiftKey == true)) { event.target.previousElementSibling.focus(); }
      }
    },

    eventColumnKeydown(event, itemRow, itemColumn, columnValue) {
      console.log('event column keydown');
      if (event.code.includes('Arrow') || event.code == 'Tab') {
        event.preventDefault();
        if ((event.code == 'ArrowRight' && event.target.nextElementSibling) || (event.code =='Tab' && event.shiftKey == false)) { event.target.nextElementSibling.focus(); return; }
        if ((event.code == 'ArrowLeft' && event.target.previousElementSibling) || (event.code =='Tab' && event.shiftKey == true)) { event.target.previousElementSibling.focus(); return; }
        if (event.code == 'ArrowDown' || event.code == 'ArrowUp') {
          let currentIndex = event.target.getAttribute('tabindex');
          if (this.isExpansion) currentIndex++;
          if (this.isHierarchy) currentIndex++;
          if (event.code == 'ArrowDown' && event.target.parentElement.nextElementSibling.closest('.body-row')) {
            event.target.parentElement.nextElementSibling.children[currentIndex].focus();
          }
          if (event.code == 'ArrowUp' && event.target.parentElement.previousElementSibling.closest('.body-row')) { 
            event.target.parentElement.previousElementSibling.children[currentIndex].focus(); 
          }
          return;
        }
      }
      if (event.code.includes('Key') || event.code.includes('Digit') || event.code == 'Enter') {
        this.eventColumnDblclick(event, itemRow, itemColumn, columnValue); // ПЕРЕКЛЮЧАЕМСЯ В РЕЖИМ РЕДАКТИРОВАНИЯ
      }
      if (event.code == 'Insert') {
        let sendOption = {
          tableName: this.tableName,
          guid: this.guid,
          id: ('id' in itemRow) ? itemRow.id : -1,
        }
        // this.$store.commit('DataTable/DATA_STORE_ADDING_ELEMENT', sendOption);
        this.$store.dispatch('DataTable/ADDING_INLINE_ELEMENT', sendOption);
      }
    },
  }
}