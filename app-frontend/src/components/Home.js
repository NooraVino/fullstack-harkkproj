
import React, {useEffect, useState} from 'react'
import user from '../services/user';
import userService from '../services/user'

const Home = ({user, setUser}) => {
  //const [gifts, setGifts] = useState([]);
  
 
  useEffect(() => {
    if (!userService.getToken()) {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        userService.setToken(loggedUser.token)
        setUser(loggedUser)
      }
    } if (user) {
    userService.getOneUser(user.id).then((response) => {
          setUser(response)
    })}
  
  }, [])
 
  
//console.log({user})
return(
<div>
  hello omasivu
{user
?<div>{user.username}</div>
:<div>ei käyttäjiä </div> }





  
  
  {/* <ul>
        {gifts.map(u =>
          <li key={u.id}>
            {u.name}
          </li>
        )}</ul> */}



</div>
)
}

export default Home