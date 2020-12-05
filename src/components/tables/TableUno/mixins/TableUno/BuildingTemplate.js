export const BuildingTemplate = {
  computed: {
    fieldsTemplate() {
      let fieldsTemplate = { 'grid-template-areas': '"', 'grid-template-columns': '' };
      let minWidth = 100;
      this.tableProperties.header.forEach(item => {
        fieldsTemplate['grid-template-areas'] += `${item.value} `;
        fieldsTemplate['grid-template-columns'] += (item.width) ? 
          (Array.isArray(item.width)) ? ` minmax(${item.width[0]}px, ${item.width[1]}px)` :  ` minmax(${item.width}px, 100vw)` : ` minmax(${minWidth}px, 100%)`;
      });
      fieldsTemplate['grid-template-areas'] += ' action_box"';
      fieldsTemplate['grid-template-columns'] += ' minmax(0px, 0px)';
      return fieldsTemplate;
    }
  }
}