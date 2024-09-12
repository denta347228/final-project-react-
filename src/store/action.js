export const changeUser = (payload) => {
  return {
    type: "CHANGE_USER",
    payload,
  };
};

export const changeEmail = (payload) => {
  return {
    type: "CHANGE_EMAIL",
    payload,
  };
};

export const hitApi = () => {
  return {
    type: "LINK",
    payload,
  };
};

export const hitDataUser = (dataResponse) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_DATA_USER",
      payload: dataResponse,
    });
  };
};
