<template>
  <div class="box-display-default-component">
    <content-overflow :content="dataValue" @show-tooltip="(event) => $emit('show-tooltip', event)">
      <span class="content" 
           
            
            @mousedown="() => {return false}">
        {{ dataValue }}
      </span>
    </content-overflow>
  </div>
</template>

<script>
import ContentOverflow from './ContentOverflow.vue';

export default {
  name: 'DisplayCell',
  components: {
    ContentOverflow,
  },
  props: {
    dataValue: String,
  },
}
</script>

<style lang="scss" scoped>
.box-display-default-component {
  .content {
    width: 100%;
    -webkit-user-select: none;
    text-overflow: ellipsis;
    overflow: hidden;
    &_fixed {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    &_dense { white-space: nowrap; }
    // &_auto {  }
  }
}
</style>