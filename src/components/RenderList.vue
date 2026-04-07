<script setup>
import { computed } from "vue";
import EmptyData from "./EmptyData.vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array,
    default: [],
  },
  dataType: {
    type: String,
    default: "array",
  },
});

const showContent = computed(() => {
  switch (props.dataType) {
    case "array":
      return props.data && props.data?.length > 0;

    case "object":
      return props.data && Object.keys(props.data)?.length > 0;

    default:
      return props.data && data?.length > 0;
  }
});
</script>

<template>
  <template v-if="loading">
    <slot name="loading"></slot>
  </template>
  <template v-else>
    <template v-if="showContent">
      <slot name="content" />
    </template>
    <template v-else>
      <EmptyData />
    </template>
  </template>
</template>
