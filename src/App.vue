<script setup>
import { faker } from '@faker-js/faker/locale/en';

import { computed, markRaw, onMounted, ref } from 'vue';
import TableData from './components/Table/Data.vue';
import TdEmail from './components/Email.vue';
import TdAvatar from './components/Avatar.vue';
import DeleteButton from './components/DeleteButton.vue';
import Password from './components/Password.vue';
import './components/Table/themes/index.css';

const restData = ref(null);
/** Full-featured demo: columnar columns (null = loading). */
const fullColumns = ref(null);
/** Full-featured demo: last `@row-click` selection. */
const selectedRow = ref(null);
const selectedColumn = ref(null);

const themes = ['light', 'dark', 'compact', 'minimal', 'sky'];
const activeTheme = ref('dark');

const themeDemoColumns = [
  { name: 'id', label: 'ID', sortable: true, width: '4rem' },
  { name: 'name', label: 'Name', sortable: true, searchable: true },
  { name: 'email', label: 'Email', sortable: true, searchable: true },
  { name: 'city', label: 'City', sortable: true, searchable: true },
];
const themeDemoData = ref(
  Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    city: faker.location.city(),
  }))
);

/** Tiny columnar sample shown on the docs page (JSON + live table). */
const sampleColumns = [
  {
    name: 'id',
    label: 'ID',
    sortable: true,
    width: '4rem',
    data: [1, 2, 3],
  },
  {
    name: 'name',
    label: 'Name',
    sortable: true,
    searchable: true,
    data: ['Ada Lovelace', 'Alan Turing', 'Grace Hopper'],
  },
  {
    name: 'email',
    label: 'Email',
    sortable: true,
    searchable: true,
    data: ['ada@lovelace.dev', 'alan@turing.test', 'grace@hopper.navy'],
  },
];
const sampleColumnsJson = JSON.stringify(sampleColumns, null, 2);

/** Schema only — values live in each column’s `data` array after buildColumns(). */
const columnDefs = [
  {
    name: 'id',
    label: 'ID',
    sortable: false,
    searchable: false,
    width: '4.5rem',
    class: {
      th: 'dt-align-center',
      td: 'dt-align-center'
    }
  },
  {
    name: 'userName',
    label: 'Username',
    sortable: true,
    searchable: true,
    component: markRaw(TdAvatar),
  },
  {
    name: 'avatar',
    label: 'Avatar',
    hidden: true,
    searchable: false,
  },
  {
    name: 'sex',
    label: 'Sex',
    hidden: true,
    searchable: false,
  },
  {
    name: 'email',
    label: 'Email address',
    sortable: true,
    searchable: true,
    ellipsis: false,
    wrap: false,
    component: markRaw(TdEmail),
  },
  {
    name: 'firstName',
    label: 'First Name',
    sortable: true,
    searchable: true,
  },
  {
    name: 'lastName',
    label: 'Last Name',
    sortable: true,
    searchable: true,
  },
  {
    name: 'password',
    label: 'Password',
    sortable: false,
    searchable: false,
    width: '8rem',
    component: markRaw(Password),
  },
  {
    name: 'delete',
    label: 'Delete',
    sortable: false,
    searchable: false,
    width: '4.5rem',
    component: markRaw(DeleteButton),
    class: {
      th: 'dt-align-center',
      td: 'dt-align-center'
    }
  },
];

const fullFeaturedColspan = computed(() =>
  (fullColumns.value ?? columnDefs).filter((column) => !column.hidden).length
);

onMounted(() => {
  setTimeout(() => {
    fullColumns.value = buildColumns(generateFakeData(10000));
  }, 1000);

  getRESTData();
});

const generateFakeData = (count = 1) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    uuid: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    userName: faker.internet.username(),
    sex: faker.person.sexType(),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    avatar: faker.image.avatar(),
    birthday: faker.date.birthdate(),
    subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
    ipAddress: faker.internet.ip(),
    userAgent: faker.internet.userAgent(),
    password: faker.string.alpha(8),
  }));
}

