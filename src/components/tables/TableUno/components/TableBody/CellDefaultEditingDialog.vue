<template>
  <div class="box-editing-component dialog"
       id="boxEditingComponentDialog"
       tabindex="10"
       @blur="blurInput"
       @keydown="inputEvent" >

    <v-dialog v-model="dialog" persistent >
      <template v-slot:activator="{ on, attrs }">
        <input class="dialog__text" 
               :value="cellValue" disabled>
        <v-btn icon small class="dialog__btn" v-bind="attrs" v-on="on">
          <v-icon small>mdi-credit-card-multiple</v-icon>
        </v-btn>
      </template>
    <v-card>
      <v-card-title>BK</v-card-title>
      <v-divider></v-divider>
      <v-data-table fixed-header
                    disable-filtering
                    disable-pagination
                    hide-default-footer
                    :headers="dataListHeader"
                    :items="dataList" height="500"
                    @dblclick:row="selectItem"></v-data-table>
      <v-divider></v-divider>

    </v-card>
    </v-dialog>
    
  </div>
</template>

<script>
export default {
  name: 'CellDefaultEditingDialog',
  props: {
    dataValue: String,
    dataList: null,
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
      cellValue: this.dataValue,
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
    },
    inputEvent(event) {
      setTimeout(() => {event.target.focus()}, 100) ;
      this.$emit('input-event', event, this.cellValue);
    },
    blurInput(event) {
      if (this.cellEditStatus) {
        this.$emit('input-blur', event);
        return;
      }
      if (event.relatedTarget && event.relatedTarget.classList[0] == 'table-body__col') {
        this.$emit('input-blur', event);
        return;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  outline: none;
  &__text {
    width: 100%;
    background-color: #FFFFFF;
    outline: none;
    z-index: 100;
    &:disabled { color: inherit; }
  }
  &__btn {
    width: 30px;
  }
}
</style>