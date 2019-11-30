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
        <v-col cols="12" v-if="requestFailed && requestCode == 40">
          <v-alert type="error" dismissible>
            An error occured while performing conversion.
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
        const conversion = {};
        let sourceTxt = this.input;
        const numbers = sourceTxt.match(/\d+/gm);

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

          conversion.system_in = this.num_sys[0];
          conversion.system_out = this.num_sys[1];
          conversion.parsed_text = parsedSource += sourceTxt;
          conversion.original_text = this.input;
          conversion.date = this.todaysDate();

          this.$store
            .dispatch("addConversion", Object.assign({}, conversion))
            .then(response => {
              this.output = response.data.conversion.text_out;
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
