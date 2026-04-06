<script setup>
const MENUS = ["Home", "Foods", "Ingredients", "Local Culinary"];
</script>

<template>
  <nav
    class="h-12 flex items-center px-10 justify-between border-b border-gray-200"
  >
    <h6 class="text-xl font-semibold">MealApp</h6>

    <div class="md:block hidden">
      <ul class="flex items-center gap-5">
        <li v-for="menu in MENUS" :key="menu">
          <RouterLink class="hover:underline text-sm font-normal">
            {{ menu }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
