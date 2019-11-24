<template>
  <v-container fluid>
    <v-row v-if="signIn">
      <v-col cols="12">
        <v-form v-model="user.email.valid">
          <v-text-field
            required
            label="Email"
            :rules="inputRules.email.rules"
            v-model="user.email"
          ></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-form v-model="user.password.valid">
          <v-text-field
            required
            label="Password"
            :rules="inputRules.password.rules"
            v-model="user.password"
          ></v-text-field>
        </v-form>
      </v-col>
    </v-row>
    <app-sign-up v-else></app-sign-up>
  </v-container>
</template>

<script>
import SignUp from "@/components/SignUp.vue";

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
  },
  components: {
    appSignUp: SignUp
  }
};
</script>
