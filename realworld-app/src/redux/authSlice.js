import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            jwtToken: null,
            isFetching: false,
            error: false
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.jwtToken = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        updateToken: (state, action) => {
            state.login.jwtToken = action.payload; 
          },
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    updateToken
} = authSlice.actions;

export default authSlice.reducer;