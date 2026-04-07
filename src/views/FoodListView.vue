<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

import api from "@/common/api";

import ItemList from "@/components/ItemList.vue";
import LayoutContent from "@/components/LayoutContent.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";

const listData = ref([]);
const route = useRoute();

const items = computed(() => {
  return [
    { label: "Home", to: "/" },
    { label: "Foods" },
    { label: route?.params?.name },
  ];
});

onMounted(() => {
  // api.get("/list.php?i=list&limit=10&page=1").then((res) => {
  //   listData.value = res.data?.meals;
  // });

  api.get(`/filter.php?i=${route?.params?.name}`).then((res) => {
    listData.value = res.data?.meals || [];
    listData.value = listData.value.map((res) => {
      return {
        ...res,
        id: res?.idMeal,
        name: res?.strMeal,
        image: res?.strMealThumb,
      };
    });
  });

  // api.get(`/lookup.php?i=52959`).then((res) => {
  //   console.log(res);
  // });
});
</script>

<template>
  <LayoutContent>
    <div class="space-y-5">
      <Breadcrumbs :breadcrumbs="items" />
      <h6 class="text-2xl">{{ route?.params?.name }} Meals</h6>
      <hr class="text-gray-200" />
      <ItemList
        :data="listData"
        :className="'h-44 rounded-xl'"
        :backgroundSize="'cover'"
        :pathKey="'id'"
        :path="'food/detail'"
      />
    </div>
  </LayoutContent>
</template>
