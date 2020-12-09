<template>
  <v-progress-linear class="table-uno-progress" 
                     color="blue" 
                     indeterminate 
                     absolute 
                     bottom
                     v-show="isShow"></v-progress-linear>
</template>

<script>
export default {
  name: 'TableProgressLine',
  props: {
    isShow: {
      type: Boolean,
      default: false,
    }
  }
}
</script>