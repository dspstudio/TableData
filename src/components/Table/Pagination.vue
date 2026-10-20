<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { inject } from 'vue';
import { defaultClasses } from './classes.js';

defineProps({
  goToPage: {
    type: Function,
    default: () => {},
  },
  setPerPage: {
    type: Function,
    default: () => {},
  },
  perPage: {
    type: Number
  },
  currentPage: {
    type: Number
  },
  totalFound: {
    type: Number
  },
  endTo: {
    type: Number
  },
  startFrom: {
    type: Number
  },
  translations: {
    type: Object,
    default: () => ({})
  }
});

const ui = inject('dtClasses', defaultClasses);
const perPageOptions = [10, 25, 50, 100];
</script>

<template>
  <div :class="ui.pagination">
    <small :class="ui.paginationInfo">
      {{ translations.pagination_showing }}
      <strong>{{ totalFound === 0 ? 0 : startFrom + 1 }}</strong>-<strong>{{ Math.min(endTo, totalFound) }}</strong>
      {{ translations.pagination_of }}
      <strong>{{ totalFound }}</strong>
    </small>
    <div v-show="totalFound > perPage" :class="ui.paginationControls">
      {{ translations.pagination_per_page }}
      <select @change="setPerPage" :value="perPage" :class="ui.paginationSelect">
        <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
      </select>
      {{ translations.pagination_page }}
      <input
        @input="event => goToPage(event.target.value - 1)"
        min="1"
        :max="Math.ceil(totalFound / perPage)"
        type="number"
        :value="currentPage + 1"
        :class="ui.paginationInput"
      >
      <button type="button" @click="goToPage(currentPage - 1)" :class="ui.paginationPrev">
        {{ translations.pagination_prev }}
      </button>
      <button type="button" @click="goToPage(currentPage + 1)" :class="ui.paginationNext">
        {{ translations.pagination_next }}
      </button>
    </div>
  </div>
</template>
