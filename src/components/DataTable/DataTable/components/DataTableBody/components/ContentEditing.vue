<template>
  <div class="content-editing">
    <component :is="editingComponent"
               :input-properties="propertiesComponent"
               :input-value="propertiesComponent.text"
               :is-value-selected="true"
               :is-value-focus="true"
                  
               :properties="propertiesComponent"
               :propertiesValue="propertiesComponent.text"
               :selectedValue="true"
               @editing-canceled="editingCanceled"
               @editing-accepted="editingAccepted"
               @editing-blur-focus="editingCanceled"
               
               :is-hide-underline="true"
               :is-single-line="true"
               :is-hide-message="true"
               :is-hide-label="true"
               :is-selected="true"
               :is-btn-clear="false"
               @keydown-enter="editingAccepted"
               @keydown-tab="editingAccepted"
               @keydown-esc="editingCanceled"
               @blur-field="editingCanceled"></component>
  </div>
</template>

<script>
export default {
  name: 'ContentEditing',
  props: {
    properties: Object,
  },
  data() {
    return {
      isComponentNull: false,
    }
  },
  computed: {
    editingComponent() {
      console.log(this.isComponentNull);
      if (this.properties.columnProperties && !this.isComponentNull) {
        switch(this.properties.columnProperties.type) {
          case 'string': return () => import('@/components/Elements/ElField/ElFieldString.vue');
          case 'integer': return () => import('@/components/Elements/ElField/ElFieldNumber.vue');
          case 'date': return () => import('@/components/Elements/ElField/ElFieldDate.vue');
          case 'datetime': return () => import('@/components/Elements/ElField/ElFieldDateTime.vue');
          case 'choice': return () => import('@/components/Elements/ElField/ElFieldChoice.vue');
          case 'field': return () => import('@/components/Elements/ElField/ElFieldDialog.vue');
        }
      } else return null;
    },
    propertiesComponent() {
      let propertiesComponent = {};
      Object.assign(propertiesComponent, this.properties.columnProperties);
      propertiesComponent.text = this.properties.columnValue;
      // console.log(propertiesComponent.text);
      return propertiesComponent;
    },
  },
  methods: {
    editingCanceled() {
      let editableElement = document.querySelector('.body-column_editing');
      let eventEditingCanceled = new CustomEvent('editing-canceled')
      editableElement.dispatchEvent(eventEditingCanceled);
      this.isComponentNull = true;
      if (document.querySelector('.content-editing')) document.querySelector('.content-editing').remove();
    },
    editingAccepted(option) {
      let sendOption = {
        tableName: this.properties.tableName,
        recordId: this.properties.rowId,
        fieldName: this.properties.columnProperties.value,
        fieldValue: option.value,
      };
      // console.log(sendOption);
      this.$store.commit('DataTable/ACTION_EDITING_ELEMENT', sendOption);
      let editableElement = document.querySelector('.body-column_editing');
      let eventEditingAccepted = new CustomEvent('editing-accepted', { detail: { key: option.key, keyShift: option.shift } });
      editableElement.dispatchEvent(eventEditingAccepted);
      this.isComponentNull = true;
      if (document.querySelector('.content-editing')) document.querySelector('.content-editing').remove();
    },
  }
}
</script>

<style lang="scss" scoped>
.content-editing {
  display: flex;
  margin-top: -9.5px;
}
</style>