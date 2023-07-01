const INIT_STATE = {
  hideModal: false,
  hideForm: false,
};
const modalsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_CREATE_MODAL":
      return { ...state, hideModal: !state.hideModal, hideForm: false };
    case "TOGGLE_CREATE_FORM":
      return {
        ...state,
        hideForm: !state.hideForm,
        hideModal: false,
      };
    default:
      return state;
  }
};
export default modalsReducer;
