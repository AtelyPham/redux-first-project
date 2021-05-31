import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
// const OtherComponent = React.lazy(() => import('./OtherComponent'));
import { Navbar } from './app/Navbar'
import PostsList from './features/post/PostsList'
const NotificationsList = React.lazy(() =>
  import('./features/notifications/NotificationsList')
)
const AddPostForm = React.lazy(() => import('./features/post/AddPostForm'))
const EditPostForm = React.lazy(() => import('./features/post/EditPostForm'))
const SinglePostPage = React.lazy(() =>
  import('./features/post/SinglePostPage')
)
const UserPage = React.lazy(() => import('./features/users/UserPage'))
const UsersList = React.lazy(() => import('./features/users/UsersList'))

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <PostsList />} />
          <Suspense fallback={<h1>Loading...</h1>}>
            <Route path="/addPost" component={AddPostForm} />
            <Route exact path="/users" component={UsersList} />
            <Route exact path="/notifications" component={NotificationsList} />
            <Route exact path="/posts/:postId" component={SinglePostPage} />
            <Route exact path="/editPost/:postId" component={EditPostForm} />
            <Route exact path="/users/:userId" component={UserPage} />
          </Suspense>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
