import { useContext, useEffect, useState } from "react"
import { postNewTravel } from '../services/travels'
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { NotificationContext } from "../context/FloatinNotificationContext"

export default function useCreateTravelForm() {
   const { user } = useContext(UserContext)
   const { setFloatingNotification, setIsLoading } = useContext(NotificationContext)
   const navigate = useNavigate()
   const fechaActual = new Date()
   const horaActual = fechaActual.toLocaleTimeString('es-AR')
   const fechaHoy = fechaActual.toLocaleDateString('es-AR');
   const [title, setTitle] = useState('')
   const [from, setFrom] = useState('')
   const [to, setTo] = useState('')
   const [capacity, setCapacity] = useState(0)
   const [price, setPrice] = useState(0)
   const [date, setDate] = useState(fechaHoy)
   const [time, setTime] = useState(horaActual)

   useEffect(() => {
      if(user === null){
         navigate('/login')
      } 
   }, [user])

   const handleCreateTravel = async (event) => {
      event.preventDefault()

      setIsLoading(true)

      const { token } = user
      const newTravel = { title, from, to, capacity, price, date, time }

      const config = {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }

      try {
         await postNewTravel(newTravel,config)
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
   return {
      handleCreateTravel,
      handleChangeTitle: event => setTitle(event.target.value),
      handleChangeFrom: event => setFrom(event.target.value),
      handleChangeTo: event => setTo(event.target.value),
      handleChangePrice: event => setPrice(event.target.value),
      handleChangeCapacity: event => setCapacity(event.target.value),
      handleChangeDate: event => setDate(event.target.value),
      handleChangeTime: event => setTime(event.target.value),
   }
}