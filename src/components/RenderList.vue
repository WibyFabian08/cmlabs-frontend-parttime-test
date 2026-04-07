<script setup>
const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <template v-if="loading">
    <slot name="loading"></slot>
  </template>
  <template v-else>
    <template v-if="data && data.length > 0">
      <slot name="content" />
    </template>
    <template v-else>
      <h6 class="text-center text-black text-2xl">Data Tidak Tersedia</h6>
    </template>
  </template>
</template>
