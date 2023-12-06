import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const getArticleDetail = createAsyncThunk('article_detail/getArticleDetail', async ({ slug }) => {
    const response = await axios.get(`https://api.realworld.io/api/articles/${slug}`);
    // console.log(response.data);
    return response.data;
});


const articleDetailSlice = createSlice({
    name: 'article_detail',
    initialState: {
        loadingArticleDetail: false,
        articleDetail: {},
        errorArticleDetail: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getArticleDetail.pending, (state) => {
                state.loadingArticleDetail = true;
                state.errorArticleDetail = null;
            })
            .addCase(getArticleDetail.fulfilled, (state, action) => {
                state.loadingArticleDetail = false;
                state.articleDetail = action.payload;
            })
            .addCase(getArticleDetail.rejected, (state,action) => {
                state.loadingArticleDetail = false;
                state.errorArticleDetail = action.error.message;
            })
    }
})

export default articleDetailSlice.reducer;
export { getArticleDetail };