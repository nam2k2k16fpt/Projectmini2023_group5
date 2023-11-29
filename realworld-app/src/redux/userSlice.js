// Trong userSlice.js
import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: 'user',
    initialState: {
        saveUserData: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        },
        updateUserInfo: {
            isFetching: false,
            error: false
        }
    },
    reducers: {
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        saveUserDataStart: (state) => {
            state.saveUserData.isFetching = true;
        },
        saveUserDataSuccess: (state, action) => {
            state.saveUserData.isFetching = false;
            state.saveUserData.currentUser = action.payload;
            state.saveUserData.error = false;
        },
        saveUserDataFailed: (state) => {
            state.saveUserData.error = true;
        },
        updateUserInfoStart: (state) => {
            state.updateUserInfo.isFetching = true;
        },
        updateUserInfo: (state,action) => {
            state.updateUserInfo.isFetching = false;
            state.saveUserData.currentUser = action.payload;
            state.updateUserInfo.error = false;
        },
        updateUserInfoFailed: (state) => {
            state.updateUserInfo.error = true;
        },
    }
})
export const {
    registerStart,
    registerSuccess,
    registerFailed,
    saveUserDataStart,
    saveUserDataSuccess,
    saveUserDataFailed,
    updateUserInfoStart,
    updateUserInfo,
    updateUserInfoFailed
} = userSlice.actions;

export default userSlice.reducer;