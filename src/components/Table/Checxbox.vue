<script setup>
const emit = defineEmits(['input']);

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
});

const handleInput = (input) => {
  emit('input', input.target.value)
}
</script>

<template>
  <label class="relative flex items-center justify-center ">
    <input @change="handleInput" type="checkbox" :value="data.id">
  </label>
</template>