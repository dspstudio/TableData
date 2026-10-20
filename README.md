# Vue 3 Data Table

A lightweight data table component for Vue 3 (`<script setup>`, no dependencies). It supports
search, sorting, column filters, pagination, row selection, a sticky header, custom cells,
slots, and theming with CSS variables. It can run fully in the browser or against your API
in server-side mode.

```bash
npm install
npm run dev     # docs & demos
npm run build
```

The component lives in `src/components/Table/`. Import `Data.vue`; it pulls in its own
`datatable.css`.

## Basic usage

Preferred: one `columns` array; each column carries its values in `data`.

```vue
<script setup>
import TableData from './components/Table/Data.vue';

const columns = [
  {
    name: 'email',
    label: 'Email address',
    sortable: true,
    searchable: true,
    data: ['ada@lovelace.dev', 'alan@turing.test'],
  },
  {
    name: 'firstName',
    label: 'First Name',
    sortable: true,
    searchable: true,
    data: ['Ada', 'Alan'],
  },
];
</script>

<template>
  <TableData :columns="columns" searchable />
</template>
```

Still supported: pass row objects as `:data`. Without `columns`, headers are inferred from
the first row's keys. Loading: `:columns="null"` (columnar) or `:data="null"` (row mode).

## Columns

```js
const columns = [
  { name: 'id', label: 'ID', width: '4.5rem', data: [1, 2], class: { th: 'dt-align-center', td: 'dt-align-center' } },
  { name: 'firstName', label: 'First Name', sortable: true, searchable: true, data: ['Ada', 'Alan'] },
  { name: 'avatar', label: 'Avatar', hidden: true, data: ['/a.png', '/b.png'] },
  { name: 'userName', label: 'Username', component: AvatarCell, data: ['ada', 'alan'] },
];
```

| Key | Type | Description |
| --- | --- | --- |
| `name` | `String` | Field key (required). |
| `label` | `String` | Header text (defaults to `name`). |
| `data` | `Array` | Values for this column (one per row). If present on any column, rows are zipped from these arrays. |
| `hidden` | `Boolean` | Keep in the zipped row but do not render a grid column. |
| `sortable` | `Boolean` | Click the header (or press Enter/Space) to sort. |
| `searchable` | `Boolean` | Include in the global search. |
| `filterable` | `Boolean` | Show a text filter under the header (case-insensitive contains). |
| `filterOptions` | `Array` | Show a dropdown filter (exact match). Values or `{ label, value }`. |
| `width` | `String` | Fixed column width; enables ellipsis. |
| `ellipsis` | `Boolean` | Clip overflowing text with `…` (default `true`, needs `width`). |
| `wrap` | `Boolean` | Allow text to wrap (default `false`). |
| `class` | `{ th, td }` | Extra classes for header and body cells. |
| `component` | `Component` | Cell component; receives `data` (row), `val`, `ellipsis`, `wrap`. Use `markRaw(Comp)` if columns are stored in a `ref`. |

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `columns` | `Array \| null` | `[]` | Column defs (prefer with per-column `data`). `null` = loading. |
| `data` | `Array \| null` | `null` | Optional row objects when columns have no `data` arrays. `null` = loading. |
| `caption` | `String` | `''` | Title shown above the table. |
| `searchable` | `Boolean` | `false` | Show the global search box. |
| `searchDebounce` | `Number` | `0` | Delay (ms) before search and text filters apply. |
| `currentPage` | `Number` | `0` | 0-based page. Supports `v-model:currentPage`. |
| `perPage` | `Number` | `10` | Page size. Supports `v-model:perPage`. |
| `initialSortKey` | `String` | `null` | Column to sort by on mount. |
| `initialSortOrder` | `'asc' \| 'desc'` | `null` | Initial sort direction. |
| `selectable` | `Boolean` | `false` | Add a checkbox column. |
| `selected` | `Array` | `[]` | Selected row keys. Use `v-model:selected`. |
| `itemKey` | `String` | `'id'` | Unique row field for keys and selection. |
| `serverSide` | `Boolean` | `false` | Delegate paging, sort, search and filters to your API. |
| `total` | `Number` | `0` | Total rows on the server (server-side mode). |
| `loading` | `Boolean` | `false` | Dim rows while refetching. |
| `stickyHeader` | `Boolean` | `false` | Keep the header visible while scrolling (use with `height`). |
| `height` | `String` | `null` | Max height of the scroll area, e.g. `'480px'`. |
| `showFooter` | `Boolean` | `false` | Repeat the header row in `<tfoot>`. |
| `options` | `Object` | `{ rowTransition: 'fade' }` | Row transition name. |
| `theme` | `String` | `'light'` | Adds `dt-theme-<name>` on the root. Built-ins: `light` (shipped with the component), `dark`, `compact`, `minimal` (import those CSS files first). |
| `classes` | `Object` | `{}` | Extra class names per part (see Theming). |
| `unstyled` | `Boolean` | `false` | Drop all default theme classes (advanced / bring-your-own CSS). |
| `translations` | `Object` | `{}` | Override any UI strings; missing keys fall back to English. |
| `rowClick` | `Function` | `null` | Deprecated: use `@row-click`. |
| `rowClass` | `String \| Function` | `null` | Extra class(es) on each data row; function is `(row) => string`. |

