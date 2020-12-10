import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import userService from './services/user'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import './index.css'


const App = () => {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('');
  const [loggedUser, setLoggedUser] = useState(() => { return window.localStorage.getItem('loggedUser') })
  const [gifts, setGifts] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUserp = JSON.parse(loggedUserJSON)

      userService.setToken(loggedUserp.token)
      userService.getOneUser(loggedUserp.id).then((response) => {
        setUser(response)
        setGifts(response.gifts)
      })
      userService.getUsers().then((response) => {
        setUsers(response.filter(u => u.id !== loggedUserp.id))
      })
    }
  }, [])


  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setLoggedUser(null)
    setGifts(null)
    setPage('')
    setUsers(null)
    userService.setToken(null)
  }

  return (
    <div>
      <Router>
        <div >
          {loggedUser
            ? <div className="topnav">
              <button className="logout-button" onClick={() => logout()}>Kirjaudu ulos</button>
              <div>{page === 'muiden'
                ? <Link to="/users" className="topnav-link" onClick={() => setPage('oma')}>Kaikkien toiveet</Link>
                : <Link to="/" className="topnav-link" onClick={() => setPage('muiden')}>Omat toiveet</Link>
              }</div>

            </div>
            : <div></div>

          }
        </div>


        <Switch>
          <Route exact path="/users">
            {loggedUser ? <UserList setUser={setUser} user={user} setPage={setPage} users={users} /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            <LoginForm setUser={setUser} setLoggedUser={setLoggedUser} setGifts={setGifts} />
          </Route>
          <Route exact path="/">
            {loggedUser ? <Home user={user} gifts={gifts} setGifts={setGifts} setPage={setPage} /> : <Redirect to="/login" />}
          </Route>
        </Switch>


      </Router>
    </div>

  )

}



ReactDOM.render(<App />, document.getElementById('root'))
