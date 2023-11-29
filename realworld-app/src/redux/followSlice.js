// https://api.realworld.io/api/profiles/namnh22/follow - post to follow a user
// https://api.realworld.io/api/profiles/namnh22/follow - delete to unfollow a user

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const deleteFollow = createAsyncThunk('follow/deleteFollow', async ({ username }, { getState }) => {
    const { auth } = getState();
    const token = auth.login.jwtToken;
    const response = await axios.delete(`https://api.realworld.io/api/profiles/${username}/follow`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    console.log(response.data);
    return response.data;

})


const postFollow = createAsyncThunk('follow/postFollow', async ({ username }, { getState }) => {
    const { auth } = getState();
    const token = auth.login.jwtToken;
    // console.log(token);

    const response = await axios.post(`https://api.realworld.io/api/profiles/${username}/follow`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    console.log(response.data);
    return response.data;
})


const followSlice = createSlice({
    name: 'follow',
    initialState: {
        loadingFollow: false,
        errorFollow: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteFollow.pending, (state) => {
                state.loadingFollow = true;
                state.errorFollow = null;
            })
            .addCase(deleteFollow.fulfilled, (state, action) => {
                state.loadingFollow = false;
            })
            .addCase(deleteFollow.rejected, (state, action) => {
                state.errorFollow = action.error.message;
            })
            .addCase(postFollow.pending, (state) => {
                state.loadingFollow = true;
                state.errorFollow = null;
            })
            .addCase(postFollow.fulfilled, (state, action) => {
                state.loadingFollow = false;
            })
            .addCase(postFollow.rejected, (state, action) => {
                state.errorFollow = action.error.message;
            })
    }
})

export default followSlice.reducer;
export { deleteFollow, postFollow }