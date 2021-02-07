<template>
  <v-dialog class="dialog"
            fullscreen persistent
            :attach="dialogAttach"
            
            :transition="transition" 
            v-model="showDialog" 
            @click:outside="closeDialog">
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
  data() {
    return {
      showDialog: false,
    }
  },
  computed: {
    transition() { return `dialog-bottom-transition` },
    dialogAttach() {
      return (this.isDialogAttach == '') ? '.app' : this.isDialogAttach;
    },
  },
  watch: {
    isDialogShow() { this.showDialog = this.isDialogShow; }
  },
  methods: {
    closeDialog() {
      this.showDialog = false;
      this.$emit('close-dialog')
    }
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