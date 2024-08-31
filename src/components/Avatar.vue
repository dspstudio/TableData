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
  <div class="flex grid-cols-2 auto-rows-max gap-1">
    <div class="flex w-6 items-center">
      <img :src="data.avatar" class="h-auto w-6 rounded-full overflow-hidden" />
    </div>
    <div class="truncate">
      {{ data.userName }}
    </div>
  </div>
</template>