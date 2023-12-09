import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getGlobalFeed = createAsyncThunk('articles/getGlobalFeed', async ({ offset, tag, limit }, { getState }) => {
    const { auth } = getState();
    const token = auth.login.jwtToken || '';
    // console.log(token);
    const url = tag ? `https://api.realworld.io/api/articles?offset=${offset}&tag=${tag}&limit=${limit}` : `https://api.realworld.io/api/articles?offset=${offset}&limit=${limit}`;
    // console.log(offset, tag, url);
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.get(url, config);
    console.log(response.data);
    return response.data;
});


const getYourFeed = createAsyncThunk('articles/getYourFeed', async ({ offset, limit }, { getState }) => {
    const { auth } = getState();
    const token = auth.login.jwtToken;
    const response = await axios.get(`https://api.realworld.io/api/articles/feed?offset=${offset}&limit=${limit}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    console.log(response.data);
    return response.data;
});

// https://api.realworld.io/api/articles?author=stringbb my article get (cần token || null)
const getOwnArticle = createAsyncThunk('article/getOwnArticle', async ({ offset, limit, username }, { getState }) => {
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
    const res = await axios.get(`https://api.realworld.io/api/articles?offset=${offset}&author=${username}&limit=${limit}`, config);

    // console.log(res.data);
    return res.data;
});

// https://api.realworld.io/api/articles?favorited=stringbb my favorited
// https://api.realworld.io/api/articles?favorited=Anah Benešová
const getOwnFavoriteArticle = createAsyncThunk('article/getOwnFavoriteArticle', async ({ offset, limit, username }, { getState }) => {
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
    const res = await axios.get(`https://api.realworld.io/api/articles?offset=${offset}&favorited=${username}&limit=${limit}`, config);
    // console.log(res.data);
    return res.data;
});


// https://api.realworld.io/api/articles POST new Article
const postNewArticle = createAsyncThunk('article/postNewArticle', async (article, { getState, rejectWithValue }) => {
    console.log(article);
    const { auth } = getState();
    const token = auth.login.jwtToken;

    try {
        const res = await axios.post('https://api.realworld.io/api/articles', {
            article: {
                ...article
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// https://api.realworld.io/api/articles/slug PUT edit Article

const updateArticle = createAsyncThunk('article/updateArticle', async({article, slug}, { getState, rejectWithValue }) => {
    console.log(article);
    console.log(slug);
    const { auth } = getState();
    const token = auth.login.jwtToken;

    try {
        const res = await axios.put(`https://api.realworld.io/api/articles/${slug}`, {
            article: {
                ...article
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// https://api.realworld.io/api/articles/slug DELETE delete Article
const deleteArticle = createAsyncThunk('article/deleteArticle', async ({ slug }, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.login.jwtToken;
    try {
        const res = axios.delete(`https://api.realworld.io/api/articles/${slug}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        console.log('delete: ',res.data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})



const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        globalFeed: [],
        yourFeed: [],
        OwnArticle: [],
        OwnFavoriteArticle: [],
        SignleArticle: {},
        UpdateArticle: {},
        loadingGlobalFeed: false,
        loadingYourFeed: false,
        loadingOwnArticle: false,
        loadingFavoriteArticle: false,
        loadingNewArticle: false,
        loadingUpdateArticle: false,
        loadingDeleteArticle: false,
        totalArticle: 0,
        currentPage: 1,
        offset: 0,
        tagSelect: '',
        errorGlobalFeed: null,
        errorYourFeed: null,
        errorOwnArticle: null,
        errorFavoriteAricle: null,
        errorNewArticle: null,
        errorUpdateArticle: null,
        errorDeleteArticle: null,
    },
    reducers: {
        settotalArticle: (state, action) => {
            state.totalArticle = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setOffset: (state, action) => {
            state.offset = action.payload;
        },
        setTagSelect: (state, action) => {
            state.tagSelect = action.payload;
            state.loadingGlobalFeed = false;
        },
        resetOption: (state, action) => {
            state.currentPage = action.payload.resetPage;
            state.offset = action.payload.resetOffset;
            state.tagSelect = action.payload.resetTag;
            state.totalArticle = action.payload.resetTotal;
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
                state.totalArticle = action.payload.articlesCount;
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
                state.totalArticle = action.payload.articlesCount;
            })
            .addCase(getYourFeed.rejected, (state, action) => {
                state.loadingYourFeed = false;
                state.errorYourFeed = action.error.message;
            })
            .addCase(getOwnArticle.pending, (state) => {
                state.loadingOwnArticle = true;
                state.errorOwnArticle = null;
            })
            .addCase(getOwnArticle.fulfilled, (state, action) => {
                state.loadingOwnArticle = false;
                state.OwnArticle = action.payload;
                state.totalArticle = action.payload.articlesCount;
            })
            .addCase(getOwnArticle.rejected, (state, action) => {
                state.loadingOwnArticle = false;
                state.errorOwnArticle = action.error.message;
            })
            .addCase(getOwnFavoriteArticle.pending, (state) => {
                state.loadingFavoriteArticle = true;
                state.errorFavoriteAricle = null;
            })
            .addCase(getOwnFavoriteArticle.fulfilled, (state, action) => {
                state.loadingFavoriteArticle = false;
                state.OwnFavoriteArticle = action.payload;
                state.totalArticle = action.payload.articlesCount;
            })
            .addCase(getOwnFavoriteArticle.rejected, (state, action) => {
                state.loadingFavoriteArticle = false;
                state.errorFavoriteAricle = action.error.message;
            })
            .addCase(postNewArticle.pending, (state) => {
                state.loadingNewArticle = true;
                state.errorNewArticle = null;
            })
            .addCase(postNewArticle.fulfilled, (state, action) => {
                state.loadingNewArticle = false;
                state.SignleArticle = action.payload;
            })
            .addCase(postNewArticle.rejected, (state, action) => {
                state.loadingNewArticle = false;
                state.errorNewArticle = action.error.message;
            })
            .addCase(updateArticle.pending, (state) => {
                state.loadingUpdateArticle = true;
                state.errorUpdateArticle = null;
            })
            .addCase(updateArticle.fulfilled, (state, action) => {
                state.loadingUpdateArticle = false;
                state.UpdateArticle = action.payload;
            })
            .addCase(updateArticle.rejected, (state, action) => {
                state.loadingUpdateArticle = false;
                state.errorUpdateArticle = action.error.message;
            })
            .addCase(deleteArticle.pending, (state) => {
                state.loadingDeleteArticle = true;
                state.errorDeleteArticle = null;
            })
            .addCase(deleteArticle.fulfilled, (state) => {
                state.loadingDeleteArticle = false;
            })
            .addCase(deleteArticle.rejected, (state, action) => {
                state.loadingDeleteArticle = false;
                state.errorDeleteArticle = action.error.message;
            })
    },
});
export const { settotalArticle, setCurrentPage, setOffset, setTagSelect, resetOption } = articlesSlice.actions;
export default articlesSlice.reducer;
export { getGlobalFeed, getYourFeed, getOwnArticle, getOwnFavoriteArticle, postNewArticle, updateArticle, deleteArticle };
