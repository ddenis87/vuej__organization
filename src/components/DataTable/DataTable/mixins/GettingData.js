export const GettingData = {
  computed: {
    getDataHeader() {
      let headerBase = [];
      let headerReturn = [];
      let headerStore = this.storeGetOptions();

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
      return headerReturn;
    },
  }
}