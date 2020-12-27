export const Events = {
  methods: {
    eventRowFocused(event, option) {
      // console.log('focused row');
      // console.log(event);
      // console.log(option);
      this.$emit('event-row-focused', event, option, this.tableName);
    },
    eventRowSelected(event, option) {
      // console.log('selected row');
      // console.log(event);
      // console.log(option);
      this.$emit('event-row-selected', event, option, this.tableName);
    },

  },
}