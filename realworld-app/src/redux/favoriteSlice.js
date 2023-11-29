import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const deleteFavorite = createAsyncThunk('favorite/deleteFavorite', async ({ slug }, { getState }) => {
    const { auth } = getState();
    const token = auth.login.jwtToken;
    const response = await axios.delete(`https://api.realworld.io/api/articles/${slug}/favorite`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    console.log(response.data);
    return response.data;

})


const postFavorite = createAsyncThunk('favorite/postFavorite', async ({ slug }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.login.jwtToken;
    // console.log(token);

    const response = await axios.post(`https://api.realworld.io/api/articles/${slug}/favorite`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response.data);
    }
    console.log(response.data);
    return response.data;
})


const followSlice = createSlice({
    name: 'favorite',
    initialState: {
        changeFavorite: 0,
        loadingFavorite: false,
        errorFavorite: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteFavorite.pending, (state) => {
                state.loadingFavorite = true;
                state.errorFavorite = null;
            })
            .addCase(deleteFavorite.fulfilled, (state, action) => {
                state.loadingFavorite = false;
                state.changeFavorite = action.payload - 1;
            })
            .addCase(deleteFavorite.rejected, (state, action) => {
                state.errorFavorite = action.error.message;
            })
            .addCase(postFavorite.pending, (state) => {
                state.loadingFavorite = true;
                state.errorFavorite = null;
            })
            .addCase(postFavorite.fulfilled, (state, action) => {
                state.loadingFavorite = false;
                state.changeFavorite = action.payload + 1;
            })
            .addCase(postFavorite.rejected, (state, action) => {
                state.errorFavorite = action.error.message;
            })
    }
})

export default followSlice.reducer;
export { deleteFavorite, postFavorite }