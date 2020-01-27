import Vue from "vue";
import Router from "vue-router";

import home from "./pages/Home/Home";
import recipe from "./pages/Recipe/Recipe";
import add from "./pages/Add/Add";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/home",
      name: "home",
      component: home
    },
    {
      path: "/recipe/:id",
      name: "recipe",
      component: recipe
    },
    {
      path: "/add",
      name: "add",
      component: add
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: add
    },
    {
      path: "*",
      component: home
    }
  ]
});

export default router;
