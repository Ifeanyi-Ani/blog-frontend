const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case "SEARCH":
      return { ...state, query: action.payload };
    default:
      return state;
  }
};
export default searchReducer;
