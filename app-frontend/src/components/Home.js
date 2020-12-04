
import React, {useEffect, useState} from 'react'
import userService from '../services/user'

const Home = ({user}) => {
  const [userp, setUserp]= useState(null);
  
  
  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem('loggedUser')
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //     userService.setToken(user.token)
  //     console.log(user)
  //   }
  // }, [])

  useEffect(() => {
    //console.log(user)
    userService.getOneUser(user.id).then((response) => {
      console.log(response)
      setUserp(response)
      console.log(userp)
    })
  }, [])

return(
<div>
  hello omasivu

  {/* <ul>
        {userp.gifts.map(u =>
          <li key={u.id}>
            {u.name}
          </li>
        )}</ul> */}



</div>
)
}

export default Home