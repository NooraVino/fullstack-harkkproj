import React, { useState } from 'react';
import loginService from '../services/login'
import userService from '../services/user'
import {useHistory} from 'react-router-dom'

const LoginForm = ({setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)

  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
     
      userService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      history.push('/')
    } catch (exception) {
     
      //setErrorMessage('wrong credentials')
      // setTimeout(() => {
      // setErrorMessage(null)
    } //5000)
  }


  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}
export default LoginForm