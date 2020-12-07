import React, { useState } from 'react';

import giftService from '../services/gift'
import {useHistory} from 'react-router-dom'

const NewGiftForm = ({user}) => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  

  const history = useHistory()

  const handleGiftAdd = async (event) => {
    event.preventDefault()

    const id = user.id
    console.log(user.id)
    
    try {
      const gift = await giftService.setNewGift({
        name, content, url, id
      })
      //console.log(gift)

  
      setName('')
      setContent('')
      setUrl('')
      
      history.push('/')
    } catch (exception) {
     
      //setErrorMessage('wrong credentials')
      // setTimeout(() => {
      // setErrorMessage(null)
    } //5000)
  }


  return (
    <form onSubmit={handleGiftAdd}>
      <div>
        name
        <input
          type="text"
          value={name}
          name="name"
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div>
        content
        <input
          type="text"
          value={content}
          name="content"
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>



      <button type="submit">lisää toive</button>
    </form>
  )
}
export default NewGiftForm