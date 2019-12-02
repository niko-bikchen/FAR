import axios from "axios";

const conversions = {
  mutations: {
    SET_CONVERSIONS(state, conversions, rootState) {
      rootState.user.conversions = [];
      for (let i = 0; i < Object.keys(conversions).length; i += 1) {
        conversions[i].fr_id = i;
        rootState.user.conversions.push(conversions[i]);
      }
    },
    ADD_CONVERSION(state, translation, rootState) {
      rootState.user.conversions.push(translation);
    }
  },
  actions: {
    convertFrom({ commit }, { numbers, source }) {
      commit("SET_REQUEST_DETAILS", {
        active: true,
        failed: false,
        finished: {},
        code: 100
      });

      return new Promise((resolve, reject) => {
        axios
          .post(
            `/from_${source}`,
            JSON.stringify({
              numbers
            })
          )
          .then(response => {
            if (response.status === 200) {
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { pos: true },
                description: "Input converted successfuly",
                code: 100
              });

              resolve(response.data.numbers);
            } else {
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { neg: true },
                description: "Cannot convert input",
                code: 100
              });

              reject("Cannot convert input");
            }
          })
          .catch(error => {
            commit("SET_REQUEST_DETAILS", {
              active: false,
              failed: true,
              description: "An error occured while converting numbers.",
              code: 100
            });

            reject(new Error(error.message));
          });
      });
    },
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
            "/translate",
            JSON.stringify({
              webToken: getters.getWebTokenBundle.webtoken,
              converter: conversion
            })
          )
          .then(response => {
            if (response.status === 200) {
              commit("ADD_CONVERSION", response.data.conversion);
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { pos: true },
                description: "Conversion successfuly saved to your account.",
                code: 40
              });
            } else {
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { neg: true },
                description: "Cannot save conversion to your account.",
                code: 40
              });
            }

            resolve(response);
          })
          .catch(error => {
            commit("SET_REQUEST_DETAILS", {
              active: false,
              failed: true,
              description:
                "An error occured while sending conversion to the server.",
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
          .post("/trans-history", {
            webToken: getters.getWebTokenBundle.webtoken
          })
          .then(response => {
            if (response.status === 200) {
              commit("SET_CONVERSIONS", response.data.conversions);
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { pos: true },
                description: "Conversion successfuly saved",
                code: 10
              });
            } else {
              commit("SET_REQUEST_DETAILS", {
                active: false,
                finished: { neg: true },
                description: "Cannot fetch conversions from the server",
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
    }
  },
  getters: {
    getConversions(state) {
      return [...state.user.conversions];
    }
  }
};

export default conversions;
