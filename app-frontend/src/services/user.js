import axios from 'axios'
const baseUrl = '/api/users'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`

}

const getToken = () => token

const getUsers = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)

  return request.then(response => response.data)
}

const getOneUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id} `)

  return response.data

}

export default { getUsers, setToken, getOneUser, getToken }