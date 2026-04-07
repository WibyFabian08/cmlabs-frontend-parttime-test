import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/food/:name',
      name: 'food',
      component: () => import('../views/FoodListView.vue'),
    },
    {
      path: '/food/detail/:id',
      name: 'food-detail',
      component: () => import('../views/FoodDetailView.vue'),
    },
  ],
})

export default router
