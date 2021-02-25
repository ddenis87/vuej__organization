<template>
  <v-btn class="action-btn"
         icon
         x-small
         :disabled="isDisabled"
         @click="(event) => $emit('click', event)">
    <v-icon :color="iconColor">
      <slot></slot>
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ElButtonIcon',
  props: {
    iconColor: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss" scoped>

</style>