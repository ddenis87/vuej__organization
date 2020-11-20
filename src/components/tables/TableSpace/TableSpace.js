export const TABLE_SPACE = {
  computed: {
    styleItems() {
      let styles = [];
      for (let i = 0; i < this.listDataProps.items.length; i++) {
        let styleProps = '';
        if ('align' in this.listDataProps) styleProps += ` text-align: ${this.listDataProps.align}; `;

        if ('width' in this.listDataProps.items[i]) styleProps += ` width: ${this.listDataProps.items[i].width}px; `;
        if ('align' in this.listDataProps.items[i]) styleProps += ` text-align: ${this.listDataProps.items[i].align}; `;
        if ('colorBackground' in this.listDataProps.items[i]) styleProps += ` background-color: ${this.listDataProps.items[i].colorBackground}; `;
        if ('colorText' in this.listDataProps.items[i]) styleProps += ` color: ${this.listDataProps.items[i].colorText}; `;
        styles.push(styleProps)
      }
      return styles;
    },
  }
}