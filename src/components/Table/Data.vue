<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, computed, watch, provide } from 'vue';
import './datatable.css';
import { mergeClasses } from './classes.js';
import TableHeader from './Header.vue';
import TableBody from './Body.vue';
import TableSearch from './Search.vue';
import TablePagination from './Pagination.vue';

const props = defineProps({
  /**
   * Row objects. Optional when each column carries a `data` array (columnar mode).
   * Pass `null` to show the loading state (row mode).
   */
  data: {
    type: [Array, null],
    default: null
  },
  /**
   * Column defs. Each may include `data: []` of per-column values; the table zips
   * those into rows. Use `hidden: true` for fields needed by cell components but
   * not shown. Pass `null` to show loading in columnar mode.
   */
  columns: {
    type: [Array, null],
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
  total: {
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
  /** Extra class(es) per data row — string or `(row) => string`. */
  rowClass: {
    type: [String, Function],
    default: null
  },
  options: {
    type: Object,
    default: () => ({
      rowTransition: 'fade'
    })
  },
  /** Extra class names per part — appended onto defaults (see classes.js). */
  classes: {
    type: Object,
    default: () => ({})
  },
  /** Adds `dt-theme-<name>` to the root. Import the matching file from ./themes/. */
  theme: {
    type: String,
    default: 'light'
  },
  /** Skip default `dt-*` theme classes (bare markup for bring-your-own CSS). */
  unstyled: {
    type: Boolean,
    default: false
  },
  translations: {
    type: Object,
    default: () => ({
      no_results_found: 'No results found.',
      search_items_placeholder: 'Search for items',
      loading: 'Loading...',
      pagination_showing: 'Showing',
      pagination_of: 'of',
      pagination_per_page: 'Per page',
      pagination_page: 'Page',
      pagination_next: 'Next',
      pagination_prev: 'Previous'
    })
  }
});

const emit = defineEmits([
  'row-click',
  'update:currentPage',
  'update:perPage',
  'update:sort',
  'update:search',
]);

const ui = computed(() => mergeClasses(props.classes, { unstyled: props.unstyled }));
provide('dtClasses', ui);
provide('dtUnstyled', computed(() => props.unstyled));

const rootClass = computed(() => [
  ui.value.root,
  !props.unstyled && props.theme ? `dt-theme-${props.theme}` : '',
]);

const perPage = ref(props.perPage);
const currentPage = ref(props.currentPage);
const searchValue = ref('');
const sort = ref(props.initialSortKey);
const order = ref(props.initialSortOrder);

watch(() => props.perPage, (value) => { perPage.value = value; });
watch(() => props.currentPage, (value) => { currentPage.value = value; });

watch(currentPage, (value) => emit('update:currentPage', value));
watch(perPage, (value) => emit('update:perPage', value));
watch(searchValue, (value) => emit('update:search', value));
watch([sort, order], ([key, sortOrder]) => emit('update:sort', { key, order: sortOrder }));

const handleRowClick = (row, column) => {
  props.rowClick?.(row, column);
  emit('row-click', row, column);
};

const isColumnar = computed(() =>
  Array.isArray(props.columns) && props.columns.some((column) => Array.isArray(column.data))
);

/** All column defs (including hidden). Empty while columns is null (loading). */
const allColumns = computed(() => {
  if (props.columns == null) return [];
  if (props.columns.length > 0) return props.columns;

  const firstRow = props.data?.[0];
  if (!firstRow) return [];

  return Object.keys(firstRow).map((name) => ({
    name,
    label: name,
    sortable: false,
    searchable: false,
    class: {}
  }));
});

/** Columns rendered in thead/tbody (excludes `hidden: true`). */
const computedHeader = computed(() =>
  allColumns.value.filter((column) => !column.hidden)
);

/** Zip column.data arrays into row objects; otherwise use the `data` prop. */
const tableRows = computed(() => {
  if (isColumnar.value) {
    return rowsFromColumnData(props.columns);
  }
  return props.data ?? [];
});

const filteredData = computed(() => {
  const rows = tableRows.value;
  const query = searchValue.value.toLowerCase();
  if (query === '') return rows;

  const searchableColumns = allColumns.value.filter((column) => column.searchable);
  return rows.filter((row) => searchableColumns.some((column) =>
    row[column.name] != null && row[column.name].toString().toLowerCase().includes(query)
  ));
});

const sortedData = computed(() => sortRows(filteredData.value, sort.value, order.value));

const totalFound = computed(() => sortedData.value.length);

const computedData = computed(() => sortedData.value.slice(startFrom.value, endTo.value));

watch([totalFound, perPage], () => {
  if (currentPage.value >= Math.ceil(totalFound.value / perPage.value)) {
    currentPage.value = 0;
  }
});

const computedSearchable = computed(() => {
  return props.searchable && allColumns.value.some((column) => column.searchable);
});

const startFrom = computed(() => {
  return perPage.value * currentPage.value;
});

const endTo = computed(() => {
  return perPage.value * (currentPage.value + 1);
});

const isLoading = computed(() => {
  if (props.columns == null) return true;
  if (isColumnar.value) return false;
  return props.data == null;
});

function rowsFromColumnData(columns) {
  const withData = columns.filter((column) => Array.isArray(column.data));
  const length = Math.max(0, ...withData.map((column) => column.data.length));

  return Array.from({ length }, (_, index) => {
    const row = {};
    for (const column of withData) {
      row[column.name] = column.data[index];
    }
    if (row.id == null) row.id = index;
    return row;
  });
}

const handleInputSearch = (value) => {
  searchValue.value = value;
}

const goToPage = (page) => {
  if (page >= 0 && page * perPage.value < totalFound.value) {
    currentPage.value = page;
  }
}
const sortBy = (key, sortOrder) => {
  if (!allColumns.value.some((column) => column.name === key && column.sortable)) return;

  if (sort.value === key) {
    order.value = order.value === 'asc' ? 'desc' : 'asc';
  } else {
    sort.value = key;
    order.value = sortOrder;
  }
};

function sortRows(rows, key, sortOrder) {
  if (rows.length <= 1 || key == null || sortOrder == null) {
    return rows;
  }
  const direction = sortOrder.toLowerCase() === 'desc' ? -1 : 1;

  // Copy before sorting: Array.prototype.sort mutates, and `rows` may be the parent's prop.
  return [...rows].sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    if (valueA == null) return valueB == null ? 0 : 1;
    if (valueB == null) return -1;

    if (typeof valueA === 'string') {
      return valueA.localeCompare(String(valueB)) * direction;
    }
    return (valueA - valueB) * direction;
  });
}

