export const TABLE_MULTILINE = {
  computed: {
    styleItems() {
      let parsAreas = this.listStyleLocation.split(';')[1].split(':')[1].split('" "');
      // console.log(parsAreas);
      
      let styleItems = [];
      if (this.listData.length != 0) {
        for (let i = 0; i < this.listData.length; i++) {
          let styleProps = '';
          styleProps += `grid-area: ${(this.listData[i]) ? this.listData[i].key : ''}; `;
          if (this.listDataProps) {
            let countRow = 0;
            for (let j = 0; j < parsAreas.length; j++) {
              // console.log(parsAreas[i]);
              // console.log(this.listData[i].key);
              if (parsAreas[j].includes(this.listData[i].key)) countRow++;
            }
            // console.log(this.listDataProps.height);
            // console.log(countRow);
            // styleProps += `grid`
            styleProps += `height: ${this.listDataProps.height * countRow}px; `
          }
          // console.log(styleProps);
          styleItems.push(styleProps);
        }
      }
      return styleItems;
    },
  }
}