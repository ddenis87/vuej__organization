export const Hierarchy = {
  methods: {
    toggleHiaerarchy(event, option) {
      // console.log(option);
      let sendOption = {
        tableName: this.tableName,
        group: option,
      };
      this.$store.commit('DataTable/DATA_GROUP_ADDING', sendOption);
      this.$store.commit('DataTable/SET_FILTER_PARENT', sendOption);
      this.$store.dispatch(`DataTable/REQUEST_DATA`, {tableName: this.tableName});
    }
  }
}