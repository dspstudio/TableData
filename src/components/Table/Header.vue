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
  }
});

const { columns } = props;
</script>

<template>
  <tr>
    <th v-for="item in columns" @click="sortBy(item.name,'desc')" :key="item.name" :class="item.class.th">
      <div :class="item.sortable ? 'flex items-center gap-2' : ''">
        <div v-if="item.sortable" class="flex flex-col">
          <span :class="item.name === sort && order === 'asc' ? 'text-black' : 'text-gray-400'" class=" transition-all">
            <svg class="h-3 w-3" clip-rule="evenodd" fill-rule="evenodd" fill="currentcolor" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.095 19.882 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367z" fill-rule="nonzero"/></svg>
          </span>
          <span :class="item.name === sort && order === 'desc' ? 'text-black' : 'text-gray-400'" class="transition-all">
            <svg class="h-3 w-3 rotate-180" clip-rule="evenodd" fill-rule="evenodd" fill="currentcolor" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.095 19.882 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367z" fill-rule="nonzero"/></svg>
          </span>
        </div>
        <div class="flex-grow">
            {{ item.label }}
        </div>
      </div>
    </th>
  </tr>
</template>