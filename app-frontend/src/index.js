import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import userService from './services/user'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"



const App = () => {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('muiden');
  const [loggedUser, setLoggedUser] = useState(() => { return window.localStorage.getItem('loggedUser') })
  const [gifts, setGifts] = useState([]);


  useEffect(() => {  
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const loggedUserp = JSON.parse(loggedUserJSON)

        userService.setToken(loggedUserp.token)
        userService.getOneUser(loggedUserp.id).then((response) => {
          setUser(response)   
          setGifts(response.gifts)        
        })
      }
  }, [])


  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setLoggedUser(null)
    setGifts(null)
    userService.setToken(null)
  }

  return (
    <div>
      <Router>
        <div>
          {loggedUser
            ? <div>
              <button onClick={() => logout()}>Kirjaudu ulos</button>
              <div>{page === 'muiden'
                ? <div><Link to="/users" onClick={() => setPage('oma')}>kaikkien toiveet</Link> </div>
                : <div><Link to="/" onClick={() => setPage('muiden')}>oma sivu</Link>  </div>
              }</div>

            </div>
            : <div></div>

          }
        </div>


        <Switch>
          <Route exact path="/users">
            {loggedUser ? <UserList setUser={setUser} /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            <LoginForm setUser={setUser} setLoggedUser={setLoggedUser} setGifts={setGifts} />
          </Route>
          <Route exact path="/">
            {loggedUser ? <Home user={user} gifts={gifts} setGifts={setGifts} /> : <Redirect to="/login" />}
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
