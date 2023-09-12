import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"
import { NotificationContext } from "../context/FloatinNotificationContext"
import { getOneUser, updateAccount } from "../services/login"
import { blobToBase64, urlToBlob } from "../helpers/urlBlob"
import { LOCAL_STORAGE_NAME } from "../helpers/consts"

export default function useGetOneUser() {
   const { user, setUser } = useContext(UserContext)
   const { setFloatingNotification, setIsLoading } = useContext(NotificationContext)
   const params = useParams();
   const { userId } = params
   const [account, setAccount] = useState([])
   const [avatarPreview, setAvatarPreview] = useState('');
   const navigate = useNavigate()

   useEffect(() => {
      if (user === null) {
         navigate('/login')
      }
   }, [user])

   useEffect(() => {
      setIsLoading(true)
      const verification = userId === user.userId
      if (!verification) {
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
            const { avatar } = data
            setAccount(data)
            return urlToBlob(avatar.url)
         })
         .then(blob => {
            return blobToBase64(blob)
         })
         .then(base64 => {
            setAvatarPreview(base64)
         })
         .catch(err => {
            if(err?.config?.xsrfHeaderName === "X-XSRF-TOKEN"){
               window.localStorage.removeItem(LOCAL_STORAGE_NAME)
               return navigate('/login')
            }
            setFloatingNotification({ message: err?.response, status: 'error', duration: 5000 })
            console.log(err)
         })
         .finally(() => setIsLoading(false))
   }, [user])

   const handleSubmitUpdateAccount = async (data) => {
      setIsLoading(true)

      const { name, username, email, cellphone } = data

      const newUserInfo = {
         name: name.trim(), 
         username: username.trim(), 
         email: email.toLowerCase(), 
         cellphone, 
         avatarBase64: avatarPreview
      }

      const token =
         user !== null
            ? user.token
            : ''

      if (!token) {
         return setFloatingNotification({
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
         await setUser({ ...user, name: name, username: username, avatar: newUser.avatar })
         setFloatingNotification({
            message: 'Has actualizado tu usuario correctamente',
            status: 'success',
            duration: 3000
         })
         navigate('/')
      } catch (err) {
         if(err.response.data.error === "jwt expired"){
            setFloatingNotification({
               message: 'por favor, inicia sesion nuevamente',
               status: 'error',
               duration: 3000
            })
            window.localStorage.removeItem(LOCAL_STORAGE_NAME)
            setUser(null)
         }
         setFloatingNotification({
            message: 'No hemos podido actualizar tu usuario, intenta nuevamente',
            status: 'error',
            duration: 3000
         })
         console.error(err)
      } finally{
         setIsLoading(false)
      }
   }

   const handleAvatarChange = (event) => {
      const file = event.target.files[0];
      if (file && file.size > 400000) {
         setFloatingNotification({
            message: 'La imagen es demasiado grande, prueba con otra mas pequeña',
            status: 'error',
            duration: 5000
         })
         return
      }

      const reader = new FileReader();

      if (file) {
         reader.readAsDataURL(file)
         reader.onloadend = () => {
            setAvatarPreview(reader.result)
         }
      }
   }

   return {
      account,
      handleSubmitUpdateAccount,
      handleAvatarChange,
      avatarPreview
   }
}
