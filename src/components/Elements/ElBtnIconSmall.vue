<template>
  <v-tooltip bottom :disabled="noTooltip">
    <template v-slot:activator="{ on }">
      <v-btn class="el-button-icon"  tabindex="1"
             icon
             small
             :disabled="isDisabled"
             v-on="on"
             plain
             @click="$emit('click')">
        <v-icon small :color="iconColor">{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span class="tooltip-text tooltip-text-control"><slot></slot></span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'ElButtonIconSmall',
  props: {
    icon: { type: String, default: '' },
    iconColor: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
    noTooltip: { type: Boolean, default: false },
  },
}
</script>