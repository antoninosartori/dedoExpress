import axios from 'axios'
import { url } from './urls'

const loginPost = async credentials => {
   const { data } = await axios.post(url.loginPost, credentials)
   return data
}

const createUser = async credentials => {
   const { data } = await axios.post(url.createNewUser, credentials)
   return data
}

const getOneUser = async (userId, credentials) => {
   const { data } = await axios.get(`${url.getOneUser}${userId}`, credentials)
   return data
}

const updateAccount = async (userId, body, credentials) => {
   const { data } = await axios.put(`${url.putUser}${userId}`, body ,credentials)
   return data
}

const changePassword = async (userId, body, credentials) => {
   const { data } = await axios.put(`${url.changePassword}${userId}`, body , credentials)
   return data
} 

export { loginPost, createUser, getOneUser, updateAccount, changePassword}