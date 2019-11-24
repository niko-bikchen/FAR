import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      inputs: [],
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
    SET_INPUTS(state, inputs) {
      state.user.inputs = inputs.slice(0);
    },
    ADD_INPUT(state, input) {
      state.user.inputs.push(input);
    },
    SET_WEBTOKEN(state, webtoken) {
      state.user.webtoken = webtoken.slice(0);
    },
    SET_USER(state, userData) {
      state.user = Object.assign({}, userData);
    }
  },
  actions: {
    addInput({ commit }, input) {
      commit("ADD_INPUT", input);
    },
    signIn({ commit }, cred) {
      console.log(cred);
      commit("SET_USER", {});
    },
    signUp({ commit }, userData) {
      commit("SET_USER", { email: userData.email, name: userData.name });
    },
    signOut({ commit }) {
      commit("SET_USER", {});
    }
  }
});
