import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { NotificationContext } from "../context/FloatinNotificationContext"
import { putUpdateTravel } from "../services/travels"
import { useNavigate, useParams } from "react-router-dom"
import { formatDateTime } from "../helpers/formatDate"
import { validateDate } from "../helpers/validateDate"

export default function useUpdateTravel() {
   const { user, hasToSplitUI } = useContext(UserContext)
   const { setFloatingNotification, setIsLoading } = useContext(NotificationContext)
   const params = useParams()
   const { travelId } = params
   const navigate = useNavigate()

   const handleSumbitUpdateTravel = async (data) => {
      let newTravelInfo

      if (hasToSplitUI) {
         const { from, to, capacity, price, dateTime, pet, luggage, music, food, talk } = data
         const date = new Date(dateTime).getTime()
         const isFutureDate = validateDate(date)
         if (!isFutureDate) {
            return setFloatingNotification({ message: 'La fecha debe ser futura' })
         }
         const features = { pet, luggage, music, food, talk }
         newTravelInfo = {
            from: from.trim().toLowerCase(),
            to: to.trim().toLowerCase(),
            capacity,
            price,
            date,
            features
         }
      }

      if (!hasToSplitUI) {
         const { from, to, capacity, price, Date, time , pet, food, music, luggage, talk } = data
         const date = formatDateTime(Date,time)
         const isFutureDate = validateDate(date)

         if(!isFutureDate){
            return setFloatingNotification({message: 'La fecha debe ser futura'})
         }

         const features = { pet, food, music, luggage, talk }
         newTravelInfo = { 
            from: from.trim().toLowerCase(), 
            to: to.trim().toLowerCase(), 
            capacity, 
            price, 
            date, 
            features 
         }
      }
      
      setIsLoading(true)

      const token =
         user !== null
            ? user.token
            : ''

      const config = {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }

      try {
         const updatedTravel = await putUpdateTravel(travelId, newTravelInfo, config)
         setIsLoading(false)
         setFloatingNotification({
            message: 'viaje actualizado correctamente',
            status: 'success',
            duration: 3000
         })
         navigate(`/travelDetails/${travelId}`)
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
   
   return {
      handleSumbitUpdateTravel
   }
}