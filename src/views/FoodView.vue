<script setup>
import { onMounted, ref } from "vue";
import api from "@/common/api";

import Ingredients from "@/components/Ingredients.vue";

const listData = ref([]);

onMounted(() => {
  api.get("/list.php?i=list&limit=10&page=1").then((res) => {
    listData.value = res.data?.meals;
  });

  // api.get("/filter.php?i=Salmon").then((res) => {
  //   console.log(res);
  // });

  // api.get(`/lookup.php?i=52959`).then((res) => {
  //   console.log(res);
  // });
});
</script>

<template>
  <div class="space-y-10">
    <Ingredients :data="listData" />
  </div>
</template>
