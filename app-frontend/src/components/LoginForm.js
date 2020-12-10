import React, { useState } from 'react';
import loginService from '../services/login'
import userService from '../services/user'
import { useHistory } from 'react-router-dom'

const LoginForm = ({ setUser, setLoggedUser, setGifts, setUsers }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


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
      userService.getOneUser(user.id).then((response) => {
        setUser(response)
        setGifts(response.gifts)
      })
      userService.getUsers().then((response) => {
        setUsers(response.filter(u => u.id !== user.id))
      })

      //console.log(user.id)
      setLoggedUser(user)
      setUsername('')
      setPassword('')
      history.push('/')
    } catch (exception) {
      setErrorMessage('Väärä käyttäjätunnus tai salasana')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }

  }
  return (
    <div className="form">
      <div className="error">{errorMessage}</div>
      <form onSubmit={handleLogin}>
        <div>
          Käyttäjänimi
        <input
            className="input"
            placeholder="käyttäjänimi"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Salasana
        <input
            className="input"
            placeholder="salasana"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="button" type="submit">Kirjaudu sisään</button>
      </form>
    </div>
  )
}
export default LoginForm