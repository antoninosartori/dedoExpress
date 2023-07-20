import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import { loginPost } from "../services/login"
import { Navigate, useNavigate } from "react-router-dom";
import { NotificationContext } from "../context/FloatinNotificationContext";

export default function useLoginForm(){
   const { user, setUser } = useContext(UserContext);
   const { setFloatingNotification, setIsLoading} = useContext(NotificationContext)
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate()
   
   const handleSubmit = async (event) => {
      event.preventDefault()
      
      setIsLoading(true)
     
      try {
         const credentials = { username,password }
         const user = await loginPost(credentials)
         window.localStorage.setItem('userFromDedoUp', JSON.stringify(user))
         setUser(user)
         setIsLoading(false)
         navigate('/')
         setFloatingNotification({message: 'sesion iniciada correctamente', status: 'success', duration: 3000})
      } catch (err) {
         setIsLoading(false)
         setFloatingNotification({message: err.response.data.error, status: 'error', duration: 3000})
         console.log(err)
      }
   }

   if(user){
      <Navigate to='/' />
   }

   return {
      username,
      password,
      handleChangeUsername: event => setUsername(event.target.value),
      handleChangePassword: event => setPassword(event.target.value),
      handleSubmit
    }
}