export const ComputedTemplate = {
  computed: {
    computedTemplateTable() {
      let template = {
        'grid-template-areas': '',
        'grid-template-columns': '',
      };
      let headers = this.headers;
        template['grid-template-areas'] = this.computedAreaUnoLine(headers);
        template['grid-template-columns'] = this.computedWidthUnoLine(headers);
      return template;
    },
  },
  methods: {
    computedAreaUnoLine(array) {
      let area = '"';
      area += 'fix-action ';
      array.forEach(element => area += `${element.key} `);
      area = area.trim();
      area += `"`;
      return area;
    },
    computedWidthUnoLine(array) {
      let columnWidth = '';
      columnWidth += 'minmax(32px, 32px) ';
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
  }
}