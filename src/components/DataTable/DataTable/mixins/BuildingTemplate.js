export const BuildingTemplate = {
  computed: {
    fieldsTemplate1() {
      let fieldsTemplate = { 'grid-template-areas': '"', 'grid-template-columns': '' };
      let minWidth = 100;
      if (this.auto == false) {
        fieldsTemplate['grid-template-areas'] += 'action_max ';
        fieldsTemplate['grid-template-columns'] += 'minmax(22px, 22px) ';
      }
      this.tableProperties.header.forEach(item => {
        fieldsTemplate['grid-template-areas'] += `${item.value} `;
        if (item.width) {
          if (!Array.isArray(item.width)) {
            fieldsTemplate['grid-template-columns'] += ` ${+item.width}px`;
          } else {
            if (Array.isArray(item.width)) {
              fieldsTemplate['grid-template-columns'] += ` minmax(${(+item.width[0]) ? item.width[0] : minWidth}px, ${(+item.width[1]) ? item.width[1] + 'px' : '100vw'})`;
            } else {
              fieldsTemplate['grid-template-columns'] += ` ${minWidth}px`;
            }
          }
        } else {
          fieldsTemplate['grid-template-columns'] += ` minmax(${minWidth}px, 100vw)`;
        }
      });
      fieldsTemplate['grid-template-areas'] += ' action_box"';
      fieldsTemplate['grid-template-columns'] += ' minmax(0px, 0px)';
      // console.log(fieldsTemplate);
      return fieldsTemplate;
    },
    fieldsTemplate() {
      let fieldsTemplate = { 'grid-template-areas': '"', 'grid-template-columns': '100% 100% 100% 100% 100% 100% 100%' };
      
      if (Array.isArray(this.tableProperties.header[0])) {
        let countRow = this.tableProperties.header.length;
        for (let i = 0; i < countRow; i++) {
          // fieldsTemplate['grid-template-areas'] += '"';
          this.tableProperties.header[i].forEach((item, index, array) => {
            fieldsTemplate['grid-template-areas'] += `${(item.value) ? (item.value + ' ').repeat((item.column) ? item.column : 1) : this.tableProperties.header[i - 1][index].value + ' '}`;
            
          });
          if (i != countRow - 1) fieldsTemplate['grid-template-areas'] += `" "`;
          else fieldsTemplate['grid-template-areas'] += `"`;
        }
        console.log(fieldsTemplate);
        return fieldsTemplate;
      }
    },
  }
}