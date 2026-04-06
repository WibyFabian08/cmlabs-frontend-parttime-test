<script setup>
import { RouterView } from "vue-router";

import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <NavBar />

  
  <div class="px-10 pt-5">
    <RouterView />
  </div>
</template>
