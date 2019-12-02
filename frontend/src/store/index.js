import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

import * as getters from "./getters";
import * as actions from "./actions";
import * as mutations from "./mutations";

import registration from "./modules/registration";
import authorization from "./modules/authorization";
import conversions from "./modules/conversions";

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
  modules: {
    registration,
    authorization,
    conversions
  },
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
  mutations,
  actions,
  getters
});
