<template>
  <v-tooltip bottom :disabled="noTooltip">
    <template v-slot:activator="{ on }">
      <v-btn icon small v-on="on" :disabled="disabled" @click="$emit('click')"><v-icon>{{ icon }}</v-icon></v-btn>
    </template>
    <span class="tooltip-text tooltip-text-control"><slot></slot></span>
  </v-tooltip>
</template>

<script>
export default {
  name: 'ElButtonIcon',
  props: {
    icon: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    noTooltip: { type: Boolean, default: false },
  },
}
</script>