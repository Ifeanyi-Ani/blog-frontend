import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/type";

interface UserState {
  token: String;
  currentUser: IUser | null;
}
const initialState: UserState = {
  token: "",
  currentUser: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    UserLogin: (state, { payload }) => {
      state.token = payload.token;
      state.currentUser = payload.currentUser;
    },
    UserLogout: (state) => {
      state.token = "";
      state.currentUser = null;
    },
  },
});

export const { UserLogin, UserLogout } = authSlice.actions;
export default authSlice.reducer;
