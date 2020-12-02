import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import UserList from './components/UserList'
import LoginForm from './components/LoginForm'

import userService from './services/user'





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




    <div>


      {user === null ?

        <LoginForm /> :


        <UserList />
      }





    </div>

  )

}



ReactDOM.render(<App />, document.getElementById('root'))
