export const Hierarchy = {
  data() {
    return {
      currentParent: null,
      isIntoGroup: false,

    }
  },
  methods: {
    toggleHiaerarchy(option) {
      let sendOption = {
        tableName: this.tableName,
        id: null,
      }
      if (this.currentParent != option.id) { sendOption.id = option.id; this.currentParent = option.id; }
      // this.currentParent = option.id;
      this.$store.commit('DataTable/SET_FILTER_HIERARCHY', sendOption);
      this.$store.dispatch(`DataTable/REQUEST_DATA`, {tableName: this.tableName});
      // this.isIntoGroup = !this.isIntoGroup;
    },
  }
}