<template>
  <v-dialog class="dialog"
            fullscreen 
            :transition="transition" 
            v-model="isDialogShow" 
            @click:outside="$emit('close-dialog')">
    <v-card>
      <dialog-toolbar :is-dialog-name="isDialogName"
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
    isTransition: { type: String, default: 'bottom' },
  },
  computed: {
    transition() { return `dialog-${this.isTransition}-transition` }
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