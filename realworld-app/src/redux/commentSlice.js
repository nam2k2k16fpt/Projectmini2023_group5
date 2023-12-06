import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//get //optional
//https://api.realworld.io/api/articles/{slug}/comments
const getCommentOfArticle = createAsyncThunk('comment/getCommentOfArticle', async ({ slug }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.login.jwtToken;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await axios.get(`https://api.realworld.io/api/articles/${slug}/comments`, config);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response.data);
    }
    // console.log(response.data);
    return response.data;
})

//post
//https://api.realworld.io/api/articles/{slug}/comments
const postCommentOfArticle = createAsyncThunk('comment/postCommentOfArticle', async ({ slug, comment }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.login.jwtToken;
    console.log(slug);
    console.log(comment);
    try {
        const res = await axios.post(`https://api.realworld.io/api/articles/${slug}/comments`, {
            comment: {
                ...comment
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

//delete
//https://api.realworld.io/api/articles/{slug}/comments/{id}
const deleteCommentOfArticle = createAsyncThunk('comment/deleteCommentOfArticle', async ({ slug, id }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.login.jwtToken;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    try {
        const res = await axios.delete(`https://api.realworld.io/api/articles/${slug}/comments/${id}`, config);
        // console.log(res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        listComment: [],
        sigleComment: [],
        loadingGetComment: false,
        loadingPostComment: false,
        loadingDeleteComment: false,
        errorGetComment: null,
        errorPostComment: null,
        errorDeleteComment: null,

    },
    reducers: {
        setListComment: (state, action) => {
            state.listComment = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCommentOfArticle.pending, (state) => {
                state.loadingGetComment = true;
                state.errorGetComment = null;
            })
            .addCase(getCommentOfArticle.fulfilled, (state, action) => {
                state.loadingGetComment = false;
                state.listComment = action.payload;
            })
            .addCase(getCommentOfArticle.rejected, (state, action) => {
                state.errorGetComment = action.error.message;
            })
            .addCase(postCommentOfArticle.pending, (state) => {
                state.loadingPostComment = true;
                state.errorPostComment = null;
            })
            .addCase(postCommentOfArticle.fulfilled, (state, action) => {
                state.loadingPostComment = false;
                state.sigleComment = action.payload;
            })
            .addCase(postCommentOfArticle.rejected, (state, action) => {
                state.errorPostComment = action.error.message;
            })
            .addCase(deleteCommentOfArticle.pending, (state) => {
                state.loadingDeleteComment = true;
                state.errorDeleteComment = null;
            })
            .addCase(deleteCommentOfArticle.fulfilled, (state) => {
                state.loadingDeleteComment = false;
            })
            .addCase(deleteCommentOfArticle.rejected, (state, action) => {
                state.errorDeleteComment = action.error.message;
            })
    }
})
export const { setListComment } = commentSlice.actions;
export default commentSlice.reducer;
export { getCommentOfArticle, postCommentOfArticle, deleteCommentOfArticle }