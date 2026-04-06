<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const listData = ref([]);

onMounted(() => {
  axios
    .get(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list&limit=10&page=1",
    )
    .then((res) => {
      console.log(res.data);

      listData.value = res.data?.meals;
    });

  axios
    .get("https://www.themealdb.com/api/json/v1/1/filter.php?i=Salmon")
    .then((res) => {
      console.log(res);
    });

  axios
    .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52959`)
    .then((res) => {
      console.log(res);
    });
});
</script>

<template>
  <div v-for="(data, index) in listData" :key="index">
    {{ data?.strIngredient }}
  </div>
</template>
