import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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
      finished: { pos: false, neg: false },
      failed: false,
      details: ""
    }
  },
  mutations: {
    SET_TRANSLATIONS(state, translations) {
      state.user.translations = [...translations];
    },
    ADD_TRANSLATION(state, translation) {
      state.user.translations.push(translation);
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
    addTranslation({ commit, getters }, translation) {
      commit("SET_REQUEST_DETAILS", {
        active: true,
        failed: false,
        finished: {}
      });

      return new Promise((resolve, reject) => {
        axios
          .post("/add-translation", {
            email: getters.getUserData.email,
            webtoken: getters.getUserData.webtoken
          })
          .then(response => {
            if (response.status === 200) {
              commit("ADD_TRANSLATION", translation);
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { pos: true }
              });
            } else {
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { neg: true }
              });
            }

            resolve(getters.getRequestDetails);
          })
          .catch(error => {
            commit("SET_REQUEST_DETAILS", {
              active: false,
              failed: true,
              description: "An error occured while converting numbers."
            });

            reject(new Error(error.message));
          });
      });
    },
    fetchTranslations({ commit, getters }) {
      commit("SET_REQUEST_DETAILS", {
        active: true,
        false: false,
        finished: {}
      });

      return new Promise((resolve, reject) => {
        axios
          .post("/get-translations", {
            email: getters.getUserData.email,
            webtoken: getters.getUserData.webtoken
          })
          .then(response => {
            if (response.status === 200) {
              commit("SET_TRANSLATIONS", response.data.translations);
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { pos: true }
              });
            } else {
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { pos: false }
              });
            }

            resolve(getters.getRequestDetails);
          })
          .catch(error => {
            commit("SET_REQUEST_DETAILS", {
              active: false,
              failed: true,
              description:
                "An error occured while fetching your history of convertiosn from the server."
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
        description: "Signing user in."
      });

      return new Promise((resolve, reject) => {
        axios
          .post("/sign-in", userData)
          .then(response => {
            console.log(response);
            if (response.status === 200) {
              commit("SET_USER", {
                email: userData.email,
                name: response.data.name,
                webtoken: response.data.webtoken
              });
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { pos: true },
                description: "User successfuly signed in."
              });

              resolve(getters.getRequestDetails);
            } else {
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { neg: true },
                description: "You provided invalid credentials."
              });

              resolve(getters.getRequestDetails);
            }
          })
          .catch(error => {
            commit("SET_REQUEST_DETAILS", {
              active: false,
              failed: true,
              description: "An error occured while signing user in."
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
        description: "Signing user up."
      });

      return new Promise((resolve, reject) => {
        axios
          .post("/sign-up", userData)
          .then(response => {
            if (response.status === 200) {
              commit("SET_USER", {
                email: userData.email,
                name: userData.name,
                webtoken: response.data.webtoken
              });
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { pos: true },
                description: "User successfuly signed up."
              });

              resolve(getters.getRequestDetails);
            } else {
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { neg: true },
                description: "User with such email already exists."
              });

              resolve(getters.getRequestDetails);
            }
          })
          .catch(error => {
            commit("SET_REQUEST_DETAILS", {
              active: false,
              failed: true,
              description: "An error occured while signing user up."
            });

            reject(new Error(error.message));
          });
      });
    },
    signOut({ commit }) {
      commit("SET_USER", {});
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
    getTranslations(state) {
      return [...state.user.translations];
    },
    getUserData(state) {
      return { name: state.user.name, email: state.user.email };
    },
    getLoginStatus(state) {
      return state.user.webtoken !== "";
    }
  }
});
