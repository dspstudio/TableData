<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { inject } from 'vue';
import { defaultClasses } from './classes.js';

defineProps({
  handleInputSearch: {
    type: Function,
    required: true
  },
  searchValue: {
    type: String,
    default: ''
  },
  translations: {
    type: Object,
    default: () => ({})
  }
});

const ui = inject('dtClasses', defaultClasses);
</script>

<template>
  <section :class="ui.search">
    <div :class="ui.searchWrap">
      <div :class="ui.searchIcon">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"></path>
        </svg>
      </div>
      <div
        v-if="searchValue.length > 0"
        :class="ui.searchClear"
        @click="handleInputSearch('')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
      </div>
      <input
        :value="searchValue"
        @input="handleInputSearch($event.target.value)"
        type="text"
        :aria-label="translations.search_items_placeholder"
        :class="ui.searchInput"
        :placeholder="translations.search_items_placeholder"
      >
    </div>
  </section>
</template>
