import { useContext, useEffect } from "react"
import { postNewTravel } from '../services/travels'
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { NotificationContext } from "../context/FloatinNotificationContext"
import { formatDateTime } from "../helpers/formatDate"
import { validateDate } from '../helpers/validateDate'

export default function useCreateTravelForm() {
   const { user } = useContext(UserContext)
   const { setFloatingNotification, setIsLoading } = useContext(NotificationContext)
   
   const navigate = useNavigate()
   
   useEffect(() => {
      if (user === null) {
         navigate('/login')
      }
   }, [user])

   const handleCreateTravel = async (data) => {
      const { from, to, capacity, price, Date, time, pet, luggage, music, food, talk  } = data
      const date = formatDateTime(Date,time)
      const isFutureDate = validateDate(date)

      if(!isFutureDate){
         return setFloatingNotification({message: 'La fecha debe ser futura'})
      }

      setIsLoading(true)

      const { token } = user

      const features = { pet, luggage, music, food, talk}
      const newTravel = { 
         from: from.trim().toLowerCase(), 
         to: to.trim().toLowerCase(), 
         capacity, 
         price, 
         date, 
         features
      }

      const config = {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }

      try {
         await postNewTravel(newTravel, config)
         setIsLoading(false)
         setFloatingNotification({
            message: 'viaje creado correctamente',
            status: 'success',
            duration: 3000
         })
         navigate('/')
      } catch (err) {
         /* setFloatingNotification({
            message: 'no se ha podido crear tu viaje, intenta nuevamente',
            status: 'error',
            duration: 3000
         }) */
         setFloatingNotification({
            message: err.response.data || err.message,
            status: 'error',
            duration: 3000
         })
         console.log(err)
         setIsLoading(false)
      }
   }

   return { handleCreateTravel }
}