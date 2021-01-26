export const ComputedTemplate = {
  computed: {
    computedTemplateTable() {
      let template = {
        'grid-template-areas': '',
        'grid-template-columns': '',
      };
      let headers = this.properties.headers;
      if (!headers[0].length) {
        template['grid-template-areas'] = this.computedAreaUnoLine(headers);
        template['grid-template-columns'] = this.computedWidthUnoLine(headers);
      } else {
        template['grid-template-areas'] = this.computedAreaMultiLine(headers);
        template['grid-template-columns'] = this.computedWidthMultiLine(headers);
        template['grid-template-rows'] = `repeat(${headers.length}, ${(this.typeHeight == 'fixed') ? '43px' : (this.typeHeight == 'dense') ? '22px' : 'auto'})`;
      }
      return template;
    },
    computedActionMax() { return (this.typeHeight != 'auto' && this.isExpansion == true) ? true : false; },
  },
  methods: {
    computedAreaUnoLine(array) {
      let area = '"';
      if (this.computedActionMax) area += 'action_max ';
      array.forEach(element => area += `${element.value} `);
      area = area.trim();
      area += `"`;
      return area;
    },
    computedAreaMultiLine(array) {
      let countRow = array.length;
      let area ='"';
      let areaArray = [];
      for (let i = 0; i < countRow; i++) areaArray.push([]); // initial array

      for (let i = 0; i < countRow; i++) {
        array[i].forEach(element => {
          if (element.column) {
            for (let k = 0; k < element.column; k++) areaArray[i].push(element.value);
          } else {
            areaArray[i].push((element.value) ? element.value : '.');
          }
        });
      }
      let countColumn = areaArray[0].length;
      for (let column = 0; column < countColumn; column++) {
        for (let row = 1; row < countRow; row++) {
          if (areaArray[row][column] == '.') {
            areaArray[row][column] = areaArray[row - 1][column];
          }
        }
      }
      for (let i = 0; i < countRow; i++) {
        area += areaArray[i].join(' ');
        area += (i != countRow - 1) ? '" "' : '"';
      }
      return area;
    },

    computedWidthUnoLine(array) {
      let columnWidth = '';
      if (this.computedActionMax) columnWidth += 'minmax(22px, 22px) ';
      array.forEach(element => {
        if (element.width) {
          if (Array.isArray(element.width)) {
            columnWidth += `minmax(${(element.width[0] != undefined) ? element.width[0] : '100'}px, ${(element.width[1] != undefined) ? element.width[1] + 'px' : '100vw'}) `;
          } else {
            columnWidth += `${element.width}px `
          }
        } else {
          columnWidth += `minmax(100px, 100vw) `;
        }
      });
      return columnWidth;
    },
    computedWidthMultiLine(array) {
      let countRow = array.length;
      let columnWidth = '';
      let columnWidthArray = [];
      for (let i = 0; i < countRow; i++) columnWidthArray.push([]);

      for (let i = 0; i < countRow; i++) {
        array[i].forEach(element => {
          if (element.value) {
            if (!element.column) {
              if (element.width) {
                if (Array.isArray(element.width)) {
                  columnWidthArray[i].push(`minmax(${(element.width[0] != undefined) ? element.width[0] : '100'}px, ${(element.width[1] != undefined) ? element.width[1] + 'px' : '100vw'})`);
                } else {
                  columnWidthArray[i].push(`${element.width}px `);
                }
              } else {
                columnWidthArray[i].push(`minmax(100px, 100vw)`);
              }
            } else {
              columnWidthArray[i].push(`auto`);
              for (let k = 0; k < element.column - 1; k++) columnWidthArray[i].push('auto');
            }
          } else {
            columnWidthArray[i].push(`.`);
          }
        })
      }

      let newColumnWidthArray = [];
      let countColumn = columnWidthArray[0].length;
      for (let column = 0; column < countColumn; column++) {
        if (columnWidthArray[0][column] == 'auto') {
          for (let row = 1; row < countRow; row++) {
            if (columnWidthArray[row][column] != 'auto') { 
              newColumnWidthArray.push(columnWidthArray[row][column]);
              break;
            } else {
              if (row == countRow - 1) newColumnWidthArray.push(columnWidthArray[row][column]);
            }
          }
        } else {
          newColumnWidthArray.push(columnWidthArray[0][column]);
        }
      }
      columnWidth = newColumnWidthArray.join(' ');
      // console.log(columnWidth);
      return columnWidth;
    },
  },
}