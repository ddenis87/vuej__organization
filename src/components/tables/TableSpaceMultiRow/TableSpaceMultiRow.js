export const TABLE_SPACE_MULTI_ROW = {
  computed: {
    styleItems() {
      let styleItems = [];
      for (let i = 0; i < this.listDataProps.items.length; i++) {
        let styleProps = '';
        styleProps += `grid-area: ${this.listDataProps.items[i].spaceName}; `;

        if ('align' in this.listDataProps) styleProps += ` text-align: ${this.listDataProps.align}; `;

        if ('align' in this.listDataProps.items[i]) styleProps += ` justify-content: ${this.listDataProps.items[i].align}; `;
        if ('colorBackground' in this.listDataProps.items[i]) styleProps += ` background-color: ${this.listDataProps.items[i].colorBackground}; `;
        if ('colorText' in this.listDataProps.items[i]) styleProps += ` color: ${this.listDataProps.items[i].colorText}; `;
        styleItems.push(styleProps)
      }
      // console.log(styleItems);
      return styleItems;
    },
  }
}