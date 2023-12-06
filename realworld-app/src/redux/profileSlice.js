import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: {},
    },
    reducers: {
        setProfileCurrent: (state, action) => {
            state.profile = action.payload;
        }
    },
    extraReducers: (builder) => {
      
    }
})
export const { setProfileCurrent } = profileSlice.actions;
export default profileSlice.reducer;