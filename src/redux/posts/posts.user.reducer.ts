const postByReducer = (state = [], action) => {
  switch (action.type) {
    case "USER_POSTS":
      return [...state, action.payload];
    default:
      return state;
  }
};
export default postByReducer;
