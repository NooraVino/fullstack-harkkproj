import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import userService from './services/user'
import {
  BrowserRouter as Router,
  Switch, Route, useHistory, Link, Redirect
} from "react-router-dom"



const App = () => {
  const [user, setUser] = useState()
  const [page, setPage] = useState('oma');
 const [loggedUser, setLoggedUser]= useState(() => {return window.localStorage.getItem('loggedUser')})
  const history = useHistory()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      //setUser(loggedUser)
      setLoggedUser(loggedUser)
      userService.setToken(loggedUser.token)
    }
  }, [])

  // useEffect(() => {
  //   if (user){
  //   userService.getOneUser(user.id).then((response) => {
  //     setUserp(response)
  //     console.log(userp)
  //   })}
  // }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setLoggedUser(null)
    userService.setToken(null)
  }



  return (
    <div>

      <Router>
        <div>
          {user !== null &&
            <button onClick={() => logout()}>Kirjaudu ulos</button>

          }
        </div>
        <div>

          {page === 'muiden'
            ? <Link to="/users" onClick={() => setPage('oma')}>kaikkien toiveet</Link>
            : <Link to="/" onClick={() => setPage('muiden')}>oma sivu</Link>
          }

        </div>


        <Switch>
          <Route exact path="/users">
            {loggedUser ? <UserList setUser={setUser} /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            <LoginForm setUser={setUser} setLoggedUser={setLoggedUser} />
          </Route>
          <Route exact path="/">
            {loggedUser ? <Home setUset={setUser} user={user}/> : <Redirect to="/login" />}
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
