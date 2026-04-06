<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <div
    class="lg:px-44 md:px-28 sm:px-14 px-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5"
  >
    <RouterLink
      v-for="(food, index) in data"
      :key="index"
      :to="`/food/${food?.strIngredient}`"
    >
      <div
        class="bg p-2 rounded-lg h-28 overflow-hidden relative"
        :style="`background-image: url(${food?.strThumb})`"
      >
        <div
          class="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <h6 class="text-white font-bold text-lg">
            {{ food?.strIngredient }}
          </h6>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style>
.bg {
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
