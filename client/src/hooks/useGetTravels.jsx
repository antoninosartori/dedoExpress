import { useContext, useState } from "react"
import { deleteOneTravelById, getAllTravels, getAllTravelsWithParams } from "../services/travels"
import { useLocation, useNavigate } from "react-router-dom"
import { TravelContext } from "../context/TravelsContext";
import { NotificationContext } from "../context/FloatinNotificationContext";
import { UserContext } from "../context/UserContext";

export default function useGetTravels() {
   const { user } = useContext(UserContext)
   const { setAllTravels } = useContext(TravelContext)
   const { setFloatingNotification, setIsLoading } = useContext(NotificationContext)
   const navigate = useNavigate();

   // SearchFormHome component 👇
   const [fromInput, setFromInput] = useState('')
   const [toInput, setToInput] = useState('')
   const location = useLocation();
   const token = user ? user.token : ''

   const getInitialAllTravel = () => {
      setIsLoading(true)

      getAllTravels({})
         .then(data => {
            setAllTravels(data.reverse())
         })
         .catch(err => {
            console.log(err)
            setFloatingNotification({ 
               message: err.response.data.error,
               status: 'error',
               duration: 3000 
            })
         })
         .finally(() => setIsLoading(false))
   }

   const validateParams = (from, to) => {
      let path = '?'
      if (from && !to) {
         path = (`${path}from=${from}`)
         location.search = path
         navigate(path)
      }
      else if (!from && to) {
         path = (`${path}to=${to}`)
         location.search = path
         navigate(path)
      } else if (from && to) {
         path = (`${path}from=${from}&to=${to}`)
         location.search = path
         navigate(path)
      } else {
         location.search = path
         navigate(path)
      }
   }

   const handleSubmitSearch = (event) => {
      event.preventDefault()

      validateParams(fromInput, toInput)
      const params = location.search
      setIsLoading(true)
      getAllTravelsWithParams(params)
         .then(data => {
            setAllTravels(data)
            setIsLoading(false)
         })
         .catch(err => {
            console.log(err)
            setFloatingNotification({
               message: err.response.data.error,
               status: 'error',
               duration: 3000
            })
         })
         .finally(() => setIsLoading(false))
   }

   const handleTravelDelete = async (travelId) => {
      setIsLoading(true)

      const config = {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }

      try {
         await deleteOneTravelById(travelId, config)
         await getInitialAllTravel()
         setFloatingNotification({
            message: 'Viaje eliminado',
            status: 'success',
            delay: 3000
         })
         navigate('/')
      } catch (err) {
         console.log(err)
         setFloatingNotification({ 
            message: 'Lo siento, no pudimos borrar tu viaje. Racarga e intenta de nuevo',
            status: 'error',
            delay: 5000 
         })
         navigate('/')
      }
   }

   return {
      handleSubmitSearch,
      handleChangeFromInput: event => setFromInput(event.target.value),
      handleChangeToInput: event => setToInput(event.target.value),
      getInitialAllTravel,
      handleTravelDelete
   }
}