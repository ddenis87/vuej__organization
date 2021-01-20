<template>
  <v-dialog class="dialog"
            fullscreen 
            transition="dialog-bottom-transition" 
            v-model="isDialogShow" 
            @click:outside="$emit('close-dialog')">
    <v-card>
      <v-toolbar dark flat tile 
                 color="blue darken-3">
        <span class="dialog__title">{{ isDialogName }}</span>
        <v-spacer></v-spacer>
        <v-btn fab icon small 
               @click="$emit('close-dialog')">
          <v-icon small 
                  color="white">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <slot></slot>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogFullPage',
  props: {
    isDialogShow: {type: Boolean, default: false},
    isDialogName: {type: String, default: ''},
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