import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getTags = createAsyncThunk('tags/getTags', async () => {
  const response = await axios.get('https://api.realworld.io/api/tags');
  return response.data.tags;
});

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    tags: [],
    loadingTags: false,
    errorTags: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state) => {
        state.loadingTags = true;
        state.errorTags = null;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.loadingTags = false;
        state.tags = action.payload;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.loadingTags = false;
        state.errorTags = action.error.message;
      })
  },
});

export default tagsSlice.reducer;
export { getTags };
