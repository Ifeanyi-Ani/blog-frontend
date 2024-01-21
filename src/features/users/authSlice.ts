import { createSlice } from "@reduxjs/toolkit";
interface Init {
  currentUser: {
    dob: string;
    email: string;
    id: string;
    photo: string;
    role: "user" | "admin";
    username: string;
    updatedAt: string;
    createdAt: string;
  } | null;
  isLoggedIn: boolean;
}
const profile = localStorage.getItem("currentUser");

const initialState = {
  currentUser: null,
  isLoggedIn: false,
} as Init;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn: (state, _) => {
      if (profile) {
        state.isLoggedIn = true;
        const user = JSON.parse(profile);
        state.currentUser = user.currentUser;
      }
    },

    loggedOut: (state, _) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
