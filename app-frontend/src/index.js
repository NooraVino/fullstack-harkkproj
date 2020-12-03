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
  const [user, setUser] = useState(()=>{return window.localStorage.getItem('loggedUser')})
 
   


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      userService.setToken(loggedUser.token)
    }
  }, [])


  return (
    <div>


      <Router>
        



        <Switch>
          <Route exact path="/users">
          {user ? <UserList setUser={setUser} /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            <LoginForm setUser={setUser} />
          </Route>
          <Route exact path="/">
          {user ? <Home setUser={setUser} /> : <Redirect to="/login" />}
          </Route>
        </Switch>



        {/* <div>
      <br />
        <em>Nooran hieno lahjatoiveSovellus</em>
      </div> */}

      </Router>
    </div>

  )

}



ReactDOM.render(<App />, document.getElementById('root'))
