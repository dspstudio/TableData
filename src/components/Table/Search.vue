<template>
  <section>
    <div class="relative mt-1">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" data-v-inspector="components/data/table/search.vue:7:11"></path>
        </svg>
      </div>
      <div v-if="searchValue.length > 0" class="absolute inset-y-0 right-0 flex items-center pr-3 fill-gray-500 hover:fill-black cursor-pointer transition-all" @click="handleInputSearch('')">
        <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
      </div>
      <input :value="searchValue" @input="handleInputSearch($event.target.value)" type="text" id="table-search" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search for items" >
    </div>
  </section>
</template>

<script setup>

const props = defineProps({
  handleInputSearch: {
    type: Function,
    required: true
  },
  searchValue: {
    type: String,
    default: ''
  }
});
</script>