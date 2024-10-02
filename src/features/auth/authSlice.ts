import { createSlice } from "@reduxjs/toolkit";
import { Author } from "../../types/type";

interface UserState {
  token: String;
  currentUser: Author | null;
}
const initialState: UserState = {
  token: "",
  currentUser: JSON.parse(localStorage.getItem("currentUser")!) || null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    UserLogin: (state, { payload }) => {
      state.token = payload.token;
      state.currentUser = payload.currentUser;
      localStorage.setItem("currentUser", JSON.stringify(payload.currentUser));
    },
    UserLogout: (state) => {
      state.token = "";
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    UserChangePassword: (state, { payload }) => {
      state.token = payload.token;
      state.currentUser = payload.currentUser;
      localStorage.setItem("currentUser", JSON.stringify(payload.currentUser));
    },
  },
});

export const { UserLogin, UserLogout, UserChangePassword } = authSlice.actions;
export default authSlice.reducer;
