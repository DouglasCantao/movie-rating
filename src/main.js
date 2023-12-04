import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "../style.css";
import Home from "@/views/HomeView.vue";

const routes = [
  { path: "/", name: "home", component: Home },

  {
    path: "/movie/:id",
    name: "movie.show",
    component: () => import("@/views/MovieShow.vue")
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  // linkActiveClass: "cool-active-link", // option used to change the default active class name
});
  
createApp(App).use(router).mount("#app");
