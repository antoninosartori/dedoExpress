import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { NotificationContext } from "../context/FloatinNotificationContext"
import { putUpdateTravel } from "../services/travels"
import { useNavigate, useParams } from "react-router-dom"
import { formatDateTime } from "../helpers/formatDate"
import { validateDate } from "../helpers/validateDate"
import { LOCAL_STORAGE_NAME } from "../helpers/consts"

export default function useUpdateTravel() {
   const { user, setUser } = useContext(UserContext)
   const { setFloatingNotification, setIsLoading } = useContext(NotificationContext)
   const params = useParams()
   const { travelId } = params
   const navigate = useNavigate()

   const handleSumbitUpdateTravel = async (data) => {

         const { from, to, capacity, price, Date, time , pet, food, music, luggage, talk } = data
         const date = formatDateTime(Date,time)
         const isFutureDate = validateDate(date)

         if(!isFutureDate){
            return setFloatingNotification({message: 'La fecha puede ser hasta 30 días futuros al día actual'})
         }

         const features = { pet, food, music, luggage, talk }
         const newTravelInfo = { 
            from: from.trim().toLowerCase(),
            to: to.trim().toLowerCase(),
            capacity: Number(capacity),
            price: Number(price),
            date, 
            features 
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
         await putUpdateTravel(travelId, newTravelInfo, config)
         setFloatingNotification({
            message: 'viaje actualizado correctamente',
            status: 'success',
            duration: 3000
         })
         navigate(`/travelDetails/${travelId}`)
      } catch (err) {
         if(err.response.data.error === "jwt expired"){
            setFloatingNotification({
               message: 'por favor, inicia sesion nuevamente',
               status: 'error',
               duration: 3000
            })
            window.localStorage.removeItem(LOCAL_STORAGE_NAME)
            setUser(null)
            return navigate('/login')
         }
         const errorMessage = err?.response?.data?.error ?? 'Lo siento, ha ocurrido un error'
         setFloatingNotification({
            message: errorMessage,
            status: 'error',
            duration: 3000
         })
         console.log(err)
      } finally {
         setIsLoading(false)
      }
   }
   
   return {
      handleSumbitUpdateTravel
   }
}