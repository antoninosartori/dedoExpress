import { useContext, useState } from "react"
import { createUser } from "../services/login"
import { useNavigate } from "react-router-dom"
import { NotificationContext } from "../context/FloatinNotificationContext"
import singUpValidation from "../helpers/singUpValidation"

export default function useCreateUser() {
   const { setFloatingNotification, setIsLoading } = useContext(NotificationContext)
   const navigate = useNavigate()
   const [name, setName] = useState('')
   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [repeatedPassword, setRepeatedPassword] = useState('')
   const [cellphone, setCellphone] = useState(0)
   const [avatarBase64, setAvatarBase64] = useState('')

   const handleCreateUser = async (event) => {
      event.preventDefault()
      
      const validationMessages = singUpValidation(name, username, email, password, repeatedPassword, cellphone, avatarBase64)
      if(validationMessages){
         return setFloatingNotification({
            message: validationMessages.message,
            status: 'error',
            duration: 3000
         })
      }

      setIsLoading(true)

      const newUser = {
         name, username, email, password, cellphone, avatarBase64
      }

      try {
         await createUser(newUser)
         navigate('/login')
         setIsLoading(false)
         setFloatingNotification({ message: 'se ha creado tu usuario correctamente', status: 'success', duration: 3000 })
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

   const handleChangeAvatar = (event) => {
      const file = event.target.files[0];
      if(file.size > 400000){
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
            setAvatarBase64(reader.result)
         }
      }
   }

   return {
      handleCreateUser,
      handleChangeName: event => setName(event.target.value),
      handleChangeUsername: event => setUsername(event.target.value),
      handleChangeEmail: event => setEmail(event.target.value),
      handleChangePassword: event => setPassword(event.target.value),
      handleChangeRepeatedPassword: event => setRepeatedPassword(event.target.value),
      handleChangeCellphone: event => setCellphone(event.target.value),
      handleChangeAvatar,
      avatarBase64
   }
}