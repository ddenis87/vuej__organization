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
          case 'date': return () => import('@/components/Elements/ElFieldDate.vue');
          case 'choice': return () => import('@/components/Elements/ElFieldChoice.vue');
          case 'field': return () => import('@/components/Elements/ElFieldDialog.vue');
        }
      }
    },
    propertiesComponent() {
      let propertiesComponent = {};
      Object.assign(propertiesComponent, this.properties.columnProperties);
      propertiesComponent.text = this.properties.columnValue;
      console.log(propertiesComponent.text);
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
      // let newOption = {};
      // console.log(option);
      // Object.assign(newOption, option);
      // newOption.tableName = this.properties.tableName;
      // newOption.id = this.properties.rowId;
      let sendOption = {
        tableName: this.properties.tableName,
        recordId: this.properties.rowId,
        fieldName: option.field,
        fieldValue: option.value,
      };
      console.log(sendOption);
      this.$store.commit('DataTable/ACTION_EDITING_ELEMENT', sendOption);
      let editableElement = document.querySelector('.body-column_editing');
      let eventEditingAccepted = new CustomEvent('editing-accepted', { detail: { key: option.key, keyShift: option.keyShift } });
      editableElement.dispatchEvent(eventEditingAccepted);
      document.querySelector('.content-editing').remove();
      if (document.querySelector('.v-menu__content')) document.querySelector('.v-menu__content').remove();
    },
  }
}
</script>