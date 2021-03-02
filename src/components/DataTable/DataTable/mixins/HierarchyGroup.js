export const HierarchyGroup = {
  data() {
    return {
      itemsDataGroup: [],
    }
  },
  methods: {
    toggleGroup(option) {
      this.itemsDataGroup.push(option.value);
      console.log(option);
    }
  }
}