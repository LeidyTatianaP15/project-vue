<script setup lang="ts">

import AddModalComponent from "@/components/modal/AddModal.vue";
import {ref} from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();

const modalOpen = ref(false);
const modalType = ref('task');
const projectTitle = ref('');

const tasks = ref<{ title: string; description: string; status: string; }[]>([
  {title: 'Tarea 1', description: 'Descripción de la tarea 1', status: 'Pendiente'},
  {title: 'Tarea 2', description: 'Descripción de la tarea 2', status: 'En progreso'},
  {title: 'Tarea 3', description: 'Descripción de la tarea 3', status: 'Completada'},
  {title: 'Tarea 4', description: 'Descripción de la tarea 4', status: 'Pendiente'}
]);

const handleAdd = (task: { title: string; description: string; status: string }) => {
  tasks.value.push(task);
};

const openModal = (type: 'project' | 'task') => {
  modalType.value = type;
  modalOpen.value = true;
};

const closeModal = () => {
  modalOpen.value = false;
};

const tasksPending = computed(() => tasks.value.filter(task => task.status === 'Pendiente').length);
const tasksInProgress = computed(() => tasks.value.filter(task => task.status === 'En progreso').length);
const tasksCompleted = computed(() => tasks.value.filter(task => task.status === 'Completada').length);

projectTitle.value = route.query.title || '';

</script>

<template>
  <div class="mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Proyecto {{ projectTitle }}</h1>
    <div class="flex mx-2 items-center justify-end">
      <button type="button" @click="openModal('task')"
              class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 me-2" viewBox="0 0 24 24" fill="none"
             stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Añadir tarea
      </button>
    </div>

    <div class="relative overflow-x-automt-12 sm:px-2 md:px-10 mt-6">
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
        </tr>
        </thead>
        <tbody>
        <tr>
          <td v-if="tasks.length === 0" colspan="4" class="px-6 py-4 text-center text-sm font-medium">No hay tareas
            disponibles
          </td>
        </tr>

        <tr v-for="(task, index) in tasks" :key="index" class="bg-white border-b border-b-gray-400">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900">
            {{ task.title }}
          </th>
          <td class="px-6 py-4">
            {{ task.description }}
          </td>
          <td class="px-6 py-4">
            {{ task.status }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-10">
      <h5 class="font-bold">Estadísticas</h5>
      <div class="flex justify-around items-center">

        <div class="flex">
          <span class="font-medium">Pendiente :</span>
          <span class="ml-1 font-thin">{{ tasksPending }}</span>
        </div>

        <div class="flex">
          <span class="font-medium">En progreso:</span>
          <span class="ml-1 font-thin">{{ tasksInProgress }}</span>
        </div>

        <div class="flex">
          <span class="font-medium">Completada :</span>
          <span class="ml-1 font-thin">{{ tasksCompleted }}</span>
        </div>

      </div>
    </div>
  </div>

  <AddModalComponent v-if="modalOpen" :modalOpen="modalOpen" :type="modalType" @close="closeModal"
                     @add="handleAdd"></AddModalComponent>
</template>