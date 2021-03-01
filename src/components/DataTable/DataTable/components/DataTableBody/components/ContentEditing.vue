<template>
  <div class="content-editing"
       :class="{'content-editing_required': this.properties.columnProperties.required}">
    <component :is="editingComponent"
               :input-properties="propertiesComponent"
               :input-value="propertiesComponent.text"
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
      // console.log(this.properties);
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
    isModeAdding() { return this.$store.getters['DataTable/GET_MODE_ADDING_STATUS'](this.properties.tableName); },
  },
  methods: {
    editingCanceled() {
      let editableElement = document.querySelector('.body-column_editing');
      let eventEditingCanceled = new CustomEvent('editing-canceled')
      editableElement.dispatchEvent(eventEditingCanceled);
      this.isComponentNull = true;
      if (document.querySelector('.content-editing')) document.querySelector('.content-editing').remove();
      if (this.isModeAdding) {
        this.editingCanceledStore();
        return;
      }
    },

    editingCanceledStore() {
      this.$store.commit('DataTable/DATA_STORE_DELETING_ELEMENT', {tableName: this.properties.tableName});
    },

    async editingAccepted(option) {
      // option.event.preventDefault();
      // console.log(option);
      if (this.isModeAdding) {
        this.editingAcceptedStore(option);
        return;
      }
      let sendOption = {
        tableName: this.properties.tableName,
        elementId: this.properties.itemRow.id,
      };
      
      let newValue = this.computedValue(option);

      let bFormData = new FormData();

      for (let key of Object.keys(this.properties.itemRow)) {
        let currentValue = this.properties.itemRow[key];
        let newCurrentValue = null;
        if (currentValue != null) {
          if (typeof(currentValue) == 'object' && currentValue != null) {
            if ('id' in currentValue) newCurrentValue = currentValue.id;
            else newCurrentValue = currentValue.value;
          } else {
            newCurrentValue = currentValue;
          }
          bFormData.set(key, newCurrentValue);
        }
      }
      bFormData.set(this.properties.columnProperties.value, newValue);
      
      sendOption.formData = bFormData;

      let editableElement = document.querySelector('.body-column_editing');
// --------------------------------
      this.saveDataStore(option, 'element');
// --------------------------------
      this.$store.dispatch('DataTable/REQUEST_DATA_ELEMENT', sendOption);
      let eventEditingAccepted = new CustomEvent('editing-accepted', { detail: { key: option.key, keyShift: option.shift } });
      editableElement.dispatchEvent(eventEditingAccepted);
      this.isComponentNull = true;
      if (document.querySelector('.content-editing')) document.querySelector('.content-editing').remove();
    },

    editingAcceptedStore(option) {
      this.saveDataStore(option, 'item');
      let editableElement = document.querySelector('.body-column_editing');
      let eventEditingAccepted = new CustomEvent('editing-accepted', { detail: { key: 'Tab', keyShift: option.shift } });
      editableElement.dispatchEvent(eventEditingAccepted);
      this.isComponentNull = true;
      if (document.querySelector('.content-editing')) document.querySelector('.content-editing').remove();
    },

    computedValue(option) {
      let newValue = null;
      if (typeof(option.value) == 'object' && option.value != null) {
        if ('id' in option.value) newValue = option.value.id;
        else newValue = option.value.value;
      } else {
        newValue = (option.value == undefined) ? '' : option.value;
      }
      return newValue;
    },

    saveDataStore(option, flag) {
      let sendOption = {
        tableName: this.properties.tableName,
        fieldName: this.properties.columnProperties.value,
        recordId: this.properties.itemRow.id,
        value: option.value,
      }
      if (option.value == null && this.properties.columnProperties.required == true) return;
      if (flag == 'element') {
        this.$store.commit('DataTable/ACTION_EDITING_ELEMENT', sendOption);
      } else {
        this.$store.commit('DataTable/DATA_STORE_ADDING_ELEMENT_ITEM', sendOption);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.content-editing {
  display: flex;
  margin-top: -9.5px;
  &_required {
    border-bottom: thin dashed red;
  }
}
</style>