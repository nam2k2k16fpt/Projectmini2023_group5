import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getGlobalFeed = createAsyncThunk('articles/getGlobalFeed', async ({ offset, tag }, { getState }) => {
    const { auth } = getState();
    const token = auth.login.jwtToken || '';
    // console.log(token);
    const url = tag ? `https://api.realworld.io/api/articles?offset=${offset}&tag=${tag}&limit=10` : `https://api.realworld.io/api/articles?offset=${offset}&limit=10`;
    console.log(offset, tag, url);
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.get(url, config);
    console.log(response);
    return response.data;
});
const getYourFeed = createAsyncThunk('articles/getYourFeed', async ({ offset }, { getState }) => {
    const { auth } = getState();
    const token = auth.login.jwtToken;
    const response = await axios.get(`https://api.realworld.io/api/articles/feed?offset=${offset}&limit=10`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    // console.log(response.data);
    return response.data;
});

const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        globalFeed: [],
        yourFeed: [],
        loadingGlobalFeed: false,
        loadingYourFeed: false,
        totalPage: 0,
        currentPage: 1,
        offset: 0,
        tagSelect: '',
        errorGlobalFeed: null,
        errorYourFeed: null,
    },
    reducers: {
        setTotalPage: (state, action) => {
            state.totalPage = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setOffset: (state, action) => {
            state.offset = action.payload;
        },
        setTagSelect: (state, action) => {
            state.tagSelect = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGlobalFeed.pending, (state) => {
                state.loadingGlobalFeed = true;
                state.errorGlobalFeed = null;
            })
            .addCase(getGlobalFeed.fulfilled, (state, action) => {
                state.loadingGlobalFeed = false;
                state.globalFeed = action.payload;
                state.totalPage = Math.ceil(action.payload.articlesCount / 10);
            })
            .addCase(getGlobalFeed.rejected, (state, action) => {
                state.loadingGlobalFeed = false;
                state.errorGlobalFeed = action.error.message;
            })
            .addCase(getYourFeed.pending, (state) => {
                state.loadingYourFeed = true;
                state.errorYourFeed = null;
            })
            .addCase(getYourFeed.fulfilled, (state, action) => {
                state.loadingYourFeed = false;
                state.yourFeed = action.payload;
                state.totalPage = Math.ceil(action.payload.articlesCount / 10);
            })
            .addCase(getYourFeed.rejected, (state, action) => {
                state.loadingYourFeed = false;
                state.errorYourFeed = action.error.message;
            });
    },
});
export const { setTotalPage, setCurrentPage, setOffset, setTagSelect } = articlesSlice.actions;
export default articlesSlice.reducer;
export { getGlobalFeed, getYourFeed };