/** Attach a `data` array to each column def (one value per row). */
const buildColumns = (rows) =>
  columnDefs.map((column) => ({
    ...column,
    // Keep cell components non-reactive when nested in `fullColumns` ref.
    component: column.component ? markRaw(column.component) : undefined,
    data: rows.map((row) => (column.name === 'delete' ? null : row[column.name])),
  }));

const regenerateData = () => {
  fullColumns.value = buildColumns(generateFakeData(1000));
  selectedRow.value = null;
  selectedColumn.value = null;
}

const clearSelection = () => {
  selectedRow.value = null;
  selectedColumn.value = null;
}

const fullFeaturedRowClass = (row) => (
  selectedRow.value?.id === row.id ? 'docs-row-selected' : ''
)

const rowClick = (row, item) => {
  selectedRow.value = row;
  selectedColumn.value = item;

  if (item.name !== 'delete' || !fullColumns.value) return;

  const idColumn = fullColumns.value.find((column) => column.name === 'id');
  const index = idColumn?.data?.findIndex((id) => id === row.id) ?? -1;
  if (index === -1) return;
  if (!confirm(`Are you sure you want to delete ${row.userName}?`)) return;

  clearSelection();
  for (const column of fullColumns.value) {
    if (Array.isArray(column.data)) column.data.splice(index, 1);
  }
}

const getRESTData = async () => {
  try {
    const response = await fetch('https://reqres.in/api/users?page=1');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    restData.value = await response.json();
  } catch (error) {
    console.error('Failed to load REST data:', error);
  }
}
</script>

<template>
  <main class="docs">
    <header class="docs-hero">
      <p class="docs-eyebrow">Vue 3 · Composition API</p>
      <h1>Data Table</h1>
      <p class="docs-lead">
        A lightweight, client-side data table for Vue 3. Pass a row array, optionally describe
        columns, and you get search, sort, pagination, custom cells, and slots — inspired by
        Vuetify 2’s data table API.
      </p>
      <nav class="docs-toc" aria-label="On this page">
        <a href="#features">Features</a>
        <a href="#usage">Usage</a>
        <a href="#sample-json">JSON sample</a>
        <a href="#props">Props</a>
        <a href="#columns">Columns</a>
        <a href="#theming">Theming</a>
        <a href="#slots">Slots</a>
        <a href="#example-basic">Basic example</a>
        <a href="#example-full">Full example</a>
        <a href="#example-themes">Themes</a>
      </nav>
    </header>

    <section id="features" class="docs-section">
      <h2>Features</h2>
      <ul class="docs-feature-list">
        <li>
          <strong>Search</strong>
          Global search via <code>:searchable="true"</code>. Only columns with
          <code>searchable: true</code> are matched.
        </li>
        <li>
          <strong>Sort</strong>
          Click a sortable column header to toggle ascending / descending order.
        </li>
        <li>
          <strong>Pagination</strong>
          Client-side paging with configurable page size (10 / 25 / 50 / 100).
        </li>
        <li>
          <strong>Custom cells</strong>
          Set <code>component</code> on a column to render a Vue component with the row as
          <code>data</code>.
        </li>
        <li>
          <strong>Columnar or row data</strong>
          Put values on each column as <code>data: []</code>, or pass row objects via
          <code>:data</code> (omit columns to infer headers).
        </li>
        <li>
          <strong>Loading state</strong>
          Pass <code>:columns="null"</code> (columnar) or <code>:data="null"</code> (rows)
          to show a loading spinner.
        </li>
        <li>
          <strong>Row actions</strong>
          Listen to <code>@row-click</code> for cell clicks; use <code>rowClass</code> to
          highlight the active row.
        </li>
        <li>
          <strong>i18n-ready</strong>
          Override labels through the <code>translations</code> prop.
        </li>
        <li>
          <strong>Theming</strong>
          Built-in <code>light</code>, <code>dark</code>, <code>compact</code>, and
          <code>minimal</code> themes via the <code>theme</code> prop, or write your own with CSS variables.
        </li>
      </ul>
    </section>

    <section id="usage" class="docs-section">
      <h2>Usage</h2>
      <p>
        Preferred: one <code>columns</code> array where each column holds its own
        <code>data</code> values. The table zips those arrays into rows.
      </p>
