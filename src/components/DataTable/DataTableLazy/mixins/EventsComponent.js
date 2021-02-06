export const EventsComponent = {
  methods: {
    focusedRow(event, option) {
      this.$emit('focused-row', option);
    },
    inputValue(tableValue) {
      this.$emit('input-value', tableValue);
    },
    deletingItem(index) {
      this.$emit('deleting-item', index);
    },
    // inputValue(value, indexRow) {
    //   this.$emit('input-value', value, indexRow);
    // },
  }
}