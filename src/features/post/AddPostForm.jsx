import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { selectAllUsers } from '../users/usersSlice'
import { addNewPost } from './postsSlice'

const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()
  const history = useHistory()

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const postContentStyle = {
    minHeight: 250,
    lineHeight: 1.3,
  }

  const onSavePostClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addNewPost({ title, content, user: userId })
        )
        unwrapResult(resultAction)
        setTitle('')
        setContent('')
        setUserId('')
      } catch (error) {
        console.log('Error from add form: ', error)
      } finally {
        setAddRequestStatus('idle')
        history.push('/')
      }
    }
  }

  const usersOptions = users.map((u) => (
    <option key={u.id} value={u.id}>
      {u.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a new Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          style={postContentStyle}
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
