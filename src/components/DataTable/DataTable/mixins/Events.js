export const Events = {
  methods: {
    eventRowFocused(event, option) {
      // this.$emit('event-row-focused', event, option, this.tableName);
      this.$emit('event-row-focused', option);
    },
    eventRowSelected(event, option) {
      this.$emit('event-row-selected', event, option, this.tableName);
    },

  },
}