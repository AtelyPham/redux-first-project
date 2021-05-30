import { configureStore } from '@reduxjs/toolkit'
import notificationsSlice from '../features/notifications/notificationsSlice'
import postsReducer from '../features/post/postsSlice'
import usersReducer from '../features/users/usersSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsSlice,
  },
})
