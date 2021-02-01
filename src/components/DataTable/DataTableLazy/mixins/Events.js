export const Events = {
  methods: {
    focusedRow(event, option) {
      this.$emit('focused-row', option);
    },
  }
}