<script setup>
import { onMounted, ref } from "vue";
import api from "@/common/api";

import LayoutContent from "@/components/LayoutContent.vue";
import ItemList from "@/components/ItemList.vue";
import Hero from "@/components/Hero.vue";

const listData = ref([]);
const loading = ref(false)

onMounted(() => {
  loading.value = true
  api.get("/list.php?i=list&limit=10&page=1").then((res) => {
    listData.value = res.data?.meals || []
    listData.value = listData.value.map((res) => {
      return {
        ...res,
        id: res?.idIngredient,
        name: res?.strIngredient,
        image: res?.strThumb
      }
    })
  }).catch((err) => {

  }).finally(() => {
    loading.value = false
  })

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
    <Hero />

    <LayoutContent>
      <ItemList :data="listData" :loading="loading"/>
    </LayoutContent>
  </div>
</template>