<pre class="docs-code"><code>&lt;TableData
  :columns="columns"
  caption="Users"
  :searchable="true"
  :showFooter="true"
  @row-click="onRowClick"
/&gt;

// columns[i] looks like:
{
  name: 'email',
  label: 'Email address',
  sortable: true,
  searchable: true,
  component: TdEmail,
  data: ['a@x.com', 'b@x.com', /* … */],
}</code></pre>
      <p class="docs-note">
        Still supported: pass row objects as <code>:data</code> and schema-only
        <code>:columns</code> (or omit columns to infer headers). Sorting and search run
        on the full in-memory set; only the current page is rendered.
      </p>
    </section>

    <section id="sample-json" class="docs-section">
      <h2>JSON sample</h2>
      <p>
        Minimal columnar payload — three columns, three rows. Pass this array as
        <code>:columns</code>; the table zips the <code>data</code> arrays into rows.
      </p>
<pre class="docs-code"><code>{{ sampleColumnsJson }}</code></pre>
<pre class="docs-code"><code>&lt;TableData :columns="sampleColumns" caption="Sample" :searchable="true" /&gt;</code></pre>
      <div class="docs-demo">
        <TableData
          :columns="sampleColumns"
          caption="Sample"
          :searchable="true"
          :perPage="5"
        />
      </div>
    </section>

    <section id="props" class="docs-section">
      <h2>Props</h2>
      <div class="docs-table-wrap">
        <table class="docs-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>columns</code></td>
              <td><code>Array | null</code></td>
              <td><code>[]</code></td>
              <td>
                Column defs. Prefer each with a <code>data</code> array of values.
                <code>null</code> = loading. Empty + <code>:data</code> → infer headers.
              </td>
            </tr>
            <tr>
              <td><code>data</code></td>
              <td><code>Array | null</code></td>
              <td><code>null</code></td>
              <td>
                Optional row objects when columns do not carry <code>data</code> arrays.
                <code>null</code> = loading (row mode).
              </td>
            </tr>
            <tr>
              <td><code>caption</code></td>
              <td><code>String</code></td>
              <td><code>''</code></td>
              <td>Title shown above the table.</td>
            </tr>
            <tr>
              <td><code>searchable</code></td>
              <td><code>Boolean</code></td>
              <td><code>false</code></td>
              <td>Show the search input (needs at least one searchable column).</td>
            </tr>
            <tr>
              <td><code>perPage</code></td>
              <td><code>Number</code></td>
              <td><code>10</code></td>
              <td>Rows per page. Supports <code>v-model:perPage</code>.</td>
            </tr>
            <tr>
              <td><code>currentPage</code></td>
              <td><code>Number</code></td>
              <td><code>0</code></td>
              <td>Page (0-based). Supports <code>v-model:currentPage</code>.</td>
            </tr>
            <tr>
              <td><code>initialSortKey</code></td>
              <td><code>String</code></td>
              <td><code>null</code></td>
              <td>Column <code>name</code> to sort on mount.</td>
            </tr>
            <tr>
              <td><code>initialSortOrder</code></td>
              <td><code>String</code></td>
              <td><code>null</code></td>
              <td><code>'asc'</code> or <code>'desc'</code>.</td>
            </tr>
            <tr>
              <td><code>showFooter</code></td>
              <td><code>Boolean</code></td>
              <td><code>false</code></td>
              <td>Repeat the header row in <code>&lt;tfoot&gt;</code>.</td>
            </tr>
            <tr>
              <td><code>rowClick</code></td>
              <td><code>Function</code></td>
              <td><code>null</code></td>
              <td>Deprecated — use <code>@row-click</code>. Still called as <code>(row, column)</code>.</td>
            </tr>
            <tr>
              <td><code>rowClass</code></td>
              <td><code>String | Function</code></td>
              <td><code>null</code></td>
              <td>
                Extra class(es) on each data row. Function form:
                <code>(row) =&gt; string</code> (e.g. selected highlight).
              </td>
            </tr>
            <tr>
              <td><code>options</code></td>
              <td><code>Object</code></td>
              <td><code>{ rowTransition: 'fade' }</code></td>
              <td>UI options (e.g. row transition name).</td>
            </tr>
            <tr>
              <td><code>classes</code></td>
              <td><code>Object</code></td>
              <td><code>{}</code></td>
              <td>
                Extra class names per part (<code>root</code>, <code>table</code>,
                <code>row</code>, <code>searchInput</code>, …). Appended onto defaults.
              </td>
            </tr>
            <tr>
              <td><code>theme</code></td>
              <td><code>String</code></td>
              <td><code>'light'</code></td>
              <td>
                Adds <code>dt-theme-&lt;name&gt;</code> to the root. Built-ins:
                <code>light</code> (included with the component),
                <code>dark</code>, <code>compact</code>, <code>minimal</code>
                (import those CSS files first).
              </td>
            </tr>
            <tr>
              <td><code>unstyled</code></td>
              <td><code>Boolean</code></td>
              <td><code>false</code></td>
              <td>
                Advanced: omit all default <code>dt-*</code> classes and the theme, rendering
                bare markup for a design system written from scratch.
              </td>
            </tr>
            <tr>
              <td><code>translations</code></td>
              <td><code>Object</code></td>
              <td>English strings</td>
              <td>Overrides for search, loading, and pagination labels.</td>
            </tr>
            <tr>
              <td><code>total</code></td>
              <td><code>Number</code></td>
              <td><code>0</code></td>
              <td>Reserved for future server-side paging; unused today.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>Events</h3>
      <div class="docs-table-wrap">
        <table class="docs-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Payload</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>row-click</code></td>
              <td><code>(row, column)</code></td>
              <td>A data cell is clicked.</td>
            </tr>
            <tr>
              <td><code>update:currentPage</code></td>
              <td><code>Number</code></td>
              <td>Page changes (0-based).</td>
            </tr>
            <tr>
              <td><code>update:perPage</code></td>
              <td><code>Number</code></td>
              <td>Page size changes.</td>
            </tr>
            <tr>
              <td><code>update:sort</code></td>
              <td><code>{ key, order }</code></td>
              <td>Sort column or direction changes.</td>
            </tr>
            <tr>
              <td><code>update:search</code></td>
              <td><code>String</code></td>
              <td>Search text changes.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="columns" class="docs-section">
      <h2>Column shape</h2>
      <p>Each entry in <code>columns</code> can include:</p>
      <div class="docs-table-wrap">
        <table class="docs-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>name</code></td>
              <td><code>String</code></td>
              <td>Field key (and key on zipped row objects).</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td><code>String</code></td>
              <td>Header text.</td>
            </tr>
            <tr>
              <td><code>data</code></td>
              <td><code>Array</code></td>
              <td>
                Values for this column, one per row. If any column has <code>data</code>,
                the table zips them into rows (preferred).
              </td>
            </tr>
            <tr>
              <td><code>hidden</code></td>
              <td><code>Boolean</code></td>
              <td>
                Omit from the grid but still zip into the row (e.g. <code>avatar</code> /
                <code>sex</code> for custom cell components).
              </td>
            </tr>
            <tr>
              <td><code>sortable</code></td>
              <td><code>Boolean</code></td>
              <td>Allow sorting by this column.</td>
            </tr>
            <tr>
              <td><code>searchable</code></td>
              <td><code>Boolean</code></td>
              <td>Include this field in global search.</td>
            </tr>
            <tr>
              <td><code>component</code></td>
              <td><code>Component</code></td>
              <td>
                Custom cell renderer; receives <code>data</code> (row) and
                <code>val</code>. Wrap with <code>markRaw()</code> if columns live in a
                <code>ref</code>.
              </td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td><code>String</code></td>
              <td>
                Optional fixed size (e.g. <code>'8rem'</code>). Omit to size the column
                from its content.
              </td>
            </tr>
            <tr>
              <td><code>ellipsis</code></td>
              <td><code>Boolean</code></td>
              <td>
                Truncate with <code>…</code> when a <code>width</code> is set (default
                <code>true</code>). No effect without <code>width</code>.
              </td>
            </tr>
            <tr>
              <td><code>wrap</code></td>
              <td><code>Boolean</code></td>
              <td>
                Allow multi-line text (default <code>false</code> = one row).
              </td>
            </tr>
            <tr>
              <td><code>class</code></td>
              <td><code>Object</code></td>
              <td><code>{ th, td }</code> CSS classes for header and cells.</td>
            </tr>
          </tbody>
        </table>
      </div>
