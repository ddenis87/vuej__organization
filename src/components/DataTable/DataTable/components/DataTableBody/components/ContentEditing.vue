<template>
  <div class="content-editing">
    <component :is="editingComponent"
               :properties="propertiesComponent"
               :propertiesValue="propertiesComponent.text"
               :selectedValue="true"
               @editing-canceled="editingCanceled"
               @editing-accepted="editingAccepted"
               @editing-blur-focus="editingCanceled"></component>
  </div>
</template>

<script>
export default {
  name: 'ContentEditing',
  props: {
    properties: Object,
  },
  computed: {
    editingComponent() {
      if (this.properties.columnProperties) {
        switch(this.properties.columnProperties.type) {
          case 'string': return () => import('@/components/Elements/ElFieldString.vue');
          case 'integer': return () => import('@/components/Elements/ElFieldNumber.vue');
          case 'choice': return () => import('@/components/Elements/ElFieldChoice.vue');
          case 'field': return () => import('@/components/Elements/ElFieldDialog.vue');
        }
      }
    },
    propertiesComponent() {
      let propertiesComponent = {};
      Object.assign(propertiesComponent, this.properties.columnProperties);
      propertiesComponent.text = this.properties.columnValue;
      console.log(propertiesComponent);
      return propertiesComponent;
    },
  },
  methods: {
    editingCanceled() {
      let editableElement = document.querySelector('.body-column_editing');
      let eventEditingCanceled = new CustomEvent('editing-canceled')
      editableElement.dispatchEvent(eventEditingCanceled);
      document.querySelector('.content-editing').remove();
      if (document.querySelector('.v-menu__content')) document.querySelector('.v-menu__content').remove();
    },
    editingAccepted(option) {
      let newOption = {};
      Object.assign(newOption, option);
      newOption.tableName = this.properties.tableName;
      newOption.id = this.properties.rowId;
      this.$store.commit('DataTable/EDITING_LIST_DATA_FIELD', newOption);
      let editableElement = document.querySelector('.body-column_editing');
      let eventEditingAccepted = new CustomEvent('editing-accepted', { detail: { key: newOption.key, keyShift: newOption.keyShift } });
      editableElement.dispatchEvent(eventEditingAccepted);
      document.querySelector('.content-editing').remove();
      if (document.querySelector('.v-menu__content')) document.querySelector('.v-menu__content').remove();
    },
  }
}
</script>