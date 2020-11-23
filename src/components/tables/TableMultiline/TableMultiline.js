export const TABLE_MULTILINE = {
  computed: {
    styleItems() {
      let styleItems = [];
      if (this.listData.length != 0) {
        for (let i = 0; i < this.listData.length; i++) {
          let styleProps = '';
          styleProps += `grid-area: ${(this.listData[i]) ? this.listData[i].key : ''}; `;
          styleItems.push(styleProps);
        }
      }
      return styleItems;
    },
  }
}