const setPerPage = (event) => {
  perPage.value = Number(event.target.value) || perPage.value;
}
</script>

<template>
  <section :class="rootClass">
    <div :class="ui.caption">
      <p v-if="caption" :class="ui.captionTitle">{{ caption }}</p>
      <div v-if="$slots.widgets" :class="ui.widgets">
        <slot name="widgets"></slot>
      </div>
      <TableSearch
        v-if="computedSearchable"
        :handleInputSearch="handleInputSearch"
        :searchValue="searchValue"
        :translations="translations"
      />
    </div>
    <div :class="ui.scroll">
      <table :class="ui.table">
        <thead :class="ui.thead">
          <TableHeader :columns="computedHeader" :sortBy="sortBy" :order="order" :sort="sort" :translations="translations" />
        </thead>

        <tbody v-if="$slots.afterHeader">
          <slot name="afterHeader"></slot>
        </tbody>

        <Transition mode="out-in">
          <tbody v-if="isLoading" :class="ui.tbody">
            <tr>
              <td :colspan="computedHeader.length" :class="ui.loading">
                <div role="status">
                    <svg aria-hidden="true" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="dt-sr-only">{{ translations.loading }}</span>
                </div>
              </td>
            </tr>
          </tbody>
          <TableBody
            v-else-if="computedData.length > 0"
            :options="options"
            :data="computedData"
            :columns="computedHeader"
            :row-class="rowClass"
            :translations="translations"
            @row-click="handleRowClick"
          />
          <tbody v-else :class="ui.tbody">
            <tr>
              <td :colspan="computedHeader.length" :class="ui.empty">{{ translations.no_results_found }}</td>
            </tr>
          </tbody>
        </Transition>

        <tbody v-if="$slots.beforeFooter">
          <slot name="beforeFooter"></slot>
        </tbody>

        <tfoot v-if="showFooter" :class="ui.tfoot">
          <TableHeader :columns="computedHeader" :sortBy="sortBy" :order="order" :sort="sort" :translations="translations" />
        </tfoot>
      </table>
    </div>

    <Transition>
      <TablePagination
        v-if="!isLoading"
        :goToPage="goToPage"
        :setPerPage="setPerPage"
        :startFrom
        :endTo
        :currentPage
        :totalFound
        :perPage
        :translations="translations"
      />
    </Transition>
  </section>
</template>
