export const Hierarchy = {
  methods: {
    toggleGroup(event, option) {
      let sendOption = {
        tableName: this.tableName,
        value: option,
      };
      this.storeToggleGroup(sendOption);
    }
  }
}