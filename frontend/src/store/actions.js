export const signOut = ({ commit }) => {
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
};