## Events

| Event | Payload | When |
| --- | --- | --- |
| `row-click` | `(row, column)` | A data cell is clicked. |
| `update:options` | `{ page, perPage, sortKey, sortOrder, search, filters }` | Any paging, sort, search or filter change. Also fires on mount in server-side mode. |
| `update:currentPage` / `update:perPage` / `update:selected` | value | `v-model` updates. |
| `update:sort` | `{ key, order }` | Sort changes. |
| `update:search` | `String` | The debounced search text changes. |
| `update:filters` | `Object` | Column filters change (only non-empty ones). |

## Selection

```vue
<TableData :data="rows" :columns="columns" selectable v-model:selected="selectedIds" />
```

`selectedIds` holds `row[itemKey]` values. The header checkbox selects or clears the current page.

## Server-side mode

With `server-side`, `data` is the current page only. The table emits `update:options`, and you
fetch the page and pass `total`:

```vue
<TableData
  server-side
  :data="rows"
  :total="total"
  :loading="loading"
  :columns="columns"
  searchable
  :search-debounce="300"
  @update:options="fetchPage"
/>
```

```js
let requestId = 0;

async function fetchPage({ page, perPage, sortKey, sortOrder, search, filters }) {
  const id = ++requestId;
  loading.value = true;
  const res = await api.users({ page, perPage, sortKey, sortOrder, search, ...filters });
  if (id !== requestId) return; // a newer request is in flight
  rows.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
```

## Slots

| Slot | Props | Description |
| --- | --- | --- |
| `widgets` | — | Toolbar content next to the search box. |
| `afterHeader` | `{ colspan }` | Rows right after `<thead>`. |
| `beforeFooter` | `{ colspan }` | Rows right before `<tfoot>`. |
| `cell-<name>` | `{ row, value, column, index }` | Custom cell for column `name`. |
| `loading` | — | Replaces the spinner. |
| `empty` | — | Replaces "No results found." |

```vue
<TableData :data="rows" :columns="columns">
  <template #cell-plan="{ value }">
    <span class="badge">{{ value }}</span>
  </template>
  <template #afterHeader="{ colspan }">
    <tr><td :colspan="colspan">Tip: click a header to sort.</td></tr>
  </template>
</TableData>
```

## Theming

`datatable.css` is layout only. Each theme is a file under `src/components/Table/themes/`
that sets `--dt-*` variables on `.dt.dt-theme-<name>`.

**light** (`themes/light.css`) is the default and is imported by `datatable.css`, so it
works with no extra import. It also sets the base tokens on `.dt` so other themes inherit
padding/spacing and only override what they change.

### Use a built-in theme

```js
import '@/components/Table/themes/dark.css'
// or all of them: '@/components/Table/themes/index.css'
```

```vue
<TableData :data="rows" />                 <!-- theme="light" by default -->
<TableData :data="rows" theme="dark" />
<TableData :data="rows" theme="compact" />
```

Built-ins: `light`, `dark`, `compact`, `minimal`.
Different tables on the same page can use different themes — each selector is
`.dt.dt-theme-<name>`, so they do not clash.

### Add a new theme

1. Create a file, e.g. `src/components/Table/themes/ocean.css`:

```css
.dt.dt-theme-ocean {
  --dt-bg: #ffffff;
  --dt-border-color: #bae6fd;
  --dt-th-bg: #f0f9ff;
  --dt-th-color: #0369a1;
  --dt-row-hover-bg: #e0f2fe;
  --dt-loading-accent: #0284c7;
  --dt-sort-active: #0369a1;
}
```

2. Import it once (app entry, or next to the table):

```js
import '@/components/Table/themes/ocean.css'
```

3. Pass the same name to the prop:

```vue
<TableData :data="rows" theme="ocean" />
```

The class **must** be `.dt.dt-theme-<name>` and match the `theme` string.
To ship it with the other built-ins, also add `@import './ocean.css';` in
`src/components/Table/themes/index.css`.

Main tokens: `--dt-bg`, `--dt-text`, `--dt-muted`, `--dt-border-color`,
`--dt-border-radius`, `--dt-shadow`, `--dt-font-size`, `--dt-th-bg`, `--dt-th-color`,
`--dt-th-padding`, `--dt-cell-padding`, `--dt-row-hover-bg`, `--dt-input-bg`,
`--dt-input-border`, `--dt-loading-accent`. Full list in `themes/light.css`.

### `classes` prop

Append your own class names onto any part (defaults stay). See
`src/components/Table/classes.js` for every key.

```vue
<TableData :data="rows" :classes="{ root: 'my-table', th: 'my-th', row: 'my-row' }" />
```

### `unstyled`

Advanced: drop every default `dt-*` theme class and style bare markup from scratch.
