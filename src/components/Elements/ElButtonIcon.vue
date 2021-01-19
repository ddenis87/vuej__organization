<template>
  <v-tooltip bottom :disabled="noTooltip">
    <template v-slot:activator="{ on }">
      <v-btn icon height="40" width="40" v-on="on" :disabled="disabled" @click="$emit('click')">
        <v-icon :color="iconColor">{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span class="tooltip-text tooltip-text-control"><slot></slot></span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'ElButtonIcon',
  props: {
    icon: { type: String, default: '' },
    iconColor: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    noTooltip: { type: Boolean, default: false },
  },
}
</script>