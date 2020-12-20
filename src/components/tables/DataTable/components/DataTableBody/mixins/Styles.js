export const Styles = {
  computed: {
    styleRow() {
      let styleRow = [];
      styleRow.push(`table-body__row_${this.heightType}`);
      if (!this.editable) {
        styleRow.push(`table-body__row_editable_false`);
      }
      return styleRow;
    },
    styleCell() {
      let styleCell = [];
      styleCell.push(`table-body__col_${this.heightType}`);
      return styleCell;
    },
  },
}