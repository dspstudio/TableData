<script setup>
import { faker } from 'https://esm.sh/@faker-js/faker';

import { onMounted, ref } from 'vue';
import TableData from './components/Table/Data.vue';
import TdEmail from './components/Email.vue';
import TdAvatar from './components/Avatar.vue';
import DeleteButton from './components/DeleteButton.vue';
import Password from './components/Password.vue';

const data = ref(null);
const header = [
  {
    name: 'id',
    label: 'ID',
    sortable: false,
    searchable: false,
    class: {
      th: 'p-4 w-20 text-center',
      td: 'text-center'
    }
  },
  {
    name: 'userName',
    label: 'Username',
    sortable: true,
    searchable: true,
    component: TdAvatar,
    class: {}
  },
  {
    name: 'email',
    label: 'Email address',
    sortable: true,
    searchable: true,
    component: TdEmail,

  },
  {
    name: 'firstName',
    label: 'First Name',
    sortable: true,
    searchable: true,
    class: {}
  },
  {
    name: 'lastName',
    label: 'Last Name',
    sortable: true,
    searchable: true,
    class: {}
  },
  {
    name: 'sex',
    label: 'Gender',
    sortable: true,
    searchable: true,
    class: {}
  },
  {
    name: 'ipAddress',
    label: 'IP',
    sortable: true,
    searchable: true,
  },
  {
    name: 'password',
    label: 'Password',
    sortable: false,
    searchable: false,
    component: Password,
  },
  {
    name: 'delete',
    label: 'Delete',
    sortable: false,
    searchable: false,
    component: DeleteButton,
    class: {
      th: 'w-20 text-center',
      td: 'cursor-pointer'
    }
  },
];

onMounted(() => {
  setTimeout(() => {
    data.value = generateFakeData(10000);
  }, 1000);
});

const generateFakeData = (numObjects = 1) => {
  const objectsArray = [];

  for (let i = 1; i < numObjects+1; i++) {
    const fakeObject = {};

    fakeObject.id = i;
    fakeObject.uuid = faker.string.uuid();
    fakeObject.firstName = faker.person.firstName();
    fakeObject.lastName = faker.person.lastName();
    fakeObject.userName = faker.internet.userName();
    fakeObject.sex = faker.person.sexType(),
    fakeObject.email = faker.internet.email();
    fakeObject.address = faker.location.streetAddress();
    fakeObject.avatar = faker.image.avatar();
    fakeObject.birthday = faker.date.birthdate();
    fakeObject.subscriptionTier = faker.helpers.arrayElement(['free', 'basic', 'business']);
    fakeObject.ipAddress = faker.internet.ip();
    fakeObject.userAgent = faker.internet.userAgent();
    fakeObject.password = faker.string.alpha(8);

    objectsArray.push(fakeObject);
  }

  return objectsArray;
}

const rowClick = (row, item) => {
  console.log(row, item);
  if (item.name === 'delete') {
    const index = data.value.findIndex(x => x.id === row.id);
    if (index !== -1) {
      if (confirm('Are you sure you want to delete ' + row.userName + '?')) {
        data.value.splice(index, 1);
      }
    }
  }
}
</script>

<template>
  <main class="flex flex-col gap-8 p-8">
    <section class="container mx-auto">
      <div>
        <h1 class="text-xl font-bold">Advanced data table made with Vue.js 3.x</h1>
        <p>This data table is a simple and easy-to-use data table component made with Vue.js 3.x. The data table component in Vuetify 3 hasn’t been released yet, so i made this component by referring to the API and UI of data table component in Vuetify 2.</p>
        <h2>Features</h2>
        
        <ul>
          <li>Searchable
            <ul>
              <li>- define global search true/false</li>
              <li>- define individual search column true/false</li>
              <li>- TODO: default search data not listed? now is false</li>
            </ul>
          </li>
          <li>Sortable</li>
          <li>Filterable</li>
          <li>Customizable</li>
        </ul>
      </div>
      Examples TODO:
      example with teleport
      example from multiple sources 
      
    </section>

    <section>
      <TableData caption="Full featured table" :rowClick="rowClick" :data="data" :columns="header" :searchable="true" :showFooter="true">
        <template #widgets>
          <button @click="data = []; data = generateFakeData(1000)">regenerate data</button>
        </template>
        <template #afterHeader>
          <tr>
            <td :colspan="header.length" class="border-t border-b p-4">
              <h3>Legend:</h3>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus tempora eius quia accusamus recusandae quo repellendus labore nemo totam consequatur impedit praesentium, laudantium facilis debitis iure consequuntur harum animi distinctio!</p>
            </td>
          </tr>
        </template>

        <template #beforeFooter>
          <tr>
            <td :colspan="header.length" class="border-t border-b p-4">
              <h3>Legend:</h3>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus tempora eius quia accusamus recusandae quo repellendus labore nemo totam consequatur impedit praesentium, laudantium facilis debitis iure consequuntur harum animi distinctio!</p>
            </td>
          </tr>
        </template>
      </TableData>
    </section>

    <section>
      <TableData caption="Basic table" :data="generateFakeData(1000)"></TableData>
    </section>
  </main>
</template>

<style>
.dataTableWrapper {
  @apply border rounded-lg shadow;
}
.dataTableCaption {
  @apply flex flex-col lg:flex-row items-center justify-between gap-4 p-4 border-b
}
.dataTableCaption p {
  @apply text-2xl font-bold
}
</style>
