<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6" offset-lg="3">
        <v-card elevation="10" class="form">
          <v-card-text>
            <v-container fluid>
              <v-row v-if="signIn" no-gutters>
                <v-col cols="12" class="mb-6">
                  <span class="headline text--primary">Welcome Back !</span>
                </v-col>
                <v-col cols="12">
                  <v-form v-model="inputRules.email.valid">
                    <v-text-field
                      outlined
                      required
                      label="Email"
                      type="email"
                      :rules="inputRules.email.rules"
                      v-model="user.email"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <v-col cols="12">
                  <v-form v-model="inputRules.password.valid">
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
                      <v-col cols="6">
                        <v-btn block color="primary" outlined to="/">
                          Back
                        </v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn
                          block
                          color="primary"
                          :disabled="
                            !inputRules.password.valid ||
                              !inputRules.email.valid
                          "
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
      signIn: true,
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
  }
};
</script>

<style lang="scss">
.form {
  border: 1px solid #1976d2 !important;
}
</style>
