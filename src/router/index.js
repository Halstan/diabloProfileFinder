import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routerOptions = [
  { path: "/", name: "home" },
  { path: "/region/:region/profile/:battleTag", name: "profile" },
  { path: "/region/:region/profile/:battleTag/hero/:heroId", name: "hero" },
  { path: "/about", name: "about" },
  { path: "/error", name: "error" },
  { path: "*", redirect: { name: "home" } }
];

const routes = routerOptions.map(r => {
  return {
    ...r,
    component: () =>
      import(/* webpackChunkName: "[request]" */ `@/views/${r.name}/Index.vue`)
  };
});

const router = new Router({
  routes
});

export default router;
