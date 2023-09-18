import axios from 'axios'
import { url } from './urls'

const sendMessage = async (bodyMessage) => {
   const { data } = await axios.post(url.sendMessage, bodyMessage)
   return data
}

export { sendMessage }