<pre class="docs-code"><code>{
  name: 'email',
  label: 'Email address',
  sortable: true,
  searchable: true,
  ellipsis: false,
  wrap: false,
  // no width → column grows to fit content
  component: TdEmail,
  data: ['ada@lovelace.dev', 'alan@turing.test'],
}</code></pre>
      <p class="docs-note">
        All <code>data</code> arrays should be the same length. Columns without
        <code>width</code> auto-size. Set <code>width</code> for a fixed column; then
        <code>ellipsis: true</code> (default) clips with <code>…</code>.
      </p>
    </section>

    <section id="theming" class="docs-section">
      <h2>Theming</h2>
      <p>
        <code>datatable.css</code> is layout only. Each theme is a file under
        <code>themes/</code> that sets <code>--dt-*</code> variables on
        <code>.dt.dt-theme-&lt;name&gt;</code>.         The default <code>light</code> theme
        (<code>themes/light.css</code>) is imported by <code>datatable.css</code> and sets
        base tokens on <code>.dt</code> so other themes inherit padding/spacing; other
        themes are opt-in and only override what they change.
      </p>
      <h3>1. Use a built-in theme</h3>
      <p>Import the theme file once (globally or where you use the table), then pick it per table:</p>
<pre class="docs-code"><code>import '@/components/Table/themes/dark.css';
// or all of them: '@/components/Table/themes/index.css'

