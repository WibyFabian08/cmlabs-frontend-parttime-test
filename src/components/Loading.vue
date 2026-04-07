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
</template>
