<template>
  <div class="box-editing-component">
    <component :is="editingComponent"
               v-bind:properties="propertiesComponent"
               v-bind:propertiesValue="propertiesComponent.text"
               v-bind:selectedValue="true"
               @editing-canceled="editingCanceled"
               @editing-accepted="editingAccepted"
               @editing-blur-focus="editingCanceled"></component>
  </div>
</template>

<script>
export default {
  name: 'CellEditing',
  props: {
    properties: Object,
  },
  computed: {
    editingComponent() {
      if (this.properties.columnProperties) {
        switch(this.properties.columnProperties.type) {
          case 'string': return () => import('@/components/elements/ElFieldString.vue');
          case 'integer': return () => import('@/components/elements/ElFieldNumber.vue');
          case 'choice': return () => import('@/components/elements/ElFieldChoice.vue');
          case 'nested object': return () => import('@/components/elements/ElFieldDialog.vue');
        }
      }
    },
    propertiesComponent() {
      let propertiesComponent = {};
      Object.assign(propertiesComponent, this.properties.columnProperties);
      propertiesComponent.text = this.properties.columnValue;
      return propertiesComponent;
    },
  },
  methods: {
    editingCanceled() {
      // console.log('cell editing - editing canceled');
      // if (!document.querySelector('.table-body__col_focus')) return;
      let editableElement = document.querySelector('.table-body__col_editing');
      let eventEditingCanceled = new CustomEvent('editing-canceled')
      editableElement.dispatchEvent(eventEditingCanceled);
      document.querySelector('.box-editing-component').remove();
      if (document.querySelector('.v-menu__content')) document.querySelector('.v-menu__content').remove();
      // console.log('cell editing - editing canceled - complete');
    },
    editingAccepted(option) {
      // console.log('cell editing - editing accepted');
      
      let newOption = {};
      Object.assign(newOption, option);
      newOption.tableName = this.properties.tableName;
      newOption.id = this.properties.rowId;
      console.log(newOption);
      this.$store.commit('DataTable/EDITING_LIST_DATA_FIELD', newOption);
      let editableElement = document.querySelector('.table-body__col_editing');
      let eventEditingAccepted = new CustomEvent('editing-accepted', { detail: { key: newOption.key, keyShift: newOption.keyShift } });
      editableElement.dispatchEvent(eventEditingAccepted);
      document.querySelector('.box-editing-component').remove();
      if (document.querySelector('.v-menu__content')) document.querySelector('.v-menu__content').remove();
    },
  }
}
</script>