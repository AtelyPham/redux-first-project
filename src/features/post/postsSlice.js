import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await client.get('/fakeApi/posts')
  return res.posts
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const res = await client.post('/fakeApi/posts', { post: initialPost })
    return res.post
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            userId,
            reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
          },
        }
      },
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      // const editPost = state.posts.find((p) => p.id === id)
      const editPost = state.entities[id]
      if (editPost) {
        editPost.title = title
        editPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      // const existingPost = state.posts.find((p) => p.id === postId)
      const existingPost = state.entities[postId]
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'successed'
      // state.posts = state.posts
      //   .concat(action.payload)
      //   .sort((a, b) => b.date.localeCompare(a.date))
      postsAdapter.upsertMany(state, action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    // [addNewPost.fulfilled]: (state, action) => {
    //   state.posts.push(action.payload)
    // },
    [addNewPost.fulfilled]: postsAdapter.addOne,
  },
})

// export const selectAllPosts = (state) => state.posts.posts
// export const selectPostById = (state, postId) =>
//   state.posts.posts.find((p) => p.id === postId)
// export const selectAllPostIds = (state) =>
//   selectAllPosts(state).map((p) => p.id)
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectAllPostIds,
} = postsAdapter.getSelectors((state) => state.posts)

// Memoizing Selector Function
export const selectPostByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((p) => p.user === userId)
)
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer
