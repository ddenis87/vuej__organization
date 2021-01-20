<template>
  <v-navigation-drawer temporary fixed hide-overlay right 
                       :width="width"
                       v-model="isDialogShow">
    <v-toolbar dark flat tile 
               color="blue darken-3">
        <el-button-icon icon="mdi-close" no-tooltip @click="$emit('close-dialog')"></el-button-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title >{{ isDialogName }}</v-toolbar-title>
    </v-toolbar>
    <slot></slot>
  </v-navigation-drawer>
</template>

<script>
import ElButtonIcon from '@/components/Elements/ElButtonIcon.vue';
export default {
  name: 'DialogRightBar',
  components: {
    ElButtonIcon,
  },
  props: {
    isDialogName: { type: String, default: '' },
    isDialogShow: { type: Boolean, default: false },
    width: { type: String, default: '400' },
  },
}
</script>