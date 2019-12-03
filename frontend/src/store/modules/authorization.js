import axios from "axios";

const authorization = {
  actions: {
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
                webtoken: response.data.webToken,
                refresh_token: response.data.refreshToken,
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
    }
  }
};

export default authorization;
