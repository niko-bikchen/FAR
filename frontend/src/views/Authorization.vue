<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6" offset-lg="3">
        <v-card elevation="10" class="form" :loading="requestActive">
          <v-card-text>
            <v-container fluid>
              <v-row v-if="signIn" no-gutters>
                <v-col cols="12" class="mb-6">
                  <span class="headline text--primary">Welcome Back !</span>
                </v-col>
                <v-col cols="12">
                  <v-form v-model="inputRules.email.valid" v-on:submit.prevent>
                    <v-text-field
                      outlined
                      required
                      autofocus
                      label="Email"
                      type="email"
                      :rules="inputRules.email.rules"
                      v-model="user.email"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <v-col cols="12">
                  <v-form
                    v-model="inputRules.password.valid"
                    v-on:submit.prevent
                  >
                    <v-text-field
                      outlined
                      required
                      label="Password"
                      type="password"
                      :rules="inputRules.password.rules"
                      v-model="user.password"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <v-col cols="12">
                  <span>First time here?</span>
                  <v-btn text small color="primary" to="/registration"
                    >Sign Up</v-btn
                  >
                </v-col>
                <v-col cols="12">
                  <v-container fluid>
                    <v-row>
                      <v-slide-x-transition>
                        <v-col
                          cols="12"
                          v-if="requestFinishedNeg && requestCode == 20"
                        >
                          <v-alert type="error" dismissible>{{
                            requestDescription
                          }}</v-alert>
                        </v-col>
                      </v-slide-x-transition>
                      <v-slide-x-transition>
                        <v-col
                          cols="12"
                          v-if="requestFailed && requestCode == 20"
                        >
                          <v-alert type="error" dismissible>{{
                            requestDescription
                          }}</v-alert>
                        </v-col>
                      </v-slide-x-transition>
                      <v-col lg="6" md="12">
                        <v-btn block color="primary" outlined to="/">
                          Main Page
                        </v-btn>
                      </v-col>
                      <v-col lg="6" md="12">
                        <v-btn
                          block
                          color="primary"
                          @click="signIn"
                          :loading="requestActive"
                          :disabled="inputInvalid || requestActive"
                        >
                          Confirm
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      inputRules: {
        email: {
          valid: true,
          rules: [v => (v && /^.+@.+\..+$/.test(v)) || "Invalid email"]
        },
        password: {
          valid: true,
          rules: [v => (v && v.length > 0) || "Enter you password"],
          new_rules: [
            v =>
              (v && v.length >= 10) ||
              "Password must be at least 10 characters long",
            v =>
              (v && v.match(/\d/g) !== null && v.match(/\d/g).length >= 3) ||
              "Password must contain at least 3 numbers",
            v =>
              (v &&
                v.match(/[A-Z]/g) !== null &&
                v.match(/[A-Z]/g).length >= 3) ||
              "Password must contain at least 3 capital letters"
          ]
        }
      }
    };
  },
  computed: {
    inputInvalid() {
      return !this.inputRules.password.valid || !this.inputRules.email.valid;
    },
    requestActive() {
      return this.$store.getters.getRequestDetails.active;
    },
    requestFinishedNeg() {
      if (this.$store.getters.getRequestDetails.finished) {
        return this.$store.getters.getRequestDetails.finished.neg;
      }
      return false;
    },
    requestFailed() {
      return this.$store.getters.getRequestDetails.failed;
    },
    requestDescription() {
      return this.$store.getters.getRequestDetails.description;
    },
    requestCode() {
      return this.$store.getters.getRequestDetails.code;
    }
  },
  methods: {
    signIn() {
      this.$store
        .dispatch("signIn", {
          email: this.user.email,
          password: this.user.password
        })
        .then(request => {
          if (request.finished.pos) {
            this.$router.push({ path: "/" });

            this.refreshToken();
          }
        });
    },
    refreshToken() {
      setTimeout(() => {
        this.$store.dispatch("refreshToken");
        this.refreshToken();
      }, 80000000);
    }
  }
};
</script>

<style lang="scss">
.form {
  border: 1px solid #1976d2 !important;
}
</style>
