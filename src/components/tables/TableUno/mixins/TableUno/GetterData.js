export const GetterData = {
  computed: {
    listHeader() {
      let listHeaderBase = this.tableProperties.header;
      let listHeaderState = this.$store.getters[this.tableProperties.state.header.getData];
      if (listHeaderState.length != 0) {
        listHeaderBase.forEach((item, index, array) => {
          item.text = listHeaderState.find(mitem => mitem.key == item.value).label;
          if ('fixed' in item) {
            let shiftLeft = (array[index - 1]) ? (array[index - 1].width) ? `${+array[index - 1].width[0]}` : '100' : '0';
            item.position = {
              position: 'sticky',
              left: `${shiftLeft}px`,
              'z-index': 50
            }
          }
      });
        // console.log(listHeaderBase);
        return listHeaderBase;
      }
    },
    listBody() { return this.$store.getters[this.tableProperties.state.body.getData]; },
  }
}