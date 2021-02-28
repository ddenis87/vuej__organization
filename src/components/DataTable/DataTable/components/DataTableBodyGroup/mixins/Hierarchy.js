export const Hierarchy = {
  methods: {
    toggleHiaerarchy(event, option) {
      let sendOption = {
        tableName: this.tableName,
        id: option.id,
      };
      this.$store.commit('DataTable/DATA_GROUP_MODIFY', sendOption);
      let listGroup = this.$store.getters[`DataTable/GET_DATA_GROUP`](this.tableName);

      if (listGroup.length == 0) {
        sendOption = {
          tableName: this.tableName,
          group: {id: null},
        };
      } else {
        sendOption = {
          tableName: this.tableName,
          group: {id: listGroup[listGroup.length - 1].id},
        };
      }
      this.$store.commit('DataTable/SET_FILTER_PARENT', sendOption);
      this.$store.dispatch(`DataTable/REQUEST_DATA`, {tableName: this.tableName});
    },
  }
}