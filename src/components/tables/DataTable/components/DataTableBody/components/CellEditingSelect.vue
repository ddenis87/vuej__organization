<template>
  <v-autocomplete id="boxEditingComponentSelect"
                  auto-select-first
                  class="select"
                  tabindex="10"
                  dense
                  single-line
                  return-object
                  v-model="cellValue" 
                  :items="cellList"
                  @input="inputInput"
                  @keydown.stop="inputEvent" 
                  @blur.stop="blurInput"
                  @focus="focusEvent"></v-autocomplete>
</template>

<script>
export default {
  name: 'CellEditingSelect',
  props: {
    dataProps: Object,
  },
  data() {
    return {
      cellValue: this.dataProps.text,
      // rules: [v => (this.dataProps.required) ? v.length > 0 : true || `мин. 1` ],
      cellEditStatus: false,
    }
  },
  computed: {
    cellList() {
      // console.log(this.dataProps);
      let cellList = [];
      this.dataProps.choices.forEach(element => {
        cellList.push({text: element['display_name'], value: `${element['value']}`})
      })
      return cellList;
    },
  },
  methods: {
    inputInput() {
      // console.log('input input select component');
      this.cellEditStatus = true;
    },
    inputEvent(event) {
      // console.log('input select component');
      if (event.key == 'Escape') { this.$emit('input-event', event, {value: this.dataProps.text, key: 'Escape'}); return; }
      if (event.key == 'Enter') {
        if (this.cellEditStatus) {
          // console.log(this.cellValue);
          this.$emit('input-event', event,  {value: this.cellValue, key: 'Enter'}); return;
        }
      }
      if (event.key == 'Tab') {
        event.preventDefault();
        
        if (this.cellEditStatus) {
          // console.log(this.cellValue);
          this.$emit('input-event', event, {value: this.cellValue, key: 'Tab'}); return;
        } 
        else {
          // console.log(this.dataProps);
          this.cellValue = {
            text: this.dataProps.choices.find(item => item.value == this.cellValue).display_name,
            value: this.dataProps.text
          }
          // console.log(this.cellValue);
          this.$emit('input-event', event, {value: this.cellValue, key: 'Tab'}); return;
        }
      }
    },
    blurInput(event) {
      // console.log('blur select component');
      this.$emit('input-blur', event);
    },
    focusEvent(event) {
      // console.log('focus select component');
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
::v-deep {
  .v-input__append-inner {
    cursor: pointer;
  }
}
</style>