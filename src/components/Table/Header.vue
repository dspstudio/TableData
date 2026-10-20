<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { inject } from 'vue';
import { defaultClasses } from './classes.js';

defineProps({
  columns: {
    type: Array,
    required: true
  },
  sortBy: {
    type: Function
  },
  order: {
    type: String
  },
  sort: {
    type: String
  },
  translations: {
    type: Object,
    default: () => ({})
  }
});

const ui = inject('dtClasses', defaultClasses);
</script>

<template>
  <tr>
    <th
      v-for="item in columns"
      @click="sortBy(item.name,'desc')"
      :key="item.name"
      :class="[ui.th, item.sortable ? ui.thSortable : '', item?.class?.th]"
      :style="item.width ? { width: item.width, maxWidth: item.width } : undefined"
    >
      <div :class="item.sortable ? ui.sortable : ''">
        <div :class="ui.sortLabel">
            {{ item.label }}
        </div>
        <div v-if="item.sortable" :class="ui.sortIcons">
          <span :class="item.name === sort && order === 'asc' ? ui.sortActive : ui.sortInactive">
            <svg class="dt-sort-icon" clip-rule="evenodd" fill-rule="evenodd" fill="currentcolor" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.095 19.882 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367z" fill-rule="nonzero"/></svg>
          </span>
          <span :class="item.name === sort && order === 'desc' ? ui.sortActive : ui.sortInactive">
            <svg class="dt-sort-icon dt-sort-icon--desc" clip-rule="evenodd" fill-rule="evenodd" fill="currentcolor" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.095 19.882 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367z" fill-rule="nonzero"/></svg>
          </span>
        </div>
      </div>
    </th>
  </tr>
</template>
