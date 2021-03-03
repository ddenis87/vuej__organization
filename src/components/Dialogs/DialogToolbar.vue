<template>
  <v-toolbar dark flat tile
             color="blue darken-3"
             :height="height">
    <template v-if="orientation == 'left'">
      <v-toolbar-title >{{ isDialogName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <el-button-icon icon="mdi-close" no-tooltip @click="$emit('close-dialog')" v-if="isClose"></el-button-icon>
    </template>
    <template v-else>
      <el-button-icon icon="mdi-close" no-tooltip @click="$emit('close-dialog')" v-if="isClose"></el-button-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ isDialogName }}</v-toolbar-title>
    </template>
    
  </v-toolbar>
</template>

<script>
import ElButtonIcon from '@/components/Elements/ElButtonIcon.vue';
export default {
  name: 'DialogToolbar',
  components: {
    ElButtonIcon,
  },
  props: {
    isDialogName: { type: String, default: '' },
    orientation: { type: String, default: 'left' },
    isClose: { type: Boolean, default: true },
    height: { type: Number, default: 64 },
  }
}
</script>