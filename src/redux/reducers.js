const INITIAL_STATE = {
  session: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SESSION':
      return {
        ...state,
        session: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
