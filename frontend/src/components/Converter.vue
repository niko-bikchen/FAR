<template>
  <v-container fluid class="converter">
    <v-row>
      <v-col cols="12" lg="6">
        <div
          class="text-center conv-label"
          :class="{
            roman: num_sys[0] == 'Roman',
            arabic: num_sys[0] != 'Roman'
          }"
        >
          {{ num_sys[0] }}
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
            roman: num_sys[1] != 'Arabic',
            arabic: num_sys[1] == 'Arabic'
          }"
        >
          {{ num_sys[1] }}
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
      <v-col cols="12">
        <v-btn block color="primary" @click="convertInput">Convert</v-btn>
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
  methods: {
    convertInput() {
      let sourceTxt = this.input;
      const numbers = sourceTxt.match(/\d+/gm);
      let parsedSource = "";

      numbers.forEach(number => {
        parsedSource += sourceTxt
          .slice(0, sourceTxt.indexOf(number) + number.length)
          .replace(number, `<n>${number}</n>`);

        sourceTxt = sourceTxt.slice(
          sourceTxt.slice(0, sourceTxt.indexOf(number) + number.length).length
        );
      });

      this.output = parsedSource += sourceTxt;
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
