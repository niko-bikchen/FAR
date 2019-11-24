import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Authorization from "../views/Authorization.vue";
import Account from "../views/Account.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/authorization",
    name: "authorization",
    component: Authorization
  },
  {
    path: "/account",
    name: "account",
    component: Account
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
