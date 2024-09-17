<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
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

const { columns } = props;
</script>

<template>
  <tr>
    <th v-for="item in columns" @click="sortBy(item.name,'desc')" :key="item.name" :class="item?.class?.th">
      <div :class="item.sortable ? 'dt-top-header-sortable' : ''">
        <div v-if="item.sortable" class="dt-top-header-sortable-content">
          <span :class="item.name === sort && order === 'asc' ? 'dt-top-header-sortable-asc' : 'dt-top-header-sortable-desc'">
            <svg class="h-3 w-3" clip-rule="evenodd" fill-rule="evenodd" fill="currentcolor" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.095 19.882 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367z" fill-rule="nonzero"/></svg>
          </span>
          <span :class="item.name === sort && order === 'desc' ? 'dt-top-header-sortable-asc' : 'dt-top-header-sortable-desc'">
            <svg class="h-3 w-3 rotate-180" clip-rule="evenodd" fill-rule="evenodd" fill="currentcolor" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.095 19.882 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367z" fill-rule="nonzero"/></svg>
          </span>
        </div>
        <div class="dt-top-header-content">
            {{ item.label }}
        </div>
      </div>
    </th>
  </tr>
</template>