export const setToken = (token) => {
  return (dispatch) => {
    dispatch({type: 'SET_SESSION', value: token});
  };
};

export const updateLike = (id, like) => {
  return (dispatch) => {
    dispatch({type: 'SET_LIKE', id: id, like: like});
  };
};
