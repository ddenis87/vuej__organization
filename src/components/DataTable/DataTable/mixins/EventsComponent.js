export const EventsComponent = {
  methods: {
    eventRowFocused(event, option) {
      this.$emit('event-row-focused', option);
    },
    eventRowSelected(event, option) {
      this.$emit('event-row-selected', option, this.properties.tableName);
    },
    eventRowKeydown(event, option) {
      this.$emit('event-row-keydown', event, option);
    },
    eventBodyBlur() {
      this.$emit('event-component-blur');
    }
  },
}