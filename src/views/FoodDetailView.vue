<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import api from "@/common/api";

import ItemList from "@/components/ItemList.vue";
import LayoutContent from "@/components/LayoutContent.vue";

const detailData = ref({});
const route = useRoute();

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
  // api.get("/list.php?i=list&limit=10&page=1").then((res) => {
  //   listData.value = res.data?.meals;
  // });

  // api.get(`/filter.php?i=${route?.params?.name}`).then((res) => {
  //   listData.value = res.data?.meals || [];
  //   listData.value = listData.value.map((res) => {
  //     return {
  //       ...res,
  //       id: res?.idMeal,
  //       name: res?.strMeal,
  //       image: res?.strMealThumb,
  //     };
  //   });
  // });

  api.get(`/lookup.php?i=52959`).then((res) => {
    const mealData = res?.data?.meals || [];

    if (mealData?.length > 0) {
      detailData.value = mealData[0];
    }
  });
});
</script>

<template>
  <LayoutContent>
    <div class="space-y-5">
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
    </div>
  </LayoutContent>
</template>
