<template>
    <v-dialog v-model="dialog" persistent >
      <template v-slot:activator="{  }">
        <v-text-field class="dialog__text" id="boxEditingComponentDialog"
                      dense 
                      single-line
                      autofocus
                      :rules="rules"
                      v-model="cellValue"
                      append-icon="mdi-credit-card-multiple"
                      @blur="blurInput"
                      @keydown="inputEvent"
                      @focus="focusEvent" 
                      @click:append="() => {dialog = true}"></v-text-field>
      </template>
    <v-card>
      <v-card-title>BK</v-card-title>
      <v-divider></v-divider>
      <v-data-table fixed-header
                    disable-filtering
                    disable-pagination
                    hide-default-footer
                    :headers="dataListHeader"
                    :items="cellList" height="500"
                    @dblclick:row="selectItem"></v-data-table>
      <v-divider></v-divider>

    </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'CellDefaultEditingDialog',
  props: {
    dataProps: Object,
  },
  computed: {
    dataListHeader() {
      let dataListHeader = [
        {text: 'Id', value: 'value'},
        {text: 'Наименование', value: 'display_name'}
      ];
      return dataListHeader;
    },
  },
  data() {
    return {
      dialog: null,
      cellValue: this.dataProps.text,
      cellList: this.dataProps.choices,
      rules: [v => (this.dataProps.required) ? v.length > 0 : true || `мин. 1` ],
      cellEditStatus: false,
    }
  },
  methods: {
    selectItem(event) {
      this.cellValue = event.target.innerText;
      this.cellEditStatus = true;
      let parentElement = document.getElementById('boxEditingComponentDialog');
      let inputEvent = new CustomEvent('keydown');
      parentElement.dispatchEvent(inputEvent);
      this.dialog = null;
      // parentElement.focus(); // focus ?
    },
    inputEvent(event) {
      // event.preventDefault();

      // if (this.dataProps.required) {
      if (event.key == 'Escape') {
        // event.preventDefault();
        // console.log(event);
        this.$emit('input-blur', event);
        return;
      }
      if (event.key == 'Enter') {
        if (!this.cellEditStatus) this.$emit('input-blur', event);
        event.preventDefault();
        this.$emit('input-event', event, this.cellValue);
        return;
      }
          // return;}
      // }
      
      // event.preventDefault();
      if (event.key == 'Tab') {
        this.$emit('input-event', event, this.cellValue);
        this.$emit('input-blur', event);
      }
      
    },
    blurInput(event) {
      
      // console.log(event);
      if (this.cellEditStatus) {
        // event.preventDefault();
        // console.log('edit blur');
        this.cellEditStatus = false;
        this.$emit('input-blur', event);
        return;
      }
      if (event.relatedTarget && event.relatedTarget.classList[0] == 'table-body__col') {
        // console.log('relate target blur');
        this.$emit('input-blur', event);
        return;
      }

    },
    focusEvent(event) {
      setTimeout(() => { event.target.select() }, 100) 
    },
  },
}
</script>

<style lang="scss" scoped>
.v-input {
  font-size: 14px;
}
::v-deep {
  .v-icon {
    font-size: 14px;
  }
}

.v-text-field {
  margin-top: -3.5px;
}
</style>