import React from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { Navbar } from './app/Navbar'
import NotificationsList from './features/notifications/NotificationsList'
import AddPostForm from './features/post/AddPostForm'
import EditPostForm from './features/post/EditPostForm'
import PostsList from './features/post/PostsList'
import SinglePostPage from './features/post/SinglePostPage'
import UserPage from './features/users/UserPage'
import UsersList from './features/users/UsersList'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <PostsList />} />
          <Route path="/addPost" component={AddPostForm} />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/notifications" component={NotificationsList} />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/editPost/:postId" component={EditPostForm} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
