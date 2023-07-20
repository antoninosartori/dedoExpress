import { useContext, useState } from "react"
import { createUser } from "../services/login"
import { useNavigate } from "react-router-dom"
import { NotificationContext } from "../context/FloatinNotificationContext"


export default function useCreateUser() {
   const { setFloatingNotification, setIsLoading } = useContext(NotificationContext)
   const navigate = useNavigate()
   const [name, setName] = useState('')
   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [cellphone, setCellphone] = useState(0)

   const handleCreateUser = async (event) => {
      event.preventDefault()
      setIsLoading(true)

      const newUser = {
         name, username, email, password, cellphone
      }

      try {
         await createUser(newUser)
         navigate('/login')
         setIsLoading(false)
         setFloatingNotification({message: 'se ha creado tu usuario correctamente', status: 'success', duration: 3000})
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
   return {
      handleCreateUser,
      handleChangeName: event => setName(event.target.value),
      handleChangeUsername: event => setUsername(event.target.value),
      handleChangeEmail: event => setEmail(event.target.value),
      handleChangePassword: event => setPassword(event.target.value),
      handleChangeCellphone: event => setCellphone(event.target.value),
   }
}