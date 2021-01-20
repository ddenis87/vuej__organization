<template>
  <v-navigation-drawer temporary absolute left
                       :width="width"
                       v-model="isOpen">
    <dialog-toolbar :is-dialog-name="isDialogName"
                    @close-dialog="$emit('close-dialog')"></dialog-toolbar>
    <slot></slot>
  </v-navigation-drawer>
</template>

<script>
import DialogToolbar from './DialogToolbar.vue';
export default {
  name: 'DialogBarLeft',
  components: {
    DialogToolbar,
  },
  props: {
    isDialogName: { type: String, default: '' },
    isDialogShow: { type: Boolean, default: false },
    width: { type: String, default: '256' },
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