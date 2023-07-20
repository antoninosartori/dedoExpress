import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"
import { NotificationContext } from "../context/FloatinNotificationContext"
import { getOneUser, updateAccount } from "../services/login"

export default function useGetOneUser() {
   const { user, setUser } = useContext(UserContext)
   const { setFloatingNotification, setIsLoading } = useContext(NotificationContext)
   const params = useParams();
   const { userId } = params
   const [account, setAccount] = useState({})
   const [ name, setName] = useState('')
   const [ username, setUsername] = useState('')
   const [ email, setEmail] = useState('')
   const [ cellphone, setCellphone] = useState('')
   const navigate = useNavigate()

   useEffect(() => {
      if (user === null) {
         navigate('/login')
      }
   }, [user])

   useEffect(() => {
      setIsLoading(true)
      const verification = userId === user.userId
      if(!verification){
         return setFloatingNotification({ message: 'no tienes permiso para hacer esto', status: 'error', duration: 5000 })
      }

      const token =
         user !== null
            ? user.token
            : null

      const credentials = {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }
      
      getOneUser(userId, credentials)
         .then(data => {
            const { name, username, email, cellphone } = data
            setAccount(data)
            setName(name)
            setUsername(username)
            setEmail(email)
            setCellphone(cellphone)
         })
         .catch(err => {
            setFloatingNotification({ message: err.response.data, status: 'error', duration: 5000 })
            console.log(err)
         })
         .finally(() => setIsLoading(false))
   }, [user])

   const handleSubmitUpdateAccount = async (event) => {
      event.preventDefault()
      
      setIsLoading(true)

      const newUserInfo = {
         name, username , email, cellphone
      }

      const token = 
         user !== null 
         ? user.token
         : ''

      if(!token) {
         return  setFloatingNotification({
            message: 'No hemos podido actualizar tu usuario, intenta nuevamente',
            status: 'error',
            duration: 3000
         })
      }

      const credentials = {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }

      try {
         const newUser = await updateAccount(userId, newUserInfo, credentials)
         setAccount(newUser)
         setUser({...user, name: name, username: username})
         setIsLoading(false)
         setFloatingNotification({
            message: 'Has actualizado tu usuario correctamente',
            status: 'success',
            duration: 3000
         })
      } catch (err) {
         console.log(err)
         setIsLoading(false)
         setFloatingNotification({
            message: 'No hemos podido actualizar tu usuario, intenta nuevamente',
            status: 'error',
            duration: 3000
         })
      }
   }

   return {
      name, username, email, cellphone,
      handleChangeName: event => setName(event.target.value),
      handleChangeUsername: event => setUsername(event.target.value), 
      handleChangeEmail: event => setEmail(event.target.value), 
      handleChangeCellphone: event => setCellphone(event.target.value), 
      account, 
      handleSubmitUpdateAccount
   }
}
