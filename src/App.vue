<script setup>
import { RouterView } from "vue-router";

import NavBar from "@/components/NavBar.vue";
import Hero from "@/components/Hero.vue";
</script>

<template>
  <NavBar />
  <Hero/>

  <div class="px-10 pt-5">
    <RouterView />
  </div>
</template>
