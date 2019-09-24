<template>
  <div class="home-body">
    <div class="row">
      <app-converter></app-converter>
    </div>
  </div>
</template>

<script>
import Converter from "../components/Converter.vue";

export default {
  components: {
    appConverter: Converter
  }
};
</script>

<style lang="scss">
.home-body {
  height: 100%;

  .row {
    height: calc(100% - 56px);
  }
}
</style>