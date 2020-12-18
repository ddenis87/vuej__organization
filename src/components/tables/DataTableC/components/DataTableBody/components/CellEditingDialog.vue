<template>
  <v-dialog v-model="isDialog" max-width="70%" persistent class="dialog">
    <template v-slot:activator="{  }">
      <v-autocomplete id="boxEditingComponentSelect"
                      auto-select-first
                      class="select"
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
    </template>
    <v-card>
      <div class="dialog__box" id="dialog__box">
        <!-- <catalog-bk></catalog-bk> -->
        <!-- <component :is="CatalogBk"></component> -->
        <v-btn @click="isDialog = false">123</v-btn>
      </div>
    </v-card>
  </v-dialog>
  
</template>

<script>
import Vue from 'vue';
// import vuetify from '@/plugins/vuetify';
import CatalogBk from '@/views/Catalog/CatalogBk.vue';

export default {
  name: 'CellEditingDialog',
  components: {
    // CatalogBk: () => import('@/views/Catalog/CatalogBk.vue'),
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
      // catalogName: 'CatalogBk',
    }
  },
  computed: {
    // CatalogBk() {return import('@/views/Catalog/CatalogBk.vue') },
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
    openDialog() {
      this.isDialog = true;
      // let catalogComponent = import('@/views/Catalog/CatalogBk.vue');
      
      let vueCellEdit = Vue.extend(CatalogBk);
      console.log(vueCellEdit);
      let cellEditComponent = new vueCellEdit({ }).$mount();
      setTimeout(() => {
        let parentElement = document.querySelector('#dialog__box');
      //   console.log(parentElement);
        parentElement.prepend(cellEditComponent.$el);
      }, 200)
      
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