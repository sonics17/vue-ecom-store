import { createWebHistory, createRouter } from "vue-router";
import routes from "./config/routes";

export const router = createRouter({
  history: createWebHistory(),
  routes,
})