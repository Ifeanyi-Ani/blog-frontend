import { adminModal } from "./modals.actions";

const INIT_STATE = {
  hideModal: false,
  hideForm: false,
  adModal: false,
  editForm: false,
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
    case "ADMIN_MODAL":
      return { ...state, adModal: !state.adModal };
    case "EDIT_FORM":
      return { ...state, editForm: !state.editForm };
    default:
      return state;
  }
};
export default modalsReducer;
