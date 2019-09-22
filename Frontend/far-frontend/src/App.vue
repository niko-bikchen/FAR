<template>
  <div class="container-fluid">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  }
};
</script>