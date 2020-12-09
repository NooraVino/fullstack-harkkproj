import React, { useState } from 'react';
import giftService from '../services/gift'
import { useHistory } from 'react-router-dom'

const NewGiftForm = ({ user, gifts, setGifts }) => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  const history = useHistory()

  const handleGiftAdd = async (event) => {
    event.preventDefault()

    const id = user.id

    try {
      const gift = await giftService.setNewGift({
        name, content, url, id
      })

      setName('')
      setContent('')
      setUrl('')
      setGifts(gifts.concat(gift))
      history.push('/')
    } catch (exception) {

      setErrorMessage('Toivetta ei voi lisätä ilman nimeä!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }


  return (
    <div className="form">
      <div className="error">{errorMessage}</div>
      <form onSubmit={handleGiftAdd}>
        <div>
          Lahjatoive
        <input
            className="input"
            placeholder="Lahjatoiveen nimi.."
            type="text" 
            value={name}
            name="name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Kuvaus:
        <input
            className="input"
            placeholder="Vapaamuotoinen kuvaus.."
            type="text"
            value={content}
            name="content"
            onChange={({ target }) => setContent(target.value)}
          />
        </div>
        <div >
          Linkki:
        <input
            className="input"
            placeholder="Mahdollisia linkkejä.."
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>



        <button className="button" type="submit">lisää toive</button>
      </form>
    </div>
  )
}
export default NewGiftForm