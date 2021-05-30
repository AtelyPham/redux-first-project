import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})
const initialState = notificationsAdapter.getInitialState()

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const res = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return res.notifications
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    allNotificationsRead(state) {
      Object.values(state.entities).forEach((notificaton) => {
        notificaton.read = true
      })
    },
  },
  extraReducers: {
    [fetchNotifications.fulfilled]: (state, action) => {
      Object.values(state.entities).forEach((n) => {
        n.isNew = !n.read
      })
      // state.push(...action.payload)
      // // Sort the new first
      // state.sort((a, b) => b.date.localeCompare(a.date))
      notificationsAdapter.upsertMany(state, action.payload)
    },
  },
})

export default notificationsSlice.reducer
export const { allNotificationsRead } = notificationsSlice.actions
export const { selectAll: selectAllNotifications } =
  notificationsAdapter.getSelectors((state) => state.notifications)
