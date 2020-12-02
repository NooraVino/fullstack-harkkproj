import React from 'react'
import ReactDOM from 'react-dom'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'





const App = () => (
  <div>
    <div>
      <LoginForm />
    </div>
    <div>
      <UserList/>
    </div>
  </div>
)





ReactDOM.render(<App />, document.getElementById('root'))
