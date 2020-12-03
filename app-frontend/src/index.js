import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import userService from './services/user'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from "react-router-dom"


const App = () => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      userService.setToken(user.token)
    }
  }, [])


  return (
    <Router>

  
      <div>
      <Switch>
        <Route path="/login">
           <LoginForm />
          </Route>
          <Route path="/users">
        <UserList /> 
          </Route>
          <Route path="/">
          <Home/>
          </Route>
          </Switch>

      </div>

      {/* <div>
      <br />
        <em>Nooran hieno lahjatoiveSovellus</em>
      </div> */}

    </Router>

  )

}



ReactDOM.render(<App />, document.getElementById('root'))
