import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Authorization from "../views/Authorization.vue";
import Registration from "../views/Registration.vue";
import Conversions from "../views/Conversions.vue";

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
    path: "/registration",
    name: "registration",
    component: Registration
  },
  {
    path: "/conversions",
    name: "conversions",
    component: Conversions
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
