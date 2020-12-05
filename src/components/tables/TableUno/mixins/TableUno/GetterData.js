export const GetterData = {
  computed: {
    listHeader() {
      let listHeaderBase = this.tableProperties.header;
      let listHeaderState = this.$store.getters[this.tableProperties.state.header.getData];
      if (listHeaderState.length != 0) {
        listHeaderBase.forEach(item => item.text = listHeaderState.find(mitem => mitem.key == item.value).label);
        // console.log(listHeaderBase);
        return listHeaderBase;
      }
    },
    listBody() { return this.$store.getters[this.tableProperties.state.body.getData]; },
  }
}