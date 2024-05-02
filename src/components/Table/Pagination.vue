<script setup>
const props = defineProps({
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
  }
});

const selectPerPage = props.perPage;
const options = [
  {
    name: "10",
    value: 10
  },
  {
    name: "25",
    value: 25
  },
  {
    name: "50",
    value: 50
  },
  {
    name: "100",
    value: 100
  },
];

</script>

<template>
  <div class="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 p-4 border-t">
    <small>Showing <strong>{{ startFrom + 1 }}</strong>-<strong>{{ endTo > totalFound ? totalFound : endTo }}</strong> of <strong>{{ totalFound }}</strong></small>
    <div v-show="totalFound > perPage" class="flex items-center">
      <select @change="setPerPage" v-model="selectPerPage" class="bg-gray-50 border border-gray-300 text-gray-900 font-medium text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 mr-4">
        <option v-for="item in options" :key="item.value" :value="item.value">{{ item.name }}</option>
      </select>
    
      <span @click="goToPage(currentPage - 1)" class="flex items-center justify-center px-3 h-8 ml-0 font-medium leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer">Previous</span>
      <span @click="goToPage(currentPage + 1)" class="flex items-center justify-center px-3 h-8 ml-0 font-medium leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer">Next</span>
    </div>
  </div>
</template>