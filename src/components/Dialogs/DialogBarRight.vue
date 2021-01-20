<template>
  <v-navigation-drawer temporary fixed hide-overlay right 
                       :width="width"
                       v-model="isOpen">
    <dialog-toolbar :is-dialog-name="isDialogName"
                    orientation="right"
                    @close-dialog="$emit('close-dialog')"></dialog-toolbar>
    <slot></slot>
  </v-navigation-drawer>
</template>

<script>
import DialogToolbar from './DialogToolbar.vue';
export default {
  name: 'DialogBarRight',
  components: {
    DialogToolbar,
  },
  props: {
    isDialogName: { type: String, default: '' },
    isDialogShow: { type: Boolean, default: false },
    width: { type: String, default: '400' },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  watch: {
    isDialogShow() { this.isOpen = this.isDialogShow; },
    isOpen() { if (!this.isOpen) this.$emit('close-dialog'); },
  },
}
</script>