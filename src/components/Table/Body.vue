<!-- eslint-disable vue/multi-word-component-names -->
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
    default: () => ({})
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
      <tr v-for="row, index in data" :key="row">
        <td @click="handleClickRow(row, item)" v-for="item in columns" :key="item.name" :class="item?.class?.td">
          <component v-if="item.component" :is="item.component" :data="row" :val="data[index][item.name]"></component>
          <div v-else>
            {{ data[index][item.name] }}
          </div>
        </td>
      </tr>
    </TransitionGroup>
  </tbody>
</template>