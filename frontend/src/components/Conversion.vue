<template>
  <v-card class="conversion">
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
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      open: [0]
    };
  },
  props: {
    conversion_data: {
      type: Object,
      requied: true
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
