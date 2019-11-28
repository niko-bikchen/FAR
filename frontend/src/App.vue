<template>
  <v-app>
    <v-app-bar app flat class="header flow-r">
      <v-toolbar-title class="title">
        <router-link to="/" tag="span">
          FAR | From Arabic to Roman numbers converter</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/authorization" v-if="!isSigned">
        Sign In
      </v-btn>
      <v-menu
        v-else
        transition="slide-y-transition"
        offset-y
        open-on-hover
        close-on-content-click
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">{{ userData.name }}</v-btn>
        </template>
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item to="/">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Main Page
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/conversions">
              <v-list-item-icon>
                <v-icon>mdi-swap-horizontal</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Your conversions
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="signOut">
              <v-list-item-icon>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  Sign Out
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <v-container fluid class="main">
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>

    <v-footer app class="footer flow-r">
      <div>
        &copy; FAR 2019
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  computed: {
    isSigned() {
      return this.$store.getters.getLoginStatus;
    },
    userData() {
      return this.$store.getters.getUserData;
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
      this.$router.push({ path: "/authorization" });
    }
  }
};
</script>

<style lang="scss">
.header,
.footer {
  color: white !important;
}

.footer > div {
  width: 100%;
  text-align: center;
}

.flow-r {
  background: linear-gradient(
    90deg,
    rgb(15, 139, 255) 0%,
    rgba(0, 57, 108, 1) 100%
  );
  background-size: 400% 400%;

  animation: flow 10s ease infinite;
}

@keyframes flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.title {
  font-family: "Comfortaa", cursive;
  cursor: pointer;
}
</style>