&lt;TableData :data="rows" /&gt;                 &lt;!-- theme="light" by default --&gt;
&lt;TableData :data="rows" theme="dark" /&gt;
&lt;TableData :data="rows" theme="compact" /&gt;</code></pre>
      <p class="docs-note">
        Different tables on the same page can use different themes. Each theme only
        matches <code>.dt.dt-theme-&lt;name&gt;</code>, so they never clash.
      </p>
      <h3>2. Add a new theme</h3>
      <ol class="docs-steps">
        <li>
          Create a file under <code>src/components/Table/themes/</code>, e.g.
          <code>ocean.css</code>. The class must be
          <code>.dt.dt-theme-&lt;name&gt;</code> and match the <code>theme</code> prop.
        </li>
        <li>
          Import it once (app entry or next to the table). Optionally add
          <code>@import './ocean.css';</code> in <code>themes/index.css</code> to ship it
          with the built-ins.
        </li>
        <li>Pass the same name: <code>&lt;TableData theme="ocean" /&gt;</code>.</li>
      </ol>
<pre class="docs-code"><code>/* src/components/Table/themes/ocean.css */
.dt.dt-theme-ocean {
  --dt-bg: #ffffff;
  --dt-border-color: #bae6fd;
  --dt-th-bg: #f0f9ff;
  --dt-th-color: #0369a1;
  --dt-row-hover-bg: #e0f2fe;
  --dt-loading-accent: #0284c7;
  --dt-sort-active: #0369a1;
}

