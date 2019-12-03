<template>
  <v-container fluid class="converter">
    <v-row>
      <v-col cols="12" lg="6">
        <div
          class="text-center conv-label"
          :class="{
            roman: num_sys[0] === 'Roman',
            arabic: num_sys[0] !== 'Roman'
          }"
        >
          {{ num_sys[0] }} numbers
        </div>
        <v-textarea
          clearable
          clear-icon="mdi-close"
          auto-grow
          outlined
          autofocus
          rows="5"
          row-height="50"
          v-model="input"
          @click:clear="output = ''"
        ></v-textarea
      ></v-col>
      <v-col cols="12" lg="6">
        <div
          class="text-center conv-label"
          :class="{
            roman: num_sys[1] !== 'Arabic',
            arabic: num_sys[1] === 'Arabic'
          }"
        >
          {{ num_sys[1] }} numbers
        </div>
        <v-textarea
          auto-grow
          outlined
          rows="5"
          row-height="50"
          readonly
          v-model="output"
        ></v-textarea
      ></v-col>
    </v-row>
    <v-row>
      <v-slide-x-transition>
        <v-col
          cols="12"
          v-if="requestFailed && (requestCode == 40 || requestCode == 100)"
        >
          <v-alert type="error" dismissible>
            An error occured while performing conversion.
          </v-alert>
        </v-col>
      </v-slide-x-transition>
      <v-slide-x-transition>
        <v-col cols="12" v-if="requestStatus.finished.neg && requestCode == 40">
          <v-alert type="error" dismissible>
            {{ requestStatus.descripton }}
          </v-alert>
        </v-col>
      </v-slide-x-transition>
      <v-slide-x-transition>
        <v-col
          cols="12"
          v-if="requestStatus.finished.neg && requestCode == 100"
        >
          <v-alert type="error" dismissible>
            {{ requestStatus.descripton }}
          </v-alert>
        </v-col>
      </v-slide-x-transition>
      <v-col cols="12">
        <v-btn
          block
          color="primary"
          :loading="requestActive"
          @click="convertInput"
          >Convert</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-btn block color="primary" outlined @click="num_sys.reverse()"
          >Switch</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      num_sys: ["Arabic", "Roman"],
      input: "",
      output: ""
    };
  },
  computed: {
    requestActive() {
      return this.$store.getters.getRequestDetails.active;
    },
    requestFailed() {
      return this.$store.getters.getRequestDetails.failed;
    },
    requestCode() {
      return this.$store.getters.getRequestDetails.code;
    },
    requestStatus() {
      return this.$store.getters.getRequestDetails;
    }
  },
  methods: {
    todaysDate() {
      const today = new Date();

      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();

      return `${dd}.${mm}.${yyyy}`;
    },
    convertInput() {
      if (this.input) {
        let sourceTxt = this.input;
        const numbers =
          this.num_sys[0] === "Arabic"
            ? sourceTxt.match(/\d+/gm)
            : sourceTxt.match(
                /(?=[MDCLXVI])M*(C[MD]|D?C*)(X[CL]|L?X*)(I[XV]|V?I*)/gm
              );

        if (numbers) {
          let parsedSource = "";

          numbers.forEach(number => {
            parsedSource += sourceTxt
              .slice(0, sourceTxt.indexOf(number) + number.length)
              .replace(number, `<n>${number}</n>`);

            sourceTxt = sourceTxt.slice(
              sourceTxt.slice(0, sourceTxt.indexOf(number) + number.length)
                .length
            );
          });

          let processed_input = (parsedSource += sourceTxt);

          const system_in = this.num_sys[0];
          const system_out = this.num_sys[1];
          const original_text = this.input;
          const date = this.todaysDate();

          this.$store
            .dispatch("convertFrom", {
              numbers,
              source: this.num_sys[0] === "Arabic" ? "arab" : "rome"
            })
            .then(response => {
              const parsed_numbers = response;

              for (let i = 0; i < parsed_numbers.length; i += 1) {
                processed_input = processed_input.replace(
                  `<n>${numbers[i]}</n>`,
                  parsed_numbers[i]
                );
              }

              this.output = processed_input;

              if (this.$store.getters.getLoginStatus) {
                console.log("LOL");
                this.$store.dispatch("addConversion", {
                  date,
                  system_in,
                  system_out,
                  text_in: original_text,
                  text_out: processed_input,
                  email: this.$store.getters.getUserData.email
                });
              }
            });
        } else {
          this.output = "Your input doesn't contain any numbers.";
        }
      }
    }
  }
};
</script>

<style lang="scss">
.conv-label {
  font-size: 1.7rem;
  font-weight: 300;
  color: rgba(0, 57, 108, 1);
}

.roman {
  font-family: "Lora", serif;
}

.arabic {
  font-family: "Marck Script", cursive;
}
</style>
1
