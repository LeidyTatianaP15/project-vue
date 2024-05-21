<script setup lang="ts">
import {defineProps, defineEmits, ref, watch} from 'vue';

const props = defineProps({
  modalOpen: Boolean,
  type: {
    type: String,
    required: true,
    validator: value => ['project', 'task', 'edit'].includes(value)
  },
  task: {
    type: Object,
    default: () => ({title: '', description: '', status: ''})
  }
});

const emit = defineEmits(['close', 'add', 'update', 'success']);
const title = ref('');
const description = ref('');
const status = ref('');
const closeModal = () => {
  emit('close');
};

watch(() => props.task, (newTask) => {
  title.value = newTask.title;
  description.value = newTask.description;
  status.value = newTask.status;
}, { deep: true });

const handleSubmit = (event: Event) => {
  event.preventDefault();
  const data = {
    title: title.value,
    description: description.value,
    status: status.value
  };

  if (props.type === 'edit') {
    emit('update', data);
  } else {
    emit('add', data);
  }

  title.value = '';
  description.value = '';
  status.value = '';
  closeModal();
  emit('success');
};

if (props.type === 'edit') {
  title.value = props.task.title;
  description.value = props.task.description;
  status.value = props.task.status;
}

</script>

<template>
  <!-- Main modal -->
  <div v-if="modalOpen" id="crud-modal" tabindex="-1" aria-hidden="true"
       class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-500 bg-opacity-50"
       style="z-index: 100">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ type === 'project' ? 'Añadir proyecto' : type === 'edit' ? 'Editar proyecto' : 'Añadir tarea' }}
          </h3>
          <button type="button" @click="closeModal"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-toggle="crud-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <form @submit="handleSubmit" class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <label for="title" class="block mb-2 text-sm font-medium text-gray-900">Título</label>
              <input type="text" name="title" id="title" v-model="title"
                     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                     placeholder="Título" required>
            </div>
            <div v-if="props.type === 'project' || props.type === 'edit'" class="col-span-2">
              <label for="status"
                     class="block mb-2 text-sm font-medium text-gray-900">Estado</label>
              <select id="status" v-model="status"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      required>
                <option value="" disabled selected>Selecciona el estado</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
            <div v-if="props.type === 'task'" class="col-span-2">
              <label for="status"
                     class="block mb-2 text-sm font-medium text-gray-900">Estado</label>
              <select id="status" v-model="status"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      required>
                <option value="" disabled selected>Selecciona el estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En progreso">En progreso</option>
                <option value="Completada">Completada</option>
              </select>
            </div>
            <div class="col-span-2">
              <label for="description"
                     class="block mb-2 text-sm font-medium text-gray-900">Descripción</label>
              <textarea id="description" rows="4" name="description" v-model="description"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                        placeholder=".............." required></textarea>
            </div>
          </div>
          <button type="submit"
                  class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            {{ type === 'edit' ? 'Guardar Cambios' : 'Añadir' }}
          </button>
        </form>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>