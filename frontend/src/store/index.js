import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

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
  mutations: {
    SET_CONVERSIONS(state, conversions) {
      state.user.conversions = [];
      for (let i = 0; i < Object.keys(conversions).length; i += 1) {
        conversions[i].fr_id = i;
        state.user.conversions.push(conversions[i]);
      }
    },
    ADD_CONVERSION(state, translation) {
      state.user.conversions.push(translation);
    },
    SET_WEBTOKEN(state, webtoken) {
      state.user.webtoken = webtoken.slice(0);
    },
    SET_USER(state, userData) {
      state.user = Object.assign({}, userData);
    },
    SET_REQUEST_DETAILS(state, requestDetails) {
      state.request = Object.assign({}, requestDetails);
    }
  },
  actions: {
    addConversion({ commit, getters }, conversion) {
      commit("SET_REQUEST_DETAILS", {
        active: true,
        failed: false,
        finished: {},
        code: 40
      });

      return new Promise((resolve, reject) => {
        axios
          .post(
            "/add-conversion",
            JSON.stringify({
              email: getters.getUserData.email,
              conversion
            })
          )
          .then(response => {
            if (response.status === 200) {
              commit("ADD_CONVERSION", conversion);
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { pos: true },
                code: 40
              });
            } else {
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { neg: true },
                code: 40
              });
            }

            resolve(response);
          })
          .catch(error => {
            commit("SET_REQUEST_DETAILS", {
              active: false,
              failed: true,
              description: "An error occured while converting numbers.",
              code: 40
            });

            reject(new Error(error.message));
          });
      });
    },
    fetchConversions({ commit, getters }) {
      commit("SET_REQUEST_DETAILS", {
        active: true,
        false: false,
        finished: {},
        code: 10
      });

      return new Promise((resolve, reject) => {
        axios
          .post("/get-conversions", {
            email: getters.getUserData.email,
            webtoken: getters.getUserData.webtoken
          })
          .then(response => {
            if (response.status === 200) {
              commit("SET_CONVERSIONS", response.data.conversions);
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { pos: true },
                code: 10
              });
            } else {
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { pos: false },
                code: 10
              });
            }

            resolve(getters.getRequestDetails);
          })
          .catch(error => {
            commit("SET_REQUEST_DETAILS", {
              active: false,
              failed: true,
              description:
                "An error occured while fetching your history of convertiosn from the server.",
              code: 10
            });

            reject(new Error(error.message));
          });
      });
    },
    signIn({ commit, getters }, userData) {
      commit("SET_REQUEST_DETAILS", {
        active: true,
        failed: false,
        finished: {},
        description: "Signing user in.",
        code: 20
      });

      return new Promise((resolve, reject) => {
        axios
          .post("/sign-in", userData)
          .then(response => {
            if (response.status === 200) {
              commit("SET_USER", {
                email: userData.email,
                name: response.data.name,
                webtoken: response.data.webtoken,
                conversions: []
              });
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { pos: true },
                description: "User successfuly signed in.",
                code: 20
              });

              resolve(getters.getRequestDetails);
            } else {
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { neg: true },
                description: "You provided invalid credentials.",
                code: 20
              });

              resolve(getters.getRequestDetails);
            }
          })
          .catch(error => {
            commit("SET_REQUEST_DETAILS", {
              active: false,
              failed: true,
              description: "An error occured while signing user in.",
              code: 20
            });

            reject(new Error(error.message));
          });
      });
    },
    signUp({ commit, getters }, userData) {
      commit("SET_REQUEST_DETAILS", {
        active: true,
        failed: false,
        finished: {},
        description: "Signing user up.",
        code: 30
      });

      return new Promise((resolve, reject) => {
        axios
          .post("/sign-up", userData)
          .then(response => {
            if (response.status === 200) {
              commit("SET_USER", {
                email: userData.email,
                name: userData.name,
                webtoken: response.data.webtoken,
                conversions: []
              });
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { pos: true },
                description: "User successfuly signed up.",
                code: 30
              });

              resolve(getters.getRequestDetails);
            } else {
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { neg: true },
                description: "User with such email already exists.",
                code: 30
              });

              resolve(getters.getRequestDetails);
            }
          })
          .catch(error => {
            commit("SET_REQUEST_DETAILS", {
              active: false,
              failed: true,
              description: "An error occured while signing user up.",
              code: 30
            });

            reject(new Error(error.message));
          });
      });
    },
    signOut({ commit }) {
      commit("SET_USER", {
        conversions: [],
        webtoken: "",
        email: "",
        name: ""
      });
      commit("SET_REQUEST_DETAILS", {
        active: false,
        finished: { pos: false, neg: false },
        failed: false,
        details: ""
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
    }
  }
});
