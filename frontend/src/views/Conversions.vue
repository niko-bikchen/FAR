<template>
  <v-container fluid>
    <v-row v-if="conversionsRetrieved">
      <v-col cols="12">
        <v-expansion-panels :class="{ active_shadow: filter_active }">
          <v-expansion-panel>
            <v-expansion-panel-header
              class="font-weight-bold primary--text"
              :class="{ filter_plain: !filter_active, filter_active }"
            >
              FILTERS
              <span class="green--text pl-1">
                {{ filter_active ? "ACTIVE" : "" }}
              </span>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              :class="{
                filter_content: !filter_active,
                filter_active_content: filter_active
              }"
            >
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="6">
                        <v-select
                          v-model="system_in"
                          outlined
                          hint="Number system In"
                          persistent-hint
                          :items="system"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="6"
                        ><v-select
                          v-model="system_out"
                          outlined
                          hint="Number system Out"
                          persistent-hint
                          :items="system"
                        >
                        </v-select
                      ></v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="8" offset="2">
                        <v-menu
                          ref="datepicker"
                          v-model="datepicker"
                          :close-on-content-click="false"
                          :return-value.sync="dates"
                          transition="slide-y-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="datesFormated"
                              label="Pick a single date or a range"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            no-title
                            range
                            color="primary"
                            v-model="dates"
                            :max="today"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="datepicker = false"
                              >Cancel</v-btn
                            >
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.datepicker.save(dates)"
                              >OK</v-btn
                            >
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" class="text-right">
                    <v-btn
                      color="primary"
                      large
                      class="mr-2"
                      @click="applyFilter"
                    >
                      APPLY
                    </v-btn>
                    <v-btn
                      color="primary"
                      large
                      outlined
                      @click="filter_active = false"
                    >
                      RESET
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" v-for="(conversion, index) in conversions" :key="index">
        <app-conversion :conversion_data="conversion"></app-conversion>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-slide-x-transition>
        <v-col cols="12" v-if="requestActive && requestCode == 10">
          <v-alert type="info">
            Fetching your conversions from the server. Please wait.
            <div class="text-right mt-2">
              <v-progress-circular
                indeterminate
                color="white"
              ></v-progress-circular>
            </div>
          </v-alert>
        </v-col>
      </v-slide-x-transition>
      <v-slide-x-transition>
        <v-col cols="12" v-if="requestActive && requestCode == 150">
          <v-alert type="info">
            Deleting the conversion.
            <div class="text-right mt-2">
              <v-progress-circular
                indeterminate
                color="white"
              ></v-progress-circular>
            </div>
          </v-alert>
        </v-col>
      </v-slide-x-transition>
      <v-slide-x-transition>
        <v-col
          cols="12"
          v-if="requestFailed && !requestActive && requestCode == 10"
        >
          <v-alert type="error">
            Failed to fetch your conversions from the server.
          </v-alert>
        </v-col>
      </v-slide-x-transition>
      <v-slide-x-transition>
        <v-col
          cols="12"
          v-if="
            requestCode == 10 &&
              !requestFailed &&
              !requestActive &&
              (!userConversions || userConversions.length == 0)
          "
        >
          <v-alert type="info">
            You don't have any conversions at the moment.
          </v-alert>
        </v-col>
      </v-slide-x-transition>
      <v-slide-x-transition>
        <v-col
          cols="12"
          v-if="
            requestCode == 150 &&
              !requestFailed &&
              !requestActive &&
              (!userConversions || userConversions.length == 0)
          "
        >
          <v-alert type="info">
            You don't have any conversions at the moment.
          </v-alert>
        </v-col>
      </v-slide-x-transition>
    </v-row>
  </v-container>
</template>

<script>
import Conversion from "@/components/Conversion.vue";

export default {
  data() {
    return {
      filters_panel: false,
      datepicker: false,
      dates: [new Date().toISOString().substr(0, 10)],
      system: ["Any", "Arabic", "Roman"],
      today: new Date().toISOString().substr(0, 10),
      system_in: "Any",
      system_out: "Any",
      filtered_conversions: [],
      filter_active: false
    };
  },
  watch: {
    dates() {
      this.date_from_f = this.formatDate(this.date_from);
    }
  },
  components: {
    appConversion: Conversion
  },
  computed: {
    userConversions() {
      let conversions = this.$store.getters.getConversions;

      return conversions
        .sort((a, b) => {
          if (this.parseDate(a.date) > this.parseDate(b.date)) {
            return 1;
          }
          if (this.parseDate(a.date) < this.parseDate(b.date)) {
            return -1;
          }

          return 0;
        })
        .reverse();
    },
    requestActive() {
      return this.$store.getters.getRequestDetails.active;
    },
    requestFailed() {
      return this.$store.getters.getRequestDetails.failed;
    },
    requestCode() {
      return this.$store.getters.getRequestDetails.code;
    },
    conversionsRetrieved() {
      return (
        !this.requestActive &&
        !this.requestFailed &&
        this.userConversions &&
        this.userConversions.length > 0
      );
    },
    datesFormated() {
      return this.dates
        .map(item => {
          return this.formatDate(item);
        })
        .join(" ~ ");
    },
    conversions() {
      return this.filter_active
        ? this.filtered_conversions
        : this.userConversions;
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");

      return `${day}.${month}.${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split(".");
      return new Date(
        `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      );
    },
    applyFilter() {
      if (
        this.dates.length > 1 &&
        this.parseDate(this.formatDate(this.dates[0])) >
          this.parseDate(this.formatDate(this.dates[1]))
      ) {
        var d = this.dates[1];
        this.dates[1] = this.dates[0];
        this.dates[0] = d;
      }

      const filter = {};
      filter.system_in =
        this.system_in === "Any" ? true : this.system_in.toLowerCase();
      filter.system_out =
        this.system_out === "Any" ? true : this.system_out.toLowerCase();
      filter.date = this.dates.map(date => this.formatDate(date));

      this.filtered_conversions = this.userConversions.filter(item => {
        return (
          item.system_in.toLowerCase() ===
            (filter.system_in === true
              ? item.system_in.toLowerCase()
              : filter.system_in) &&
          item.system_out.toLowerCase() ===
            (filter.system_out === true
              ? item.system_out.toLowerCase()
              : filter.system_out) &&
          (filter.date.length > 1
            ? this.parseDate(item.date) >= this.parseDate(filter.date[0]) &&
              this.parseDate(item.date) <= this.parseDate(filter.date[1])
            : this.parseDate(item.date) <= this.parseDate(filter.date[0]))
        );
      });

      this.filter_active = true;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.getters.getLoginStatus) {
        vm.$store.dispatch("fetchConversions");
      } else {
        vm.$router.push({ path: "/authorization" });
      }
    });
  }
};
</script>

<style lang="scss">
.filter_plain {
  border: 1px solid #1976d2;
}

.active_shadow {
  box-shadow: 0px 0px 27px 3px rgb(0, 187, 0);
}

.filter_active {
  border: 1px solid rgb(0, 187, 0);
}

.filter_content {
  border-left: 1px solid #1976d2;
  border-right: 1px solid #1976d2;
  border-bottom: 1px solid #1976d2;
}

.filter_active_content {
  border-left: 1px solid rgb(0, 187, 0);
  border-right: 1px solid rgb(0, 187, 0);
  border-bottom: 1px solid rgb(0, 187, 0);
}
</style>
