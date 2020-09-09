export const setToken = (token) => {
  return (dispatch) => {
    dispatch({type: 'SET_SESSION', value: token});
  };
};
