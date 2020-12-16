<template>
  <v-autocomplete id="boxEditingComponentSelect"
                  auto-select-first
                  class="select"
                  tabindex="10"
                  dense
                  single-line
                  :rules="rules"
                  v-model="cellValue" 
                  :items="cellList"
                  append-outer-icon="mdi-credit-card-multiple"
                  small
                  @input="inputInput"
                  @keydown.stop="inputEvent" 
                  @blur.stop="blurInput"
                  @change="changeValue"
                  @focus="focusEvent"></v-autocomplete>
</template>

<script>
export default {
  name: 'CellDefaultEditingDialog',
  props: {
    dataProps: Object,
  },
  data() {
    return {
      cellValue: this.dataProps.text,
      rules: [v => (this.dataProps.required) ? v.length > 0 : true || `мин. 1` ],
      cellEditStatus: false,
    }
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
  methods: {
    inputInput() {
      console.log('input input select component');
      this.cellEditStatus = true;
    },
    inputEvent(event) {
      console.log('input select component');
      console.log(event);
      if (event.key == 'Escape') { this.$emit('input-event', event, {value: this.dataProps.text, key: 'Escape'}); return; }
      if (event.key == 'Enter') {
        if (this.cellEditStatus) {
            this.$emit('input-event', event,  {value: this.cellValue, key: 'Enter'}); return;
        }
      }
      if (event.key == 'Tab') { console.log('tab'); event.preventDefault(); this.$emit('input-event', event, {value: this.cellValue, key: 'Tab'}); return; }
    },
    blurInput(event) {
      console.log('blur select component');
      this.$emit('input-blur', event);
    },
    changeValue() {
      console.log('change select component');
    },
    focusEvent(event) {
      console.log('focus select component');
      setTimeout(() => { event.target.select() }, 10) 
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