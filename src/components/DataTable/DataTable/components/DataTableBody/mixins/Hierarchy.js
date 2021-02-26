export const Hierarchy = {
  data() {
    return {
      currentParent: null,
      listGroup: [],
    }
  },
  watch: {

  },
  updated() {
    this.listGroup.forEach(element => {
      if (document.querySelector(`.body-column__group[data-id="${element}"]`))
        document.querySelector(`.body-column__group[data-id="${element}"]`).querySelector('.action-btn').classList.add('action-btn_action');
    });
  },
  methods: {
    toggleHiaerarchy(event, option) {
      console.log(event);
      console.log(option);
      if (!this.listGroup.includes(option.id)) {
        this.listGroup.push(option.id);
      } else {
        let index = this.listGroup.indexOf(option.id);
        this.listGroup = this.listGroup.slice(0, index);
        document.querySelector(`.body-column__group[data-id="${option.id}"]`).querySelector('.action-btn').classList.remove('action-btn_action');
      }
      let sendOption = {
        tableName: this.tableName,
        id: (this.listGroup[this.listGroup.length - 1]) ? this.listGroup[this.listGroup.length - 1] : null,
      }
      this.$store.commit('DataTable/SET_FILTER_PARENT', sendOption);
      this.$store.dispatch(`DataTable/REQUEST_DATA`, {tableName: this.tableName});
    },
  }
}