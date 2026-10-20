<script setup>
import { faker } from '@faker-js/faker/locale/en';

import { onMounted, ref } from 'vue';
import TableData from './components/Table/Data.vue';
import TdEmail from './components/Email.vue';
import TdAvatar from './components/Avatar.vue';
import DeleteButton from './components/DeleteButton.vue';
import Password from './components/Password.vue';

const data = ref(null);
const restData = ref(null);
/** Zero-config demo: plain objects only, no column defs or cell components. */
const plainDemoData = ref(
  Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    city: faker.location.city(),
  }))
);

const header = [
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
    component: TdAvatar,
  },
  {
    name: 'email',
    label: 'Email address',
    sortable: true,
    searchable: true,
    ellipsis: false,
    wrap: false,
    component: TdEmail,
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
    component: Password,
  },
  {
    name: 'delete',
    label: 'Delete',
    sortable: false,
    searchable: false,
    width: '4.5rem',
    component: DeleteButton,
    class: {
      th: 'dt-align-center',
      td: 'dt-align-center'
    }
  },
];

onMounted(() => {
  setTimeout(() => {
    data.value = generateFakeData(10000);
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

const regenerateData = () => {
  data.value = generateFakeData(1000);
}

const rowClick = (row, item) => {
  if (item.name !== 'delete') return;

  const index = data.value.findIndex(x => x.id === row.id);
  if (index !== -1 && confirm(`Are you sure you want to delete ${row.userName}?`)) {
    data.value.splice(index, 1);
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
        <a href="#props">Props</a>
        <a href="#columns">Columns</a>
        <a href="#theming">Theming</a>
        <a href="#slots">Slots</a>
        <a href="#example-basic">Basic example</a>
        <a href="#example-full">Full example</a>
        <a href="#example-default">Unstyled</a>
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
          <strong>Auto columns</strong>
          Omit <code>columns</code> and headers are inferred from the first row’s keys.
        </li>
        <li>
          <strong>Loading state</strong>
          Pass <code>:data="null"</code> to show a loading spinner until rows are ready.
        </li>
        <li>
          <strong>Row actions</strong>
          Use <code>:rowClick</code> to handle cell clicks (e.g. delete).
        </li>
        <li>
          <strong>i18n-ready</strong>
          Override labels through the <code>translations</code> prop.
        </li>
        <li>
          <strong>Theming</strong>
          CSS variables on <code>.dt</code> plus a <code>classes</code> prop to append your own class names.
        </li>
      </ul>
    </section>

    <section id="usage" class="docs-section">
      <h2>Usage</h2>
      <p>
        Import <code>TableData</code>, pass <code>:data</code>, and optionally
        <code>:columns</code> for labels, sort/search flags, classes, and cell components.
      </p>
<pre class="docs-code"><code>&lt;TableData
  :data="rows"
  :columns="columns"
  caption="Users"
  :searchable="true"
  :showFooter="true"
  :rowClick="onRowClick"
/&gt;</code></pre>
      <p class="docs-note">
        Sorting and filtering run on the full in-memory array; only the current page is rendered.
        There is no virtual scrolling yet.
      </p>
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
              <td><code>data</code></td>
              <td><code>Array | null</code></td>
              <td>—</td>
              <td>Row objects. Use <code>null</code> while loading.</td>
            </tr>
            <tr>
              <td><code>columns</code></td>
              <td><code>Array</code></td>
              <td><code>[]</code></td>
              <td>Column definitions. Empty → infer from first row.</td>
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
              <td>Initial rows per page.</td>
            </tr>
            <tr>
              <td><code>currentPage</code></td>
              <td><code>Number</code></td>
              <td><code>0</code></td>
              <td>Initial page (0-based).</td>
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
              <td>Called as <code>(row, column)</code> when a cell is clicked.</td>
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
              <td><code>unstyled</code></td>
              <td><code>Boolean</code></td>
              <td><code>false</code></td>
              <td>
                Omit all default <code>dt-*</code> theme classes (header, rows, chrome,
                etc.) for bring-your-own CSS.
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
              <td>Key on each row object.</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td><code>String</code></td>
              <td>Header text.</td>
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
              <td>Custom cell renderer; receives <code>data</code> (row) and <code>val</code>.</td>
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
  component: TdEmail
}</code></pre>
      <p class="docs-note">
        Columns without <code>width</code> auto-size to their content (no per-cell
        scrollbars). Set <code>width</code> when you want a fixed column; then
        <code>ellipsis: true</code> (default) clips with <code>…</code>. The table wrapper
        scrolls horizontally if the whole table is wider than the viewport.
      </p>
    </section>

    <section id="theming" class="docs-section">
      <h2>Theming</h2>
      <p>
        Visual design lives in <code>datatable.css</code> on semantic classes
        (<code>.dt</code>, <code>.dt-row</code>, …). Two ways to customize:
      </p>
      <h3>1. CSS variables</h3>
      <p>Override tokens on <code>.dt</code> or a parent wrapper:</p>
<pre class="docs-code"><code>.my-table .dt {
  --dt-border-color: #0f172a;
  --dt-row-hover-bg: #e0f2fe;
  --dt-loading-accent: #0284c7;
  --dt-caption-title-size: 1.25rem;
}</code></pre>
      <p class="docs-note">
        Main tokens: <code>--dt-bg</code>, <code>--dt-border-color</code>,
        <code>--dt-border-radius</code>, <code>--dt-shadow</code>,
        <code>--dt-row-hover-bg</code>, <code>--dt-cell-padding</code>,
        <code>--dt-input-bg</code>, <code>--dt-input-border</code>,
        <code>--dt-loading-accent</code>, <code>--dt-muted</code>.
        See <code>src/components/Table/datatable.css</code> for the full list.
      </p>
      <h3>2. <code>classes</code> prop</h3>
      <p>
        Append your own class names onto any part. Defaults stay; your string is
        added after them. Works with plain CSS — no utility framework required.
        Use <code>unstyled</code> when you want <em>no</em> default theme classes at all
        (including <code>.dt-th</code> header styles).
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
        footer header, caption widgets, and <code>rowClick</code> for delete confirmation.
        Starts with 10&nbsp;000 fake rows (loading spinner for ~1s).
      </p>
<pre class="docs-code"><code>&lt;TableData
  caption="Full featured table"
  :data="data"
  :columns="header"
  :searchable="true"
  :showFooter="true"
  :rowClick="rowClick"
&gt;
  &lt;template #widgets&gt;…&lt;/template&gt;
  &lt;template #afterHeader&gt;…&lt;/template&gt;
  &lt;template #beforeFooter&gt;…&lt;/template&gt;
&lt;/TableData&gt;</code></pre>
      <div class="docs-demo docs-theme-sky">
        <TableData
          caption="Full featured table"
          :rowClick="rowClick"
          :data="data"
          :columns="header"
          :searchable="true"
          :showFooter="true"
        >
          <template #widgets>
            <button type="button" class="docs-btn" @click="regenerateData">
              Regenerate (1 000 rows)
            </button>
          </template>
          <template #afterHeader>
            <tr>
              <td :colspan="header.length" class="docs-slot-cell">
                <strong>afterHeader slot</strong>
                — tip: click a sortable column to order rows; use Delete to remove a user
                via <code>rowClick</code>.
              </td>
            </tr>
          </template>
          <template #beforeFooter>
            <tr>
              <td :colspan="header.length" class="docs-slot-cell">
                <strong>beforeFooter slot</strong>
                — search only matches columns marked <code>searchable: true</code>
                (password and delete are excluded).
              </td>
            </tr>
          </template>
        </TableData>
      </div>
    </section>

    <section id="example-default" class="docs-section">
      <h2>Example: unstyled (bring your own CSS)</h2>
      <p>
        Pass <code>:unstyled="true"</code> to skip all default <code>dt-*</code> theme
        classes — including header styling. You get bare markup (plus pagination
        controls) so you can theme from scratch. Still no <code>columns</code> here:
        headers are inferred from object keys.
      </p>
<pre class="docs-code"><code>&lt;TableData :data="plainDemoData" unstyled /&gt;</code></pre>
      <div class="docs-demo">
        <TableData :data="plainDemoData" unstyled />
      </div>
    </section>
  </main>
</template>
