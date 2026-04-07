<script setup>
import Loading from "./Loading.vue";
import RenderList from "./RenderList.vue";

const props = defineProps({
  data: {
    type: Array,
    default: [],
  },
  className: {
    type: String,
    default: "h-28 rounded-lg",
  },
  backgroundSize: {
    type: String,
    default: "contain",
  },
  pathKey: {
    type: String,
    default: "name",
  },
  path: {
    type: String,
    default: "food",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  queryParams: {
    type: String,
    default: null
  }
});
</script>

<template>
  <RenderList :data="data" :loading="loading">
    <template #content>
      <div
        class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5"
      >
        <RouterLink
          v-for="(food, index) in data"
          :key="index"
          :to="`/${path}/${food?.[pathKey]}${queryParams || ''}`"
        >
          <div
            class="bg p-2 overflow-hidden relative"
            :class="className"
            :style="`background-image: url(${food?.image}); background-size: ${backgroundSize};`"
          >
            <div
              class="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <h6 class="text-white font-bold text-lg text-center">
                {{ food?.name }}
              </h6>
            </div>
          </div>
        </RouterLink>
      </div>
    </template>

    <template #loading>
      <div
        class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5"
      >
        <div
          v-for="(_, index) in 15"
          :key="index"
          :class="className"
          class="overflow-hidden"
        >
          <Loading :type="'default'" />
        </div>
      </div>
    </template>
  </RenderList>
</template>

<style>
.bg {
  background-repeat: no-repeat;
  background-position: center;
}
</style>
