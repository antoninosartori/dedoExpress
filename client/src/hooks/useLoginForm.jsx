import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { loginPost } from "../services/login"
import { Navigate, useNavigate } from "react-router-dom";
import { NotificationContext } from "../context/FloatinNotificationContext";
import { LOCAL_STORAGE_NAME } from "../helpers/consts";

export default function useLoginForm(){
   const { user, setUser } = useContext(UserContext);
   const { setFloatingNotification, setIsLoading} = useContext(NotificationContext)
   
   const navigate = useNavigate()
   
   const handleLogin = async (data) => {
      setIsLoading(true)
      try {
         const { username, password } = data
         const credentials = { username ,password }
         const user = await loginPost(credentials)
         window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(user))
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

   return { handleLogin }
}