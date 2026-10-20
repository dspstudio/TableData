<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { inject } from 'vue';
import { defaultClasses } from './classes.js';

const props = defineProps({
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

const ariaSort = (column) => {
  if (!column.sortable) return undefined;
  if (column.name !== props.sort || !props.order) return 'none';
  return props.order === 'asc' ? 'ascending' : 'descending';
};

const onSort = (column) => {
  if (column.sortable) props.sortBy?.(column.name, 'desc');
};
</script>

<template>
  <tr>
    <th
      v-for="item in columns"
      :key="item.name"
      :class="[ui.th, item.sortable ? ui.thSortable : '', item?.class?.th]"
      :style="item.width ? { width: item.width, maxWidth: item.width } : undefined"
      :aria-sort="ariaSort(item)"
      :tabindex="item.sortable ? 0 : undefined"
      @click="onSort(item)"
      @keydown.enter.prevent="onSort(item)"
      @keydown.space.prevent="onSort(item)"
    >
      <div :class="item.sortable ? ui.sortable : ''">
        <div v-if="item.sortable" :class="ui.sortIcons" aria-hidden="true">
          <span :class="item.name === sort && order === 'asc' ? ui.sortActive : ui.sortInactive">
            <svg class="dt-sort-icon" clip-rule="evenodd" fill-rule="evenodd" fill="currentcolor" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.095 19.882 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367z" fill-rule="nonzero"/></svg>
          </span>
          <span :class="item.name === sort && order === 'desc' ? ui.sortActive : ui.sortInactive">
            <svg class="dt-sort-icon dt-sort-icon--desc" clip-rule="evenodd" fill-rule="evenodd" fill="currentcolor" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.095 19.882 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367z" fill-rule="nonzero"/></svg>
          </span>
        </div>
        <div :class="ui.sortLabel">
            {{ item.label }}
        </div>
      </div>
    </th>
  </tr>
</template>
