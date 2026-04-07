<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";

import api from "@/common/api";

import ItemList from "@/components/ItemList.vue";
import LayoutContent from "@/components/LayoutContent.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import InputText from "@/components/InputText.vue";

const listData = ref([]);
const loading = ref(false);
const search = ref("");
const route = useRoute();

const items = computed(() => {
  return [
    { label: "Home", to: "/" },
    { label: "Foods" },
    { label: route?.params?.name },
  ];
});

const filteredList = computed(() => {
  if (!search.value) return listData.value;

  return listData.value.filter((item) =>
    item.name?.toLowerCase().includes(search.value.toLowerCase()),
  );
});

onMounted(() => {
  loading.value = true;
  api
    .get(`/filter.php?i=${route?.params?.name}`)
    .then((res) => {
      listData.value = res.data?.meals || [];
      listData.value = listData.value.map((res) => {
        return {
          ...res,
          id: res?.idMeal,
          name: res?.strMeal,
          image: res?.strMealThumb,
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
  <LayoutContent>
    <div class="space-y-5">
      <div class="flex items-center justify-between">
        <Breadcrumbs :breadcrumbs="items" />
        <InputText
          v-model:modelValue="search"
          :placeholder="'Cari disini...'"
        />
      </div>
      <h6 class="text-2xl">{{ route?.params?.name }} Meals</h6>
      <hr class="text-gray-200" />
      <ItemList
        :data="filteredList"
        :className="'h-44 rounded-xl'"
        :backgroundSize="'cover'"
        :pathKey="'id'"
        :path="'food/detail'"
        :loading="loading"
      />
    </div>
  </LayoutContent>
</template>
