<template>
  <div class="dialog" id="boxEditingComponentDialog">
    <!-- @click.stop - stop slider list -->
    <!-- @click:append-outer - open dialog -->
    <!-- @focus - for select inner text -->

          <v-autocomplete
                        auto-select-first
                        class="dialog__select"
                        tabindex="10"
                        dense
                        single-line
                        :rules="rules"
                        v-model="cellValue" 
                        :items="cellList"
                        append-icon=""
                        hide-selected
                        append-outer-icon="mdi-dots-horizontal"
                        small
                        @input="inputInput"
                        @keydown.stop="inputEvent" 
                        @blur.stop="blurInput"
                        @focus="focusEvent"
                        @click:append-outer="isDialog = true"
                        @click.stop=""></v-autocomplete>
    <v-dialog v-model="isDialog" max-width="80%" persistent class="dialog">
      <v-card>
        <div class="dialog__box" id="dialog__box">
          <v-btn @click="dialogClose">Close</v-btn>
          <component :is="catalogComponent" v-bind:editable="false" @dblclick-row="selectInDialog"></component>
          
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'CellEditingDialog',
  components: {
  },
  props: {
    dataProps: Object,
  },
  data() {
    return {
      cellValue: this.dataProps.text,
      rules: [v => (this.dataProps.required) ? v.length > 0 : true || `мин. 1` ],
      cellEditStatus: false,
      // cellEditStatusDialog: false,
      isDialog: false,
    }
  },
  computed: {
    catalogComponent() {
      console.log(this.dataProps);
      return () => import('@/views/Catalog/CatalogBk');
    },
    cellList() {
      let cellList = [];
      this.dataProps.choices.forEach(element => {
        cellList.push({text: element['display_name'], value: element['display_name']})
      })
      return cellList;
    },
  },
  methods: {
    dialogClose(event) {
      // console.log('close dialog');
      this.isDialog = false;
      document.getElementById('boxEditingComponentDialog').querySelector('input').focus();
    },
    selectInDialog(event, param) {
      // console.log('select in dialog');
      this.isDialog = false;
      document.getElementById('boxEditingComponentDialog').querySelector('input').focus();
      let cellValueNew = event.target.closest('.table-body__col').querySelector('.box-editing-default').getAttribute('data-value');
      this.cellValue = cellValueNew;
      this.$emit('input-event', event,  {value: this.cellValue, key: 'Enter'});
      
    },
    inputInput() {
      // console.log('input input select component');
      this.cellEditStatus = true;
    },
    inputEvent(event) {
      // console.log('input select component');
      if (event.key == 'Escape') { this.$emit('input-event', event, {value: this.dataProps.text, key: 'Escape'}); return; }
      if (event.key == 'Enter') {
        if (this.cellEditStatus) {
          this.$emit('input-event', event,  {value: this.cellValue, key: 'Enter'}); return;
        }
      }
      if (event.key == 'Tab') { console.log('tab'); event.preventDefault(); this.$emit('input-event', event, {value: this.cellValue, key: 'Tab'}); return; }
    },
    blurInput(event) {
      // console.log('blur dialog component');
      if (this.cellEditStatus) { this.$emit('input-blur', event); return; }
      if (event.relatedTarget && event.relatedTarget.classList.contains('table-body__col')) {
        // console.log('blur outer component');
        this.$emit('input-blur', event);
        return;
      }
    },
    focusEvent(event) {
      // console.log('focus dialog component');
      setTimeout(() => { 
        console.log(event);
        event.target.select(); }, 100)
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