/* app entry or component */
import '@/components/Table/themes/ocean.css'

&lt;TableData :data="rows" theme="ocean" /&gt;</code></pre>
      <p>
        The full-featured demo below uses a docs-only <code>sky</code> theme defined the
        same way in <code>main.css</code>.
      </p>
      <p class="docs-note">
        Main tokens: <code>--dt-bg</code>, <code>--dt-text</code>, <code>--dt-muted</code>,
        <code>--dt-border-color</code>, <code>--dt-border-radius</code>, <code>--dt-shadow</code>,
        <code>--dt-font-size</code>, <code>--dt-th-bg</code>, <code>--dt-th-color</code>,
        <code>--dt-th-padding</code>, <code>--dt-cell-padding</code>,
        <code>--dt-row-hover-bg</code>, <code>--dt-input-bg</code>,
        <code>--dt-input-border</code>, <code>--dt-loading-accent</code>.
        See <code>src/components/Table/themes/light.css</code> for the full list.
      </p>
      <h3>3. <code>classes</code> prop</h3>
      <p>
        For one-off tweaks, append your own class names onto any part. Defaults stay; your
        string is added after them. Works with plain CSS — no utility framework required.
      </p>
<pre class="docs-code"><code>&lt;TableData
  :data="rows"
  :classes="{
    root: 'my-table',
    row: 'my-row',
    searchInput: 'my-search',
  }"
/&gt;

