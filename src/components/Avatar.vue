<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
const {data} = defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <div class="flex items-center gap-1">
    <div class="h-6 w-6 rounded-full overflow-hidden">
      <img :src="data.avatar" />
    </div>
    <div>
      {{ data.userName }}
    </div>
  </div>
</template>