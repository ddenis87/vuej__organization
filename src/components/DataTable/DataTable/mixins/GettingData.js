export const GettingData = {
  computed: {
    gettingDataHeader() {
      let headerBase = [];
      let headerReturn = [];
      let headerStore = this.$store.getters[`DataTable/GET_OPTIONS`](this.properties.tableName);

      if (Array.isArray(this.properties.headers[0])) {
        for (let i = 0; i < this.properties.headers.length; i++) { headerBase.push(...this.properties.headers[i]) }
      } else {
        headerBase = this.properties.headers;
      }
      
      headerBase.forEach(element => {
        if (element.value in headerStore) {
          headerReturn.push(Object.assign(element, headerStore[element.value], {'position_in_template': `grid-area: ${element.value}`}));
        }
      });
      // console.log(headerReturn);
      return headerReturn;
    },
    gettingDataBody() {
      if ('tableName' in this.properties)
        return this.$store.getters[`DataTable/GET_DATA`](this.properties.tableName);
    },
  }
}