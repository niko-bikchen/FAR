import axios from "axios";

const registration = {
  actions: {
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
                refresh_token: response.data.refresh_token,
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
    }
  }
};

export default registration;
