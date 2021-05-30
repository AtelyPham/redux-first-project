import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { postUpdated, selectPostById } from './postsSlice'

const EditPostForm = ({ match }) => {
  let { postId } = match.params
  const history = useHistory()
  const dispatch = useDispatch()

  const post = useSelector((state) => selectPostById(state, postId))
  if (!post) {
    history.push('/')
  }
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      history.push(`/posts/${postId}`)
    }
  }

  const postContentStyle = {
    minHeight: 250,
    lineHeight: 1.3,
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          style={postContentStyle}
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={onSavePostClicked}>Save Post</button>
      </form>
    </section>
  )
}

export default EditPostForm
