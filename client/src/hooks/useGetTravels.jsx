import { useContext, useState } from "react"
import { deleteOneTravelById, getAllTravels, getAllTravelsWithParams } from "../services/travels"
import { useLocation, useNavigate } from "react-router-dom"
import { TravelContext } from "../context/TravelsContext";
import { NotificationContext } from "../context/FloatinNotificationContext";
import { UserContext } from "../context/UserContext";
import { LOCAL_STORAGE_NAME } from "../helpers/consts";

export default function useGetTravels() {
   const { user, setUser } = useContext(UserContext)
   const { setAllTravels } = useContext(TravelContext)
   const { setFloatingNotification, setIsLoading } = useContext(NotificationContext)
   const navigate = useNavigate();

   // SearchFormHome component 👇
   const [fromInput, setFromInput] = useState('')
   const [toInput, setToInput] = useState('')
   const location = useLocation();
   const token = user ? user.token : ''

   const getInitialAllTravel = async () => {
      setIsLoading(true)

      const data = await getAllTravels({})
         .then(data => {
            setAllTravels(data.sort((a,b) => b.date - a.date))
            return data
         })
         .catch(err => {
            if(err.response?.data?.error === "jwt expired"){
               setFloatingNotification({
                  message: 'por favor, inicia sesion nuevamente',
                  status: 'error',
                  duration: 3000
               })
               window.localStorage.removeItem(LOCAL_STORAGE_NAME)
               setUser(null)
            }
            console.log(err)
            setFloatingNotification({ 
               message: 'Error al traer todos los viajes',
               status: 'error',
               duration: 3000 
            })
         })
         .finally(() => setIsLoading(false))
      return data
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
      setIsLoading(true)
      validateParams(fromInput, toInput)
      const params = location.search
      
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
      } finally{
         setIsLoading(false)
      }
   }

   return {
      handleSubmitSearch,
      handleChangeFromInput: event => setFromInput(event.target.value.toLowerCase()),
      handleChangeToInput: event => setToInput(event.target.value.toLowerCase()),
      getInitialAllTravel,
      handleTravelDelete
   }
}