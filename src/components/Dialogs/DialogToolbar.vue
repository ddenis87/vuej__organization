<template>
  <v-toolbar dark flat tile 
              color="blue darken-3">
    <el-button-icon icon="mdi-close" no-tooltip @click="$emit('close-dialog')"></el-button-icon>
    <v-spacer></v-spacer>
    <v-toolbar-title >{{ isDialogName }}</v-toolbar-title>
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
  }
}
</script>