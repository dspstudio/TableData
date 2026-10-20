<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
defineProps({
  data: {
    type: Object,
    default: () => ({})
  },
  ellipsis: {
    type: Boolean,
    default: true
  },
  wrap: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div
    class="cell-avatar"
    :title="ellipsis && !wrap ? data.userName : undefined"
  >
    <div class="cell-avatar-img-wrap">
      <img
        :src="data.avatar"
        alt=""
        width="24"
        height="24"
        loading="lazy"
        decoding="async"
        class="cell-avatar-img"
      />
    </div>
    <div
      :class="[
        'cell-avatar-name',
        wrap ? 'dt-wrap' : ellipsis ? 'dt-ellipsis' : 'dt-nowrap'
      ]"
    >
      {{ data.userName }}
    </div>
  </div>
</template>
