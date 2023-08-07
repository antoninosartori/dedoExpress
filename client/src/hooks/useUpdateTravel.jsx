import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { NotificationContext } from "../context/FloatinNotificationContext"
import { putUpdateTravel } from "../services/travels"
import { useNavigate, useParams } from "react-router-dom"

export default function useUpdateTravel() {
   const { user } = useContext(UserContext)
   const { setFloatingNotification, setIsLoading } = useContext(NotificationContext)
   const params = useParams()
   const { travelId } = params
   const navigate = useNavigate()

   const handleSumbitUpdateTravel = async (data) => {
      console.log({data})
      setIsLoading(true)
      const { from, to, capacity, price, dateTime: date, pet, food, music, luggage, talk } = data
      const features = { pet, food, music, luggage, talk }
      const newTravelInfo = { 
         from: from.trim().toLowerCase(), 
         to: to.trim().toLowerCase(), 
         capacity, 
         price, 
         date, 
         features 
      }

      const token = user === null
         ? null
         : user.token

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
         console.log({updatedTravel})
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