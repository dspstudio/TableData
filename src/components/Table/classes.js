/** Default semantic class names. Override via the `classes` prop (values are appended). */
export const defaultClasses = {
  root: 'dt',
  caption: 'dt-caption',
  captionTitle: 'dt-caption-title',
  widgets: 'dt-widgets',
  scroll: 'dt-scroll',
  table: 'dt-table',
  thead: 'dt-thead',
  tbody: 'dt-tbody',
  tfoot: 'dt-tfoot',
  th: 'dt-th',
  thSortable: 'dt-th-sortable',
  td: 'dt-td',
  row: 'dt-row',
  sortable: 'dt-sortable',
  sortIcons: 'dt-sort-icons',
  sortActive: 'dt-sort-active',
  sortInactive: 'dt-sort-inactive',
  sortLabel: 'dt-sort-label',
  loading: 'dt-loading',
  empty: 'dt-empty',
  search: 'dt-search',
  searchWrap: 'dt-search-wrap',
  searchIcon: 'dt-search-icon',
  searchClear: 'dt-search-clear',
  searchInput: 'dt-search-input',
  pagination: 'dt-pagination',
  paginationInfo: 'dt-pagination-info',
  paginationControls: 'dt-pagination-controls',
  paginationSelect: 'dt-pagination-select',
  paginationInput: 'dt-pagination-input',
  paginationPrev: 'dt-pagination-prev',
  paginationNext: 'dt-pagination-next',
};

/**
 * Class map when `unstyled` is true — no theme classes.
 * Root keeps `dt-unstyled` only for a tiny UA reset (browsers center `<th>` by default).
 */
export const unstyledClasses = Object.fromEntries(
  Object.keys(defaultClasses).map((key) => [key, key === 'root' ? 'dt-unstyled' : ''])
);

/**
 * Merge user `classes` overrides onto defaults.
 * When `unstyled` is true, default `dt-*` theme classes are omitted.
 */
export function mergeClasses(overrides = {}, { unstyled = false } = {}) {
  const base = unstyled ? unstyledClasses : defaultClasses;
  const merged = { ...base };
  for (const key of Object.keys(overrides)) {
    if (overrides[key] == null || overrides[key] === '') continue;
    merged[key] = [base[key], overrides[key]].filter(Boolean).join(' ');
  }
  return merged;
}
