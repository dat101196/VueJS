import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/home-page";
import Transaction from "./pages/transaction-page";
import TransactionDetail from "./pages/transaction-detail-page";
import NotFoundPage from "./pages/not-found-page";
const routes = [
  {
    path: "/",
    name: "overview-route",
    component: Home,
  },
  {
    path: "/transaction",
    name: "transaction-route",
    component: Transaction,
  },
  {
    path: "/transaction/:id",
    name: "transaction-detail-route",
    component: TransactionDetail,
  },
  {
    path: "/ts",
    // redirect: "/transaction",
    redirect: { name: "transaction-route" },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
