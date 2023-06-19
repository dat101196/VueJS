import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./pages/home-page.vue";
const routes = [
  {
    path: "/",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
