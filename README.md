# Another Data Table with Vue 3

This Data table uses 2 sets of data: one for the set with the data and the second (optional) for the table header columns.

## Basic usage

Pass the **tableData** as a prop to the **TableData** component and thats it. In this case the table header labels are used as the key name.

```js
const tableData = [
  {
    id: 1,
    firstName: "Chyna",
    lastName: "Cruickshank"
  },
  {
    id: 2,
    firstName: "Chyna2",
    lastName: "Cruickshank2"
  },
  ...
]
```

```html
  <template>
    <TableData :data="tableData"></TableData>
  </template>
```


| id | firstName | lastName |
| --- | --- | --- |
| 1 | Chyna | Cruickshank |
| 2 | Chyna2 | Cruickshank2 |

## Advanced usage

Pass the **tableHeader** as a prop to the **TableData** to customize the table header

```js
const tableHeader = [
  {
    name: 'id',
    label: 'ID',
    sortable: true,
    searchable: false,
    class: {
      th: 'p-4 w-20 text-center',
      td: 'text-center'
    }
  },
  {
    name: 'firstName',
    label: 'First Name',
    sortable: true,
    searchable: true,
    class: {
      th: 'p-4 w-20 text-center',
      td: 'text-center'
    }
  },
  {
    name: 'lastName',
    label: 'Last Name',
    sortable: true,
    searchable: true,
    class: {
      th: 'p-4 w-20 text-center',
      td: 'text-center'
    }
  },
]
```

```html
  <template>
    <TableData :data="tableData" :columns="tableHeader"></TableData>
  </template>
```

| Command | Description |
| --- | --- |
| `git status` | List all *new or modified* files |
| `git diff` | Show file differences that **haven't been** staged |

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
