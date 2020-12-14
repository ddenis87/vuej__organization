export const GetterData = {
  computed: {
    listHeader() {
      let listHeaderBase = this.tableProperties.header;
      let listHeaderState = this.$store.getters[this.tableProperties.state.header.getData];
      let shiftLeft = 0;
      if (listHeaderState.length != 0) {
        
        listHeaderBase.forEach((item, index, array) => {
          if (listHeaderState.find(mitem => mitem.key == item.value)) {
            let itemState = listHeaderState.find(mitem => mitem.key == item.value);
            item.text = itemState.label;
            item.type = itemState.type;
            if (itemState.choices != undefined) item.choices = itemState.choices;
            item['read_only'] = itemState['read_only'];
            item.required = itemState.required;
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
        // console.log(listHeaderBase);
        return listHeaderBase;
      }
    },
    listBody() { return this.$store.getters[this.tableProperties.state.body.getData]; },
  }
}