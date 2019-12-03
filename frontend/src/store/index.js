import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

import conversions from "./modules/conversions";
import registatration from "./modules/registration";
import authorization from "./modules/authorization";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ],
  state: {
    user: {
      conversions: [],
      webtoken: "",
      refresh_token: "",
      email: "",
      name: ""
    },
    request: {
      active: false,
      finished: { pos: false, neg: false },
      failed: false,
      details: "",
      code: 0
    }
  },
  modules: {
    conversions,
    registatration,
    authorization
  },
  mutations: {
    SET_WEBTOKEN(state, webtoken) {
      state.user.webtoken = webtoken.slice(0);
    },
    SET_USER(state, userData) {
      state.user = Object.assign({}, userData);
    },
    SET_REQUEST_DETAILS(state, requestDetails) {
      state.request = Object.assign({}, requestDetails);
    },
    SET_CONVERSIONS(state, conversions) {
      state.user.conversions = [];
      if (conversions) {
        for (let i = 0; i < conversions.length; i += 1) {
          conversions[i].fr_id = i;
          state.user.conversions.push(conversions[i]);
        }
      }
    },
    ADD_CONVERSION(state, translation) {
      state.user.conversions.push(translation);
    }
  },
  actions: {
    signOut({ commit }) {
      commit("SET_USER", {
        conversions: [],
        webtoken: "",
        refresh_token: "",
        email: "",
        name: ""
      });
      commit("SET_REQUEST_DETAILS", {
        active: false,
        finished: { pos: false, neg: false },
        failed: false,
        details: ""
      });
    },
    refreshToken({ getters, commit }) {
      axios
        .post("/refresh", {
          webToken: getters.getWebTokenBundle.webtoken,
          refreshToken: getters.getWebTokenBundle.refresh_token
        })
        .then(response => {
          commit("SET_WEBTOKEN", response.data.webToken);
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  getters: {
    getRequestDetails(state) {
      return Object.assign({}, state.request);
    },
    getConversions(state) {
      return [...state.user.conversions];
    },
    getUserData(state) {
      return { name: state.user.name, email: state.user.email };
    },
    getLoginStatus(state) {
      return state.user.webtoken !== "";
    },
    getWebTokenBundle(state) {
      return {
        webtoken: state.user.webtoken,
        refresh_token: state.user.refresh_token
      };
    }
  }
});
