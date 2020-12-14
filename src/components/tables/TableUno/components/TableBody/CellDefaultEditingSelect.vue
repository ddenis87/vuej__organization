<template>
  <v-autocomplete id="boxEditingComponentSelect"
                  class="select"
                  dense
                  single-line
                  :rules="rules"
                  tabindex="10"
                  v-model="cellValue" 
                  :items="cellList"
                  @keydown="inputEvent" 
                  @blur="blurInput" @change="changeValue" @focus="focusEvent"></v-autocomplete>
</template>

<script>
export default {
  name: 'CellDefaultEditingSelect',
  props: {
    dataProps: Object,
  },
  computed: {
    cellList() {
      let cellList = [];
      this.dataProps.choices.forEach(element => {
        cellList.push({text: element['display_name'], value: element['display_name']})
      })
      return cellList;
    },
  },
  data() {
    return {
      cellValue: this.dataProps.text,
      rules: [v => (this.dataProps.required) ? v.length > 0 : true || `мин. 1` ],
      cellChange: false,
    }
  },
  methods: {
    inputEvent(event) {
      if (event.key == 'Enter') {
        event.preventDefault();
        return;
      } 
      this.$emit('input-event', event, this.cellValue);
    },
    blurInput(event) {
      event.preventDefault();
      this.$emit('input-blur', event);
    },
    changeValue() {
      this.$emit('input-input', event, this.cellValue);
    },
    focusEvent(event) {
      setTimeout(() => { event.target.select() }, 100) 
    },
  },
}
</script>

<style lang="scss" scoped>
.v-input {
  text-align: center;
  font-size: 14px;
  .v-input__control {
    padding: 0px;
  }
}
.v-text-field {
  margin-top: -3.5px;
   input {
    padding: 0px;
  }
}
</style>