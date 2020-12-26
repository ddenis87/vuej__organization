<template>
  <div class="box-editing-component">
    <component :is="editingComponent"
               v-bind:properties="propertiesComponent"
               v-bind:selectedValue="true"
               @editing-canceled="editingCanceled"
               @editing-accepted="editingAccepted"
               @editing-blur-focus="editingCanceled"></component>
  </div>
</template>

<script>
// import ElFieldString from '@/components/elements/ElFieldString.vue';
export default {
  name: 'CellEditing',
  props: {
    properties: Object,
  },
  data() {
    return {
      // editingComponent: null,
    }
  },
  computed: {
    editingComponent() {
      if (this.properties.columnProperties) {
        switch(this.properties.columnProperties.type) {
          case 'string': return () => import('@/components/elements/ElFieldString.vue');
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
  created() {
    console.log(this.properties);
  },
  methods: {
    editingCanceled() {
      console.log('cell editing - editing canceled');
      if (!document.querySelector('.table-body__col_focus')) return;
      let editableElement = document.querySelector('.table-body__col_focus');
      let eventEditingCanceled = new CustomEvent('editing-canceled')
      editableElement.dispatchEvent(eventEditingCanceled);
      document.querySelector('.box-editing-component').remove();
      console.log('cell editing - editing canceled - complete');
    },
    editingAccepted(option) {
      console.log('cell editing - editing canceled');
      let newOption = {};
      Object.assign(newOption, option);
      this.$store.commit('DataTable/EDITING_LIST_DATA_FIELD', newOption);
      let editableElement = document.querySelector('.table-body__col_focus');
      let eventEditingAccepted = new CustomEvent('editing-accepted')
      editableElement.dispatchEvent(eventEditingAccepted);
      document.querySelector('.box-editing-component').remove();
    },
  }
}
</script>