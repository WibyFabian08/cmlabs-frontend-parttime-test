<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

import api from "@/common/api";

import Breadcrumbs from "@/components/Breadcrumbs.vue";
import LayoutContent from "@/components/LayoutContent.vue";
import Loading from "@/components/Loading.vue";

const detailData = ref({});
const loading = ref(false);

const route = useRoute();

const items = computed(() => {
  return [
    { label: "Home", to: "/" },
    { label: "Foods", to: `/food/${detailData?.value?.strCategory}` },
    { label: detailData?.value?.strCategory },
    { label: detailData?.value?.strMeal },
  ];
});

function getIngredientsWithMeasure(meal) {
  const results = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      results.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || "",
      });
    }
  }

  return results;
}

function getYoutubeEmbedUrl(url) {
  if (!url) return "";

  const videoId = url.split("v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
}

onMounted(() => {
  loading.value = true;
  api
    .get(`/lookup.php?i=${route?.params?.id}`)
    .then((res) => {
      const mealData = res?.data?.meals || [];

      if (mealData?.length > 0) {
        detailData.value = mealData[0];
      }
    })
    .catch((err) => {})
    .finally(() => {
      loading.value = false;
    });
});
</script>

<template>
  <LayoutContent>
    <div class="space-y-5">
      <div v-if="loading" class="flex items-center justify-center h-96">
        <Loading :type="'spinner'" />
      </div>
      <template v-else>
        <Breadcrumbs :breadcrumbs="items" />
        <h6 class="text-3xl">{{ detailData?.strMeal }}</h6>
        <hr class="text-gray-200" />
        <p class="text-sm text-red-500">{{ detailData?.strArea }}</p>
        <div class="grid grid-cols-2 gap-5">
          <div>
            <img
              :src="detailData?.strMealThumb"
              :alt="detailData?.strMeal"
              class="rounded-xl object-contain w-full"
            />
          </div>

          <div class="space-y-2">
            <h6 class="text-2xl">Instructions</h6>
            <p
              class="text-sm text-gray-600"
              v-html="detailData?.strInstructions"
            ></p>

            <h6 class="text-2xl">Recipes</h6>
            <ul>
              <li
                class="text-sm text-gray-600 list-disc ms-5"
                v-for="(data, index) in getIngredientsWithMeasure(detailData)"
                :key="index"
              >
                {{ data?.ingredient }} {{ data?.measure }}
              </li>
            </ul>
          </div>
        </div>

        <div class="space-y-5">
          <h6 class="text-2xl text-center">Tutorials</h6>
          <iframe
            class="w-full h-[80vh] rounded-xl"
            :src="getYoutubeEmbedUrl(detailData?.strYoutube)"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </template>
    </div>
  </LayoutContent>
</template>
