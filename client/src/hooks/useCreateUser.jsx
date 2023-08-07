import { useContext, useState } from "react"
import { createUser } from "../services/login"
import { useNavigate } from "react-router-dom"
import { NotificationContext } from "../context/FloatinNotificationContext"

export default function useCreateUser() {
   const { setFloatingNotification, setIsLoading } = useContext(NotificationContext)
   const [avatarPreview, setAvatarPreview] = useState(null);
   const navigate = useNavigate()


   const handleCreateUser = async (data) => {
      setIsLoading(true)

      const { name, username, email, password, cellphone } = data
      
      const newUser = {
         name: name.trim(), 
         username: username.trim(), 
         email: email.trim().toLowerCase(), 
         password: password.trim(), 
         cellphone: cellphone.trim(), 
         avatarBase64: avatarPreview ?? `https://unavatar.io/${email}`
      }

      try {
         await createUser(newUser)
         navigate('/login')
         setIsLoading(false)
         setFloatingNotification({ 
            message: 'se ha creado tu usuario correctamente', 
            status: 'success', 
            duration: 3000 })
      } catch (err) {
         navigate('/singUp')
         setIsLoading(false)
         console.log(err)
         setFloatingNotification({
            message: 'Puede que tu username, email o celular ya este en uso. Deben ser unicos',
            status: 'error',
            duration: 5000
         })
         return
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
      handleCreateUser, handleAvatarChange, avatarPreview
   }
}