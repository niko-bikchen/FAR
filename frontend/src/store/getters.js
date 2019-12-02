export const getRequestDetails = state => {
  return Object.assign({}, state.request);
};

export const getUserData = state => {
  return { name: state.user.name, email: state.user.email };
};

export const getWebTokenBundle = state => {
  return {
    webtoken: state.user.webtoken,
    refresh_token: state.user.refresh_token
  };
};

export const getLoginStatus = state => {
  return state.user.webtoken !== "";
};
