<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { inject, unref } from 'vue';
import { defaultClasses } from './classes.js';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  },
  rowClass: {
    type: [String, Function],
    default: null
  },
  translations: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['row-click']);

const ui = inject('dtClasses', defaultClasses);
const unstyled = inject('dtUnstyled', false);

const resolveRowClass = (row) => {
  if (typeof props.rowClass === 'function') return props.rowClass(row) || '';
  return props.rowClass || '';
};

/** Ellipsis is on by default; set column.ellipsis = false to disable. */
const hasEllipsis = (column) => column.ellipsis !== false;

/** Wrap is off by default (single line). Set column.wrap = true to allow multi-line. */
const allowsWrap = (column) => column.wrap === true;

/** Explicit size via column.width (e.g. '8rem'). No width → column sizes to content. */
const hasWidth = (column) => Boolean(column.width);

const isUnstyled = () => unref(unstyled) === true;

const cellStyle = (column) => {
  if (!hasWidth(column)) return undefined;
  return { width: column.width, maxWidth: column.width };
};

const cellOverflowClass = (column) => {
  if (isUnstyled() || allowsWrap(column)) return '';
  // Clip only when a fixed width is set; otherwise the column may grow (table scroll).
  if (hasWidth(column) && hasEllipsis(column)) return 'dt-cell-clip';
  return '';
};

const cellTextClass = (column) => {
  if (isUnstyled()) return '';
  if (allowsWrap(column)) return 'dt-wrap';
  if (hasEllipsis(column) && hasWidth(column)) return 'dt-ellipsis';
  return 'dt-nowrap';
};

const cellTitle = (value, column) => {
  if (isUnstyled() || !hasEllipsis(column) || !hasWidth(column) || allowsWrap(column)) {
    return undefined;
  }
  if (value == null || value === '') return undefined;
  return String(value);
};
</script>

<template>
  <tbody :class="ui.tbody">
    <TransitionGroup :name="options.rowTransition">
      <tr v-for="(row, index) in data" :key="row.id ?? index" :class="[ui.row, resolveRowClass(row)]">
        <td
          @click="emit('row-click', row, item)"
          v-for="item in columns"
          :key="item.name"
          :class="[ui.td, cellOverflowClass(item), item?.class?.td]"
          :style="cellStyle(item)"
        >
          <component
            v-if="item.component"
            :is="item.component"
            :data="row"
            :val="row[item.name]"
            :ellipsis="hasEllipsis(item) && hasWidth(item)"
            :wrap="allowsWrap(item)"
            :class="isUnstyled() ? '' : 'dt-cell-fill'"
          />
          <div
            v-else
            :class="cellTextClass(item)"
            :title="cellTitle(row[item.name], item)"
          >
            {{ row[item.name] }}
          </div>
        </td>
      </tr>
    </TransitionGroup>
  </tbody>
</template>
