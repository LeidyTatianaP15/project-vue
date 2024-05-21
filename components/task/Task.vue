<template>

  <div class="px-5 mt-5">
    <div class="flex justify-between items-center">
      <div class="flex w-1/2">
        <button @click="toggleDropdown()"
                class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center bg-white text-gray-900 border border-gray-300 rounded-s-lg hover:bg-gray-200"
                type="button">{{ filterButtonText }}
          <svg :class="{'rotate-180': dropdownOpen}" class="w-2.5 h-2.5 ms-2.5" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m1 1 4 4 4-4"/>
          </svg>
        </button>
        <div v-show="dropdownOpen"
             class="absolute left-5 top-32 mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
          <ul class="py-2 text-sm text-gray-700 " aria-labelledby="dropdown-button">
            <li>
              <button @click="(event) => filterByStatus('Inactivo', event)"
                      class="inline-flex w-full px-4 py-2 hover:bg-gray-100">
                Inactivo
              </button>
            </li>
            <li>
              <button @click="(event) => filterByStatus('Activo', event)"
                      class="inline-flex w-full px-4 py-2 hover:bg-gray-100">
                Activo
              </button>
            </li>
            <li>
              <button @click="(event) => filterByStatus('Todas', event)"
                      class="inline-flex w-full px-4 py-2 hover:bg-gray-100">
                Todas
              </button>
            </li>
          </ul>
        </div>
        <div class="relative w-full">
          <input type="search" id="search-dropdown" v-model="searchQuery"
                 class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300"
                 placeholder="Buscar ..."/>
          <button type="submit"
                  class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
      <div class="flex mx-2 items-center">
        <button type="button" @click="openModal('project')"
                class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 me-2" viewBox="0 0 24 24" fill="none"
               stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Añadir proyecto
        </button>
      </div>
    </div>
  </div>

  <AddModalComponent v-if="modalOpen" :modalOpen="modalOpen" :type="modalType" @close="closeModal"
                     @add="handleAdd" :task="taskToEdit" @update="saveTask"></AddModalComponent>

  <AnswerModalComponent v-if="showSuccessModal" :showSuccessModal="showSuccessModal" @close="closeSuccessModal"
                        @confirm="deleteTask"/>

  <div class="relative overflow-x-auto shadow-md mt-12 sm:px-2 md:px-10">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 mb-12">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
      <tr>
        <th scope="col" class="px-6 py-3">
          Título
        </th>
        <th scope="col" class="px-6 py-3">
          Descripción
        </th>
        <th scope="col" class="px-6 py-3">
          Estado
        </th>
        <th scope="col" class="px-6 py-3">
          Acción
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="filteredTasks.length === 0">
        <td colspan="4" class="px-6 py-4 text-center text-sm font-medium">No hay proyectos disponibles</td>
      </tr>

      <tr v-for="(task, index) in filteredTasks" :key="index" class="bg-white border-b border-b-gray-400">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          <NuxtLink :to="{ path: `/project-task/${index}`, query: { title: task.title } }">{{ task.title }}</NuxtLink>
        </th>
        <td class="px-6 py-4">
          {{ task.description }}
        </td>
        <td class="px-6 py-4">
          {{ task.status }}
        </td>

        <td class="px-6 py-4">
          <a  @click="editTask(index)" class="font-medium text-blue-600 hover:underline cursor-pointer">Editar</a>
          <a href="#" class="font-medium text-red-600 hover:underline ml-2"
             @click="confirmDeleteTask(index)">Eliminar</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import AddModalComponent from "@/components/modal/AddModal.vue";
import AnswerModalComponent from "@/components/modal/AswerModal.vue";

const dropdownOpen = ref(false);

const tasks = ref<{ title: string; description: string; status: string; }[]>([
  {title: 'Proyecto 1', description: 'Descripción del proyecto 1', status: 'Activo'},
  {title: 'Proyecto 2', description: 'Descripción del proyecto 2', status: 'Inactivo'},
  {title: 'Proyecto 3', description: 'Descripción del proyecto 3', status: 'Activo'},
  {title: 'Proyecto 4', description: 'Descripción del proyecto 4', status: 'Activo'},
  {title: 'Proyecto 5', description: 'Descripción del proyecto 5', status: 'Activo'}
]);

const modalOpen = ref(false);
const modalType = ref('project');
const showSuccessModal = ref(false);
const statusFilter = ref('Todas');
const searchQuery = ref('');
const currentTaskIndex = ref<number | null>(null);
const taskToEdit = ref({ title: '', description: '', status: '' });
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
}

const openModal = (type: 'project' | 'task') => {
  modalType.value = type;
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
};
const handleAdd = (task: { title: string; description: string; status: string }) => {
  tasks.value.push(task);
};

const filterButtonText = computed(() => {
  return statusFilter.value === 'Todas' ? 'Todas' : statusFilter.value;
});

const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const matchesSearchQuery = task.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatusFilter = statusFilter.value === 'Todas' || task.status === statusFilter.value;
    return matchesSearchQuery && matchesStatusFilter;
  });
});

const filterByStatus = (status: string, event: Event) => {
  event.preventDefault();
  statusFilter.value = status;
  dropdownOpen.value = false;
};

const confirmDeleteTask = (index: number) => {
  currentTaskIndex.value = index;
  showSuccessModal.value = true;
};

const deleteTask = () => {
  if (currentTaskIndex.value !== null) {
    tasks.value.splice(currentTaskIndex.value, 1);
    currentTaskIndex.value = null;
  }
  showSuccessModal.value = false;
};

const editTask = (index: number) => {
  currentTaskIndex.value = index;
  taskToEdit.value = { ...tasks.value[index] };
  modalType.value = 'edit';
  modalOpen.value = true;
};
const saveTask = (task: { title: string; description: string; status: string }) => {
  if (currentTaskIndex.value !== null) {
    tasks.value[currentTaskIndex.value] = task;
  } else {
    tasks.value.push(task);
  }
  closeModal();
};
const closeSuccessModal = () => {
  showSuccessModal.value = false;
};

</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>
