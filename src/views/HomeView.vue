<script setup>
import { onMounted, ref, computed } from "vue";

import api from "@/common/api";

import LayoutContent from "@/components/LayoutContent.vue";
import ItemList from "@/components/ItemList.vue";
import Hero from "@/components/Hero.vue";
import InputText from "@/components/InputText.vue";

const listData = ref([]);
const loading = ref(false);
const search = ref("");

const filteredList = computed(() => {
  if (!search.value) return listData.value;

  return listData.value.filter((item) =>
    item.name?.toLowerCase().includes(search.value.toLowerCase()),
  );
});

onMounted(() => {
  loading.value = true;
  api
    .get("/list.php?i=list&limit=10&page=1")
    .then((res) => {
      listData.value = res.data?.meals || [];
      listData.value = listData.value.map((res) => {
        return {
          ...res,
          id: res?.idIngredient,
          name: res?.strIngredient,
          image: res?.strThumb,
        };
      });
    })
    .catch((err) => {})
    .finally(() => {
      loading.value = false;
    });
});
</script>

<template>
  <div>
    <Hero />

    <LayoutContent>
      <div class="space-y-5">
        <div class="flex justify-end">
          <InputText
            v-model:modelValue="search"
            :placeholder="'Cari disini...'"
          />
        </div>
        <ItemList :data="filteredList" :loading="loading" />
      </div>
    </LayoutContent>
  </div>
</template>
