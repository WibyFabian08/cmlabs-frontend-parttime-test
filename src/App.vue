<script setup>
import { RouterView } from "vue-router";

import NavBar from "@/components/NavBar.vue";
import Hero from "@/components/Hero.vue";
</script>

<template>
  <NavBar />

  <div class="pt-5">
    <RouterView />
  </div>
</template>
