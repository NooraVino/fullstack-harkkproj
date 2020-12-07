import axios from 'axios'
import userService from '../services/user'
const baseUrl = '/api/gifts'


const setNewGift = async (gift) => {
  const config = {
    headers: { Authorization: userService.getToken() },
  }
  console.log(gift)
  const response = await axios.post(baseUrl, gift, config)
  console.log(response.data)
  return response.data
}



export default { setNewGift }