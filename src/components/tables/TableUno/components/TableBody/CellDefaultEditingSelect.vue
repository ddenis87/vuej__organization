<template>
  <v-autocomplete dense id="boxEditingComponentSelect"
  class="box-editing-component select"
                  tabindex="10"
                  v-model="cellValue" 
                  :items="cellList"
                  @keydown="inputEvent" 
                  @blur="blurInput" @change="focusSelf"></v-autocomplete>
</template>

<script>
export default {
  name: 'CellDefaultEditingSelect',
  props: {
    dataValue: null,
    dataList: null,
  },
  computed: {
    cellList() {
      let cellList = [];
      this.dataList.forEach(element => {
        cellList.push({text: element['display_name'], value: element['display_name']})
      })
      return cellList;
    },
  },
  data() {
    return {
      cellValue: this.dataValue,
    }
  },
  methods: {
    inputEvent(event) {
      // event.preventDefault();
      console.log(event);
      if (event.key == 'Enter') {
        
      }
      // 
      this.$emit('input-event', event, this.cellValue);
    },
    blurInput(event) {
      console.log('blur autocomplite');
      this.$emit('input-blur', event);
    },
    focusSelf(event) {
      console.log('change');
      // event.target.focus();
    },
  },
}
</script>

<style lang="scss" scoped>

</style>