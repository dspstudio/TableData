<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  rowClick: {
    type: Function,
    default: null
  },
  options: {
    type: Object,
    default: {}
  }
});

const handleClickRow = (row, item) => {
  if (typeof props.rowClick === 'function') {
    props.rowClick(row, item);
  }
}
</script>

<template>
  <tbody>
  <TransitionGroup :name="options.rowTransition || 'fade'">
    <tr v-for="row, index in data" :key="row" class="hover:bg-gray-100 transition-all">
      <td @click="handleClickRow(row, item)" v-for="item in columns" class="p-4 border-t text-gray-500" :class="item.class.td">
        <component v-if="item.component" :is="item.component" :data="row"></component>
        <div v-else class="truncate w-full">
          {{ data[index][item.name] }}
        </div>
      </td>
    </tr>
  </TransitionGroup>
  </tbody>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-leave-active {
  display: none;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>