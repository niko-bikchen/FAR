<template>
  <v-container fluid>
    <v-row
      v-if="
        !requestActive &&
          !requestFailed &&
          userConversions &&
          userConversions.length > 0
      "
    >
      <v-col
        cols="12"
        v-for="(conversion, index) in userConversions"
        :key="index"
      >
        <app-conversion :conversion_data="conversion"></app-conversion>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-slide-x-transition>
        <v-col cols="12" v-if="requestActive">
          <v-alert type="info">
            Fetching your conversions from the server. Please wait.
            <div class="text-right mt-2">
              <v-progress-circular
                indeterminate
                color="white"
              ></v-progress-circular>
            </div>
          </v-alert>
        </v-col>
      </v-slide-x-transition>
      <v-slide-x-transition>
        <v-col
          cols="12"
          v-if="requestFailed && !requestActive && requestCode == 10"
        >
          <v-alert type="error">
            Failed to fetch your conversions from the server.
          </v-alert>
        </v-col>
      </v-slide-x-transition>
      <v-slide-x-transition>
        <v-col
          cols="12"
          v-if="
            requestCode == 10 &&
              !requestFailed &&
              !requestActive &&
              (!userConversions || userConversions.length == 0)
          "
        >
          <v-alert type="info">
            You don't have any conversions at the moment.
          </v-alert>
        </v-col>
      </v-slide-x-transition>
    </v-row>
  </v-container>
</template>

<script>
import Conversion from "@/components/Conversion.vue";

export default {
  components: {
    appConversion: Conversion
  },
  computed: {
    userConversions() {
      return this.$store.getters.getConversions;
    },
    requestActive() {
      return this.$store.getters.getRequestDetails.active;
    },
    requestFailed() {
      return this.$store.getters.getRequestDetails.failed;
    },
    requestCode() {
      return this.$store.getters.getRequestDetails.code;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.getters.getLoginStatus) {
        vm.$store.dispatch("fetchConversions");
      } else {
        vm.$router.push({ path: "/authorization" });
      }
    });
  }
};
</script>
