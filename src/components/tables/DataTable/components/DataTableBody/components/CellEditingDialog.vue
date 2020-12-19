<template>
<div class="dialog" id="boxEditingComponentDialog">
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
                      @change="changeValue"
                      @focus="focusEvent"
                      @click:append-outer="openDialog"></v-autocomplete>
  <v-dialog v-model="isDialog" max-width="70%" persistent class="dialog">
    <v-card>
      <div class="dialog__box" id="dialog__box">
         <component :is="catalogComponent" @dblclick-row="selectInDialog"></component>
        <v-btn @click="dialogClose">Close</v-btn>
      </div>
    </v-card>
  </v-dialog>
</div>
  <!-- <v-dialog v-model="isDialog" max-width="70%" persistent class="dialog" id="boxEditingComponentDialog">
    <template v-slot:activator="{  }"> -->

    <!-- </template>
    <v-card>
      <div class="dialog__box" id="dialog__box">
         <component :is="catalogComponent" @dblclick-row="selectInDialog"></component>
        <v-btn @click="isDialog = false">123</v-btn>
      </div>
    </v-card>
  </v-dialog> -->
  
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
      isDialog: false,
    }
  },
  computed: {
    catalogComponent() {
      console.log(this.dataProps);
      return () => import('@/views/Catalog/CatalogBk')
    },
    cellList() {
      let cellList = [];
      this.dataProps.choices.forEach(element => {
        cellList.push({text: element['display_name'], value: element['display_name']})
      })
      return cellList;
    },
  },
  mounted() {
    // console.log(document.querySelector('.dialog'));
    // console.log(this.$store);
    // this.$options.components.catalogBk = require('@/views/Catalog/CatalogBk.vue')
  },
  methods: {
    dialogClose(event) {
      console.log(event);
      // console.log(document.getElementById('boxEditingComponentDialog').querySelector('.dialog__select').focus());
      this.isDialog = false;
document.getElementById('boxEditingComponentDialog').querySelector('input').focus()
      // event.target.closest('.dialog').querySelector('.dialog__select').focus();
    },
    selectInDialog(event, param) {
      console.log(event.target.closest('.table-body__col').querySelector('.box-editing-default').getAttribute('data-value'));
      console.log(param);

    },
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
      if (event.relatedTarget && event.relatedTarget.classList.contains('table-body__col')) {
        console.log('blur outer component');
        this.$emit('input-blur', event);
      }
    },
    changeValue() {
      console.log('change select component');
    },
    focusEvent(event) {
      console.log('focus select component');
      setTimeout(() => { 
        console.log(event);
        event.target.select(); }, 100)
    },
    openDialog() {
      this.isDialog = true;
      // this.$options.components.catalogBk = require('@/views/Catalog/CatalogBk.vue')
      // let CatalogBk = import('@/views/Catalog/CatalogBk.vue');
      
      // let vueCellEdit = Vue.extend(CatalogBk);
      // console.log(vueCellEdit);
      // let cellEditComponent = new vueCellEdit({ store }).$mount();
      // setTimeout(() => {
        // let parentElement = document.querySelector('#dialog__box');
      // //   console.log(parentElement);
        // parentElement.prepend(cellEditComponent.$el);
      // }, 200)
      
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