<template>
  <v-card class="conversion" v-if="conversion_data">
    <v-card-title>
      {{ conversion_data.system_in }}
      <v-icon>mdi-arrow-right</v-icon>
      {{ conversion_data.system_out }}
    </v-card-title>
    <v-card-subtitle> Date: {{ conversion_data.date }} </v-card-subtitle>
    <v-card-text>
      <v-expansion-panels accordion multiple v-model="open">
        <v-expansion-panel class="panel-top">
          <v-expansion-panel-header class="primary--text font-weight-bold"
            >Input</v-expansion-panel-header
          >
          <v-expansion-panel-content class="subtitle-1">
            {{ conversion_data.text_in }}
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="panel-bottom">
          <v-expansion-panel-header class="primary--text font-weight-bold"
            >Output</v-expansion-panel-header
          >
          <v-expansion-panel-content class="subtitle-1">
            {{ conversion_data.text_out }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" class="mr-2" @click="deleteConversion">
        Delete
      </v-btn>
    </v-card-actions>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
      <v-btn color="blue" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      timeout: 2000,
      text: "",
      open: [0]
    };
  },
  props: {
    conversion_data: {
      type: Object,
      requied: true
    }
  },
  methods: {
    deleteConversion() {
      this.$store
        .dispatch("removeConversion", this.conversion_data.id)
        .then(response => {
          this.snackbar = true;
          this.text = response.details;
        });
    }
  }
};
</script>

<style lang="scss">
.conversion {
  border: 1px solid #1976d2 !important;
}

.panel-top {
  border-top: 1px solid #1976d2 !important;
  border-left: 1px solid #1976d2 !important;
  border-right: 1px solid #1976d2 !important;
  border-bottom: 1px solid #1976d2 !important;
}

.panel-bottom {
  border-bottom: 1px solid #1976d2 !important;
  border-left: 1px solid #1976d2 !important;
  border-right: 1px solid #1976d2 !important;
}
</style>