/* your CSS */
.my-row:hover { background: #e0f2fe; }
.my-search:focus { outline: 2px solid #38bdf8; }</code></pre>
      <p>
        Keys include: <code>root</code>, <code>caption</code>, <code>captionTitle</code>,
        <code>table</code>, <code>th</code>, <code>td</code>, <code>row</code>,
        <code>sortable</code>, <code>searchInput</code>, <code>pagination</code>,
        <code>paginationPrev</code>, <code>paginationNext</code>, and more — see
        <code>classes.js</code>.
      </p>
    </section>

    <section id="slots" class="docs-section">
      <h2>Slots</h2>
      <div class="docs-table-wrap">
        <table class="docs-table">
          <thead>
            <tr>
              <th>Slot</th>
              <th>Placement</th>
              <th>Typical use</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>widgets</code></td>
              <td>Caption bar (next to title / search)</td>
              <td>Toolbar actions (export, regenerate, filters).</td>
            </tr>
            <tr>
              <td><code>afterHeader</code></td>
              <td>Row(s) under <code>&lt;thead&gt;</code></td>
              <td>Legend, filters, or notices spanning all columns.</td>
            </tr>
            <tr>
              <td><code>beforeFooter</code></td>
              <td>Row(s) above <code>&lt;tfoot&gt;</code> / pagination</td>
              <td>Summary or secondary legend.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section id="example-basic" class="docs-section">
      <h2>Example: auto columns (REST)</h2>
      <p>
        No <code>columns</code> prop — headers come from the first object keys.
        Data is loaded from
        <a href="https://reqres.in/api/users?page=1" rel="noopener noreferrer" target="_blank">reqres.in</a>.
      </p>
<pre class="docs-code"><code>&lt;TableData
  caption="REST API table"
  :data="restData.data"
  :perPage="restData.per_page"
  :currentPage="restData.page - 1"
/&gt;</code></pre>
      <div v-if="restData" class="docs-demo">
        <TableData
          :perPage="restData.per_page"
          caption="REST API table"
          :data="restData.data"
          :currentPage="restData.page - 1"
          :total="restData.total"
        />
      </div>
      <p v-else class="docs-note">Loading remote sample…</p>
    </section>

    <section id="example-full" class="docs-section">
      <h2>Example: full featured</h2>
      <p>
        Custom column components (avatar, email, password reveal, delete), global search,
        footer header, caption widgets, and <code>@row-click</code>: click any cell to
        select the row (detail strip below); Delete still confirms removal.
        Starts with 10&nbsp;000 fake rows (loading spinner for ~1s).
      </p>
<pre class="docs-code"><code>&lt;TableData
  caption="Full featured table"
  :columns="fullColumns"
  :searchable="true"
  :showFooter="true"
  theme="sky"
  :classes="{ row: 'docs-row-clickable', tbody: 'docs-zebra' }"
  :row-class="(row) =&gt; row.id === selected?.id ? 'docs-row-selected' : ''"
  @row-click="onRowClick"
/&gt;</code></pre>
      <div class="docs-demo">
        <TableData
          caption="Full featured table"
          theme="sky"
          @row-click="rowClick"
          :columns="fullColumns"
          :searchable="true"
          :showFooter="true"
          :classes="{ row: 'docs-row-clickable', tbody: 'docs-zebra' }"
          :row-class="fullFeaturedRowClass"
        >
          <template #widgets>
            <button type="button" class="docs-btn" @click="regenerateData">
              Regenerate (1&nbsp;000 rows)
            </button>
          </template>
          <template #afterHeader>
            <tr>
              <td :colspan="fullFeaturedColspan" class="docs-slot-cell">
                <strong>afterHeader slot</strong>
                — click any cell to select a row; Delete removes via the same
                <code>@row-click</code> handler.
              </td>
            </tr>
          </template>
          <template #beforeFooter>
            <tr>
              <td :colspan="fullFeaturedColspan" class="docs-slot-cell">
                <strong>beforeFooter slot</strong>
                — search only matches columns marked <code>searchable: true</code>
                (password and delete are excluded).
              </td>
            </tr>
          </template>
        </TableData>
        <div v-if="selectedRow" class="docs-row-detail" role="status">
          <div class="docs-row-detail-main">
            <img
              v-if="selectedRow.avatar"
              class="docs-row-detail-avatar"
              :src="selectedRow.avatar"
              alt=""
              width="40"
              height="40"
            />
            <div>
              <p class="docs-row-detail-title">
                {{ selectedRow.firstName }} {{ selectedRow.lastName }}
                <span class="docs-row-detail-meta">@{{ selectedRow.userName }}</span>
              </p>
              <p class="docs-row-detail-sub">{{ selectedRow.email }}</p>
              <p class="docs-row-detail-column">
                Clicked column:
                <code>{{ selectedColumn?.label || selectedColumn?.name }}</code>
                (<code>{{ selectedColumn?.name }}</code>)
              </p>
            </div>
          </div>
          <button type="button" class="docs-btn" @click="clearSelection">Clear</button>
        </div>
        <div v-else class="docs-row-detail docs-row-detail--empty" role="status">
          <p class="docs-row-detail-empty-text">
            Click any data cell to select a row — this strip will show the payload and
            which column was clicked (<code>@row-click</code> → <code>(row, column)</code>).
          </p>
        </div>
      </div>
    </section>

    <section id="example-themes" class="docs-section">
      <h2>Example: themes</h2>
      <p>
        Same data and columns, different <code>theme</code>. Switch live — only the root
        class changes.
      </p>
      <div class="docs-theme-picker" role="group" aria-label="Theme">
        <button
          v-for="name in themes"
          :key="name"
          type="button"
          class="docs-btn"
          :aria-pressed="activeTheme === name"
          @click="activeTheme = name"
        >
          {{ name }}
        </button>
      </div>
<pre class="docs-code"><code>&lt;TableData
  caption="Customers"
  :data="rows"
  :columns="columns"
  :searchable="true"
  theme="{{ activeTheme }}"
/&gt;</code></pre>
      <div class="docs-demo">
        <TableData
          caption="Customers"
          :data="themeDemoData"
          :columns="themeDemoColumns"
          :searchable="true"
          :theme="activeTheme"
        />
      </div>
    </section>
  </main>
</template>
