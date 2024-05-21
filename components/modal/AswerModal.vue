<template>
  <div v-if="showSuccessModal" id="popup-modal" tabindex="-1"
       class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-500 bg-opacity-50"
       style="z-index: 200">
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow">
        <button type="button" @click="closeModal"
                class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="popup-modal">
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <span
              class="mb-5 text-lg font-normal text-gray-500">¿Está seguro que desea eliminar este proyecto?</span>

          <div class="flex justify-center space-x-4 mt-5">
            <button @click="confirmDelete"
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
              Aceptar
            </button>
            <button @click="closeModal"
                    class="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
              Cancelar
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, defineEmits} from 'vue';

const props = defineProps({
  showSuccessModal: Boolean,
});

const emit = defineEmits(['close', 'confirm']);

const closeModal = () => {
  emit('close');
};

const confirmDelete = () => {
  emit('close');
  emit('confirm');
};
</script>

<style scoped>

</style>