import classNames from 'classnames'
import { formatDistanceToNow, parseISO } from 'date-fns'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import {
  allNotificationsRead,
  selectAllNotifications,
} from './notificationsSlice'

const NotificationsList = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  useEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderNotifications = notifications.map((n) => {
    const date = parseISO(n.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((u) => u.id === n.user) || {
      name: 'Unknown User',
    }
    const notificationClassname = classNames('notification', {
      new: n.isNew,
    })

    return (
      <div key={n.id} className={notificationClassname}>
        <div>
          <b>{user.name}</b> {n.message}
        </div>
        <div title={n.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderNotifications}
    </section>
  )
}

export default NotificationsList
