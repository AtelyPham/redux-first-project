import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostExcerpt from './PostExcerpt'
import { fetchPosts, selectAllPostIds } from './postsSlice'

function PostsList() {
  const postStatus = useSelector((state) => state.posts.status)
  const dispatch = useDispatch()
  // const posts = useSelector(selectAllPosts)
  const postsIds = useSelector(selectAllPostIds)
  const err = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, postStatus])

  let content
  if (postStatus === 'loading') {
    content = <div className="loader">Loading...</div>
  } else if (postStatus === 'failed') {
    content = <div>{err}</div>
  } else if (postStatus === 'successed') {
    // const orderedPost = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date))
    // content = orderedPost.map((p) => <PostExcerpt key={p.id} post={p} />)
    content = postsIds.map((pid) => <PostExcerpt key={pid} postId={pid} />)
  }
  return (
    <section className="posts-list">
      <h3>Posts</h3>
      {content}
    </section>
  )
}

export default PostsList
