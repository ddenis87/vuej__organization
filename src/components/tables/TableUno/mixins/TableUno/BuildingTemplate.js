export const BuildingTemplate = {
  computed: {
    fieldsTemplate() {
      let fieldsTemplate = { 'grid-template-areas': '"', 'grid-template-columns': '' };
      let minWidth = 100;
      this.tableProperties.header.forEach(item => {
        fieldsTemplate['grid-template-areas'] += `${item.value} `;
        if (item.width) {
          if (!Array.isArray(item.width)) {
            fieldsTemplate['grid-template-columns'] += ` ${+item.width}px`;
          } else {
            if (Array.isArray(item.width)) {
              fieldsTemplate['grid-template-columns'] += ` minmax(${(+item.width[0]) ? item.width[0] : minWidth}px, ${(+item.width[1]) ? item.width[1] + 'px' : '100%'})`;
            } else {
              fieldsTemplate['grid-template-columns'] += ` ${minWidth}px`;
            }
          }
        } else {
          fieldsTemplate['grid-template-columns'] += ` minmax(${minWidth}px, 100%)`;
        }
      });
      fieldsTemplate['grid-template-areas'] += ' action_box"';
      fieldsTemplate['grid-template-columns'] += ' minmax(0px, 0px)';
      // console.log(fieldsTemplate);
      return fieldsTemplate;
    }
  }
}