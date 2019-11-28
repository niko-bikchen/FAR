<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6" offset-lg="3">
        <v-card elevation="10" class="form" :loading="requestActive">
          <v-card-text>
            <v-container fluid>
              <v-row no-gutters>
                <v-col cols="12" class="mb-6">
                  <span class="headline text--primary">Nice to meet you !</span>
                </v-col>
                <v-col cols="6">
                  <v-form
                    v-model="inputRules.user_name.firstIsValid"
                    v-on:submit.prevent
                  >
                    <v-text-field
                      outlined
                      required
                      label="First name"
                      :success="inputRules.user_name.firstIsValid"
                      type="text"
                      autofocus
                      :rules="inputRules.user_name.rules"
                      v-model="user.name_first"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <v-col cols="6">
                  <v-form
                    v-model="inputRules.user_name.lastIsValid"
                    v-on:submit.prevent
                  >
                    <v-text-field
                      outlined
                      required
                      label="Last name"
                      type="text"
                      :success="inputRules.user_name.lastIsValid"
                      :rules="inputRules.user_name.rules"
                      v-model="user.name_last"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <v-col cols="12">
                  <v-form v-model="inputRules.email.valid" v-on:submit.prevent>
                    <v-text-field
                      outlined
                      required
                      label="Email"
                      :success="inputRules.email.valid"
                      :rules="inputRules.email.rules"
                      type="email"
                      v-model="user.email"
                    ></v-text-field>
                  </v-form>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    required
                    label="Password"
                    type="password"
                    :error="!passwordIsValid"
                    :success="passwordIsValid"
                    v-model="user.password"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="passwordLength"
                    :success="passwordLength"
                    :error="!passwordLength"
                    label="Password must be at least 10 characters long"
                    readonly
                  ></v-checkbox>
                  <v-checkbox
                    v-model="passwordNumbers"
                    :success="passwordNumbers"
                    :error="!passwordNumbers"
                    label="Password must contain at least 3 numbers"
                    readonly
                  ></v-checkbox>
                  <v-checkbox
                    v-model="passwordLetters"
                    :success="passwordLetters"
                    :error="!passwordLetters"
                    label="Password must be at least 3 capital letters"
                    readonly
                  ></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-container fluid>
                    <v-row>
                      <v-slide-x-transition>
                        <v-col
                          cols="12"
                          v-if="requestFinishedNeg && requestCode == 30"
                        >
                          <v-alert type="error" dismissible>{{
                            requestDescription
                          }}</v-alert>
                        </v-col>
                      </v-slide-x-transition>
                      <v-slide-x-transition>
                        <v-col
                          cols="12"
                          v-if="requestFailed && requestCode == 30"
                        >
                          <v-alert type="error" dismissible>{{
                            requestDescription
                          }}</v-alert>
                        </v-col>
                      </v-slide-x-transition>
                      <v-col cols="6">
                        <v-btn
                          block
                          color="primary"
                          outlined
                          to="/authorization"
                        >
                          Back
                        </v-btn>
                      </v-col>
                      <v-col cols="6">
                        <v-btn
                          block
                          color="primary"
                          @click="signUp"
                          :loading="requestActive"
                          :disabled="formInvalid || requestActive"
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
        name_first: "",
        name_last: "",
        email: "",
        password: ""
      },
      inputRules: {
        email: {
          valid: true,
          rules: [v => (v && /^.+@.+\..+$/.test(v)) || "Invalid email"]
        },
        password: {
          valid:
            this.passwordLength && this.passwordNumbers && this.passwordLetters,
          new_rules: [
            v => v && v.length >= 10,
            v => v && v.match(/\d/g) !== null && v.match(/\d/g).length >= 3,
            v =>
              v && v.match(/[A-Z]/g) !== null && v.match(/[A-Z]/g).length >= 3
          ]
        },
        user_name: {
          firstIsValid: true,
          lastIsValid: true,
          rules: [
            v => (v && v.length > 0) || "Name cannot be empty",
            v => /^[a-zA-Z]+$/g.test(v) || "Name can contain letters only"
          ]
        }
      }
    };
  },
  computed: {
    passwordLength() {
      return this.inputRules.password.new_rules[0](this.user.password) === true;
    },
    passwordNumbers() {
      return this.inputRules.password.new_rules[1](this.user.password) === true;
    },
    passwordLetters() {
      return this.inputRules.password.new_rules[2](this.user.password) === true;
    },
    passwordIsValid() {
      return (
        this.passwordLength && this.passwordNumbers && this.passwordLetters
      );
    },
    formInvalid() {
      return (
        !this.inputRules.email.valid ||
        !this.inputRules.user_name.firstIsValid ||
        !this.inputRules.user_name.lastIsValid ||
        !this.passwordIsValid
      );
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
    signUp() {
      this.$store
        .dispatch("signUp", {
          email: this.user.email,
          password: this.user.password,
          name: `${this.user.name_first} ${this.user.name_last}`
        })
        .then(
          request => {
            if (request.finished.pos) {
              this.$router.push({ path: "/" });
            }
          },
          error => {
            console.error(error);
          }
        );
    }
  }
};
</script>

<style lang="scss">
.form {
  border: 1px solid #1976d2 !important;
}
</style>
