import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      translations: [],
      webtoken: "",
      email: "",
      name: ""
    },
    request: {
      active: false,
      failed: false,
      details: ""
    }
  },
  mutations: {
    SET_TRANSLATIONS(state, translations) {
      state.user.translations = translations.slice(0);
    },
    ADD_TRANSLATION(state, translation) {
      state.user.inputs.translations(translation);
    },
    SET_WEBTOKEN(state, webtoken) {
      state.user.webtoken = webtoken.slice(0);
    },
    SET_USER(state, userData) {
      state.user = Object.assign({}, userData);
    }
  },
  actions: {
    addTranslation({ commit }, translation) {
      commit("ADD_TRANSLATION", translation);
    },
    fetchTranslations({ commit }, userData) {
      console.log(userData);
      commit("SET_TRANSLATIONS");
    },
    signIn({ commit }, userData) {
      commit("SET_USER", { email: userData.email, name: userData.name });
    },
    signUp({ commit }, userData) {
      commit("SET_USER", { email: userData.email, name: userData.name });
    },
    signOut({ commit }) {
      commit("SET_USER", {});
    }
  }
});
