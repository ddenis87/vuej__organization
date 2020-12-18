export const GetterData = {
  computed: {
    listHeader() {
      let listHeaderBase = this.tableProperties.header;
      let listHeaderState = this.$store.getters[`${this.stateName}/GET_LIST_FIELD`];
      let shiftLeft = 0;
      if (listHeaderState.length != 0) {
        
        listHeaderBase.forEach((item, index, array) => {
          if (listHeaderState.find(mitem => mitem.key == item.value)) {
            let itemState = listHeaderState.find(mitem => mitem.key == item.value);
            Object.assign(item, itemState);
          }
          if ('fixed' in item) {
            shiftLeft = (array[index - 1]) ? (array[index - 1].width) ? +array[index - 1].width[0] + +shiftLeft : +100 : +0;
            item.position = {
              position: 'sticky',
              left: `${shiftLeft}px`,
              'z-index': 50
            }
          }
      });
        return listHeaderBase;
      }
    },
    listBody() { return this.$store.getters[`${this.stateName}/GET_LIST_DATA`]; },
  }
}