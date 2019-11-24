<template>
  <v-container fluid class="home">
    <app-converter></app-converter>
  </v-container>
</template>

<script>
import Converter from "@/components/Converter.vue";

export default {
  components: {
    appConverter: Converter
  }
};
</script>
