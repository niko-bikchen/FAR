<template>
  <v-app>
    <v-app-bar app flat class="header flow-r">
      <v-toolbar-title class="title"
        >FAR | From Arabic to Roman numbers converter</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn to="/authorization">
        Sign In
      </v-btn>
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
}
</style>
