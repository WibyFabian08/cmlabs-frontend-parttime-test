<script setup>
defineProps({
  breadcrumbs: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <nav class="text-sm">
    <ol class="flex items-center gap-2 text-gray-600">
      <li
        v-for="(item, index) in breadcrumbs"
        :key="index"
        class="flex items-center"
      >
        <router-link
          v-if="item.to && index !== breadcrumbs.length - 1"
          :class="{
            'text-gray-400 font-normal': index === breadcrumbs.length - 1,
          }"
          class="text-black font-medium"
          :to="item.to"
        >
          {{ item.label }}
        </router-link>

        <span
          v-else
          :class="{
            'text-gray-400 font-normal': index === breadcrumbs.length - 1,
          }"
          class="text-black font-medium"
        >
          {{ item.label }}
        </span>

        <span v-if="index !== breadcrumbs.length - 1" class="mx-2"> > </span>
      </li>
    </ol>
  </nav>
</template>
