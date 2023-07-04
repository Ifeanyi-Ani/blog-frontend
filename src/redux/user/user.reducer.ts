const INIT_STATE = {
  hidden: true,
};
const userReducer = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case "TOGGLE_HIDDEN":
      return { ...state, hidden: !state.hidden };
    default:
      return state;
  }
};
export default userReducer;
