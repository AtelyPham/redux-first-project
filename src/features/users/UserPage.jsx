import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectPostByUser } from '../post/postsSlice'
import { selectUserById } from './usersSlice'

const UserPage = ({ match }) => {
  const { userId } = match.params

  const user = useSelector((state) => selectUserById(state, userId))
  // useSelector re-render when the state change so
  //  it create new array every time so make the component re-render
  /*
  const postOfUser = useSelector((state) => {
    const posts = selectAllPosts(state)
    return posts.filter((p) => p.user === userId)
  })
  */
  // Use memoize selector instead
  const postOfUser = useSelector((state) => selectPostByUser(state, userId))

  const postTitles = postOfUser.map((p) => (
    <li key={p.id}>
      <Link to={`/posts/${p.id}`}>{p.title}</Link>
    </li>
  ))
  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}

export default UserPage
