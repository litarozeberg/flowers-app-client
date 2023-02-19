import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode"

const initialState = {
  loggedIn: false,
  isAdmin: false,
  email:'',
  img: ''
};

const authSlice = createSlice({
    name: "Auth",
    initialState: initialState,
   
    reducers: {
      login(state) {
        state.loggedIn = true;
        state.isAdmin = jwt_decode(localStorage.getItem("token")).isAdmin;
        state.email = jwt_decode(localStorage.getItem("token")).email;
        state.img = jwt_decode(localStorage.getItem("token")).img;
      },
      logout(state) {
        state.loggedIn = false;
      },
    },
  });
  
  export const authActions = authSlice.actions;
  
  export default authSlice.reducer;