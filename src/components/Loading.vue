<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "default",
  },
});
</script>

<template>
  <div class="w-full h-full" v-if="type === 'default'">
    <div class="flex items-start gap-4 animate-pulse h-full w-full">
      <div class="w-full h-full bg-gray-300"></div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>

  <div
    v-if="type === 'spinner'"
    class="flex justify-center flex-col gap-2 items-center py-10"
  >
    <div
      class="w-8 h-8 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"
    ></div>
    <p class="text-sm text-gray-500 font-medium">Memuat Data</p>
  </div>
</template>
