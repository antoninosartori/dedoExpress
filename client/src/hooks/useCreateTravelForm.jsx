import { useContext, useEffect } from "react"
import { postNewTravel } from '../services/travels'
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { NotificationContext } from "../context/FloatinNotificationContext"

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
      setIsLoading(true)
      const { from, to, capacity, price, dateTime, pet, luggage, music, food, talk  } = data
      const date = new Date(dateTime).getTime()

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
         setFloatingNotification({
            message: 'no se ha podido crear tu viaje, intenta nuevamente',
            status: 'error',
            duration: 3000
         })
         console.log(err)
         setIsLoading(false)
      }
   }

   return { handleCreateTravel }
}