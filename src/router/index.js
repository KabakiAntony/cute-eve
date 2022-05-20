import { createRouter, createWebHashHistory } from "vue-router";
import Index from "../views/Index.vue";
// import store from "../store"

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    props: true,
  },
  {
    path: "/update",
    name: "Update",
    component: () => import("../views/Update.vue"),
    props: (route) => ({ query: route.query.tkn }),
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: () => import("../views/Forgot.vue"),
    props: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/activate",
    name: "Activate",
    component: () => import("../views/Activate.vue"),
    props: (route) => ({ query: route.query.tkn }),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!store.getters.IsLoggedIn) {
//       next({ name: "Index" });
//     }
//    else {
//      next()
//     }
//   }
//   else{
//     next()
//   } 
// })

export default router