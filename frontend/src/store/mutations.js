export const SET_WEBTOKEN = (state, webtoken) => {
  state.user.webtoken = webtoken.slice(0);
};

export const SET_USER = (state, userData) => {
  state.user = Object.assign({}, userData);
};

export const SET_REQUEST_DETAILS = (state, requestDetails) => {
  state.request = Object.assign({}, requestDetails);
};
