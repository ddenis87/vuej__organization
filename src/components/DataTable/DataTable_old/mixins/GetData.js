export const GetData = {
  computed: {
    listHeader() {
      let listHeaderBase = this.tableProperties.header;
      let listHeaderState = this.$store.getters[`DataTable/GET_LIST_OPTION`](this.tableName);
      console.log(listHeaderState);
      let shiftLeft = 0;
      if (listHeaderState.length != 0) {
        let newListHeaderBase = [];
        for (let i = 0; i < listHeaderBase.length; i++) {
          newListHeaderBase.push(...listHeaderBase[i]);
        }
        listHeaderBase = [];
        for (let i = 0; i < newListHeaderBase.length; i++) {
          for (let key in newListHeaderBase[i]) {
            listHeaderBase.push(newListHeaderBase[i]);
            break;
          }
        }
        console.log(newListHeaderBase);
        listHeaderBase.forEach((element, index, array) => {
          if (element.value in listHeaderState) {
            Object.assign(element, listHeaderState[element.value])
            element.position = `grid-area: ${element.value}`;
          }
          if ('fixed' in element) {
            shiftLeft = (array[index - 1]) ? (array[index - 1].width) ? +array[index - 1].width[0] + +shiftLeft : +100 : +0;
            element.position = {
              position: 'sticky',
              left: `${shiftLeft}px`,
              'background-color': 'rgba(242, 242, 242, 1)',
              
            }
          }
        });
        console.log(listHeaderBase);
        return listHeaderBase;
      }
    },
    listBody() {
      // console.log(this.$store.getters[`DataTable/GET_LIST_DATA`](this.tableName));
      return this.$store.getters[`DataTable/GET_LIST_DATA`](this.tableName);
    },
    countRowInBase() {
      return this.$store.getters[`DataTable/GET_LIST_DATA_COUNT`](this.tableName);
    },
    countRowLoad() {
      return this.$store.getters[`DataTable/GET_LIST_DATA`](this.tableName).length;
    }
  }
}