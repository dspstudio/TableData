<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, computed } from 'vue';
import TableHeader from './Header.vue';
import TableBody from './Body.vue';
import TableSearch from './Search.vue';
import TablePagination from './Pagination.vue';

const props = defineProps({
  data: {
    type: [Array, null],
    required: true
  },
  columns: {
    type: Array,
    default() {
      return []
    }
  },
  perPage: {
    type: Number,
    default: 10
  },
  currentPage: {
    type: Number,
    default: 0
  },
  caption: {
    type: String,
    default: ''
  },
  searchable: {
    type: Boolean,
    default: false
  },
  initialSortKey: {
    type: String,
    default: null
  },
  initialSortOrder: {
    type: String,
    default: null
  },
  showFooter: {
    type: Boolean,
    default: false
  },
  rowClick: {
    type: Function,
    default: null
  },
  options: {
    type: Object,
    default: () => ({
      rowTransition: 'fade'
    })
  }
});

const perPage = ref(props.perPage);
const currentPage = ref(props.currentPage);
const totalFound = ref(0);
const searchValue = ref('');
const sort = ref(props.initialSortKey);
const order = ref(props.initialSortOrder);

const computedData = computed(() => {
  let rows = props.data;
  const keys = Object.values(computedHeader.value);

  //search 
  if (searchValue.value != '') {
    const filteredRows = rows.filter(item => {
      let isMatch = false;
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key.searchable) {
          if (item[key.name] == null) continue;
          if (item[key.name].toString().toLowerCase().includes(searchValue.value.toLowerCase())) {
            isMatch = true;
          }
        }
      }

      if (isMatch) { return item; }
    });
    rows = filteredRows;
  }

  const sortedRows = quickSort(rows, sort.value, order.value);

  (() => {
    totalFound.value = sortedRows.length;
    if (currentPage.value >= Math.ceil(totalFound.value / perPage.value)) {
      currentPage.value = 0;
    }
  })()

  //pagination
  const pagedRows = sortedRows.slice(startFrom.value, endTo.value);

  return pagedRows;
});


const computedHeader = computed(() => {
  if (props.columns.length === 0 && props.data) {
    return Object.keys(props.data.at(0)).map(x => {
      return {
        name: x,
        label: x,
        sortable: false,
        searchable: false,
        class: {
          th: 'p-4 w-20 text-center',
          td: 'text-center'
        }
      }
    });
  } else {
    return props.columns;
  }
});

const computedSearchable = computed(() => {
  let search = (props.columns.filter(x => x.searchable));
  if (search.length === 0) {
    return false;
  }
  return props.searchable;
});

const startFrom = computed(() => {
  return perPage.value * currentPage.value;
});

const endTo = computed(() => {
  return perPage.value * (currentPage.value + 1);
});

const isLoading = computed(() => {
  return props.data == null;
});

const handleInputSearch = (value) => {
  searchValue.value = value;
}

const goToPage = (page) => {
  if (page >= 0 && page * perPage.value < totalFound.value) {
    currentPage.value = page;
  }
}
const sortBy = (key, sortOrder) => {
  if (props.columns.filter(x => x.name === key && x.sortable).length === 0) return;

  sort.value = key;
  order.value = sort.value === key ? (order.value === 'asc' ? 'desc' : 'asc') : sortOrder;
};
// const sortBy = (key, orderr) => {
//   if (props.columns.filter(x => x.sortable).length === 0) { return; }
//   if ( sort.value !== key ) { order.value = orderr || 'asc'; }
//   else { order.value = ( order.value === 'asc' ) ? 'desc' : 'asc'; }
//   sort.value = key;
// }

function quickSort(arr, key, order) {
  if (arr.length <= 1 || key == null || order == null) {
    return arr;
  }
  // Validate order argument (optional)
  order = order.toUpperCase() === "DESC" ? -1 : 1;

  return arr.sort((a, b) => {
    // Access property values using bracket notation
    const valueA = a[key];
    const valueB = b[key];

    // Handle different data types (optional)
    if (typeof valueA === "string") {
      return valueA.localeCompare(valueB) * order; // Use localeCompare for proper string comparison
    } else {
      return (valueA - valueB) * order;
    }
  });
}

const setPerPage = (event) => {
  perPage.value = Number(event.target.value) || perPage.value;
}
</script>

<template>
  <section class="dataTableWrapper">
    <div class="dataTableCaption">
      <p v-if="caption">{{ caption }}</p>
      <div v-if="$slots.widgets">
          <slot name="widgets"></slot>
      </div>
      <TableSearch v-if="computedSearchable" :handleInputSearch="handleInputSearch" :searchValue="searchValue" />
    </div>
  
    <div style="overflow-x:auto;"> <!-- for mobile auto scrollbar -->
      <table class="w-full h-full table-auto lg:table-fixed text-sm text-left">
        <thead>
          <TableHeader :columns="computedHeader" :sortBy="sortBy" :order="order" :sort="sort" />
        </thead>

        <tbody v-if="$slots.afterHeader">
          <slot name="afterHeader"></slot>
        </tbody>

        <Transition mode="out-in">
          <tbody v-if="isLoading">
            <tr>
              <td :colspan="computedHeader.length" class="text-center p-4">
                <div role="status">
                    <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin fill-indigo-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
          </tbody>
          <TableBody v-else-if="computedData.length > 0" :options="options" :data="computedData" :columns="computedHeader" :rowClick="rowClick" />
          <tbody v-else>
            <tr>
              <td :colspan="computedHeader.length" class="text-center p-4">No results found</td>
            </tr>
          </tbody>
        </Transition>
        
        <tbody v-if="$slots.beforeFooter">
          <slot name="beforeFooter"></slot>
        </tbody>
        
        <tfoot v-if="showFooter">
          <TableHeader :columns="computedHeader" :sortBy="sortBy" :order="order" :sort="sort" />
        </tfoot>

      </table>
    </div>
  
    <Transition>
      <TablePagination v-if="!isLoading" :goToPage="goToPage" :setPerPage="setPerPage" :startFrom :endTo :currentPage :totalFound :perPage />
    </Transition>
  </section>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.150s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>