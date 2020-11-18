<template>
  <v-btn fab x-small icon v-if="isShow" @click="$emit('click')">
    <v-icon>mdi-close</v-icon>
  </v-btn> 
</template>

<script>
export default {
  name: 'FilterItemButton',
  props: {
    isShow: {type: String, default: null},
  }
}
</script>