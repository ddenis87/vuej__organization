<template>
  <div class="test">
    <v-dialog v-model="isDialog">
      <template v-slot:activator="{}">
        <v-btn @click="isDialog = true">Dialog</v-btn>
      </template>
      <v-btn @click="isDialog = false">Close</v-btn>
      <catalog-component></catalog-component>
    </v-dialog>
  </div>
</template>

<script>
// import CatalogComponent from '@/views/Catalog/CatalogBk.vue';

export default {
  name: 'Test',
  components: {
    CatalogComponent: () => import('@/views/Catalog/CatalogBk.vue'),
  },
  data() {
    return {
      isDialog: false,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>