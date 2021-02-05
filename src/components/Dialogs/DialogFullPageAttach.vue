<template>
  <v-dialog class="dialog"
            fullscreen persistent
            :attach="dialogAttach"
            
            :transition="transition" 
            v-model="isDialogShow" 
            @click:outside="$emit('close-dialog')">
    <v-card>
      <dialog-toolbar :is-dialog-name="isDialogName"
                      orientation="right"
                      @close-dialog="$emit('close-dialog')"></dialog-toolbar>
      <slot></slot>
    </v-card>
  </v-dialog>
</template>

<script>
import DialogToolbar from './DialogToolbar.vue';
export default {
  name: 'DialogFullPage',
  components: {
    DialogToolbar,
  },
  props: {
    isDialogShow: {type: Boolean, default: false},
    isDialogName: {type: String, default: ''},
    isDialogAttach: '',
  },
  computed: {
    transition() { return `dialog-bottom-transition` },
    dialogAttach() {
      return (this.isDialogAttach == '') ? '.app' : this.isDialogAttach;
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog {
  &__title {
    color: white;
  }
}
</style>