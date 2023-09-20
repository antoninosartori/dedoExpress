import { useContext, useEffect } from "react"
import { postNewTravel } from '../services/travels'
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { NotificationContext } from "../context/FloatinNotificationContext"
import { formatDateTime } from "../helpers/formatDate"
import { validateDate } from '../helpers/validateDate'
import { CITIES_ENDSWITH_STRING, LOCAL_STORAGE_NAME } from "../helpers/consts"

export default function useCreateTravelForm() {
   const { user, setUser } = useContext(UserContext)
   const { setFloatingNotification, setIsLoading } = useContext(NotificationContext)

   const navigate = useNavigate()

   useEffect(() => {
      if (user === null) {
         navigate('/login')
      }
   }, [user])

   const handleCreateTravel = async (data) => {
      const { from, to, capacity, price, Date, time, pet, luggage, music, food, talk } = data
      const date = formatDateTime(Date, time)
      const isFutureDate = validateDate(date)

      if (!isFutureDate) {
         return setFloatingNotification({ message: 'La fecha puede ser hasta 30 días futuros al día actual' })
      }

      /* if(!from.toLowerCase().endsWith(CITIES_ENDSWITH_STRING) || !to.toLowerCase().endsWith(CITIES_ENDSWITH_STRING)){
         return setFloatingNotification({ message: 'Las ciudades de origen y destino tienen que estar en la lista.'})
      } */

      const features = { pet, luggage, music, food, talk }
      const newTravel = {
         from: from.trim().toLowerCase(),
         to: to.trim().toLowerCase(),
         capacity: Number(capacity),
         price: Number(price),
         date,
         features
      }
      console.log({ newTravel })
      setIsLoading(true)

      const { token } = user

      const config = {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }

      try {
         await postNewTravel(newTravel, config)
         setFloatingNotification({
            message: 'viaje creado correctamente',
            status: 'success',
            duration: 3000
         })
         navigate('/')
      } catch (err) {
         // token expirado
         if (err.response.data.error === "jwt expired") {
            setFloatingNotification({
               message: 'por favor, inicia sesion nuevamente',
               status: 'error',
               duration: 3000
            })
            window.localStorage.removeItem(LOCAL_STORAGE_NAME)
            setUser(null)
            return navigate('/login')
         }
         setFloatingNotification({
            message: 'no se ha podido crear tu viaje, intenta nuevamente',
            status: 'error',
            duration: 3000
         })
         console.log(err)
      } finally {
         setIsLoading(false)
      }
   }

   return { handleCreateTravel }
}