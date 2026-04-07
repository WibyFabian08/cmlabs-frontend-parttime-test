<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import api from "@/common/api";

import Breadcrumbs from "@/components/Breadcrumbs.vue";
import LayoutContent from "@/components/LayoutContent.vue";
import Loading from "@/components/Loading.vue";
import RenderList from "@/components/RenderList.vue";

const detailData = ref({});
const loading = ref(false);

const route = useRoute();
const router = useRouter();

const items = computed(() => {
  return [
    { label: "Home", to: "/" },
    { label: "Foods", isBack: true },
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

async function getData() {
  try {
    loading.value = true;
    const response = await api.get(`/lookup.php?i=${route?.params?.id}`);

    const mealData = response?.data?.meals || [];

    if (mealData?.length > 0) {
      detailData.value = mealData[0];
    }
  } catch (error) {
    detailData.value = {};
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getData();
});
</script>

<template>
  <LayoutContent>
    <div class="mb-5" v-if="Object.keys(detailData)?.length === 0 && !loading">
      <button class="text-black cursor-pointer" @click="router.back()">
        < Kembali
      </button>
    </div>
    <RenderList :data="detailData" :loading="loading" :dataType="'object'">
      <template #content>
        <div class="space-y-5">
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
        </div>
      </template>
      <template #loading>
        <Loading :type="'spinner'" />
      </template>
    </RenderList>
  </LayoutContent>
</template>
