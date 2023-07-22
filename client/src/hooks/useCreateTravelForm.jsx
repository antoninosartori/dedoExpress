import { useContext, useEffect, useState } from "react"
import { postNewTravel } from '../services/travels'
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { NotificationContext } from "../context/FloatinNotificationContext"

export default function useCreateTravelForm() {
   const { user } = useContext(UserContext)
   const { setFloatingNotification, setIsLoading } = useContext(NotificationContext)
   const navigate = useNavigate()
   const [title, setTitle] = useState('') /* 👉 debe ser mayor a 5 letras, menor a 20 o 30 caracteres. */
   const [from, setFrom] = useState('')
   const [to, setTo] = useState('')
   const [capacity, setCapacity] = useState(0)
   const [price, setPrice] = useState(0)
   const [date, setDate] = useState('')
   const [time, setTime] = useState('')

   const dateTime = new Date()
   const thisYear = dateTime.getFullYear()
   const thisMonth = dateTime.getMonth() + 1
   const thisDay = dateTime.getDate()

   useEffect(() => {
      if (user === null) {
         navigate('/login')
      }
   }, [user])

   const handleCreateTravel = async (event) => {
      event.preventDefault()
      const regex = /^[0-9]*$/
      if (!title) {
         setFloatingNotification({
            message: 'debes ponerle un titulo a tu viaje',
            status: 'error',
            duration: 3000
         })
         return
      } 
      else if(regex.test(title)){
         setFloatingNotification({
            message: 'el titulo no puede ser solo numeros',
            status: 'error',
            duration: 3000
         })
         return
      }
      else if (title.length < 5){
         setFloatingNotification({
            message: 'pon un titulo mas largo',
            status: 'error',
            duration: 3000
         })
         return
      } 
      else if(title.length > 20){
         setFloatingNotification({
            message: 'el titulo de tu viaje es muy largo',
            status: 'error',
            duration: 3000
         })
         return
      }
      else if(!from || from.length < 3){
         setFloatingNotification({
            message: 'completa el lugar de salida o es muy corto',
            status: 'error',
            duration: 3000
         })
         return
      }
      else if(regex.test(from)){
         setFloatingNotification({
            message: 'el campo de salida no puede ser solo numeros',
            status: 'error',
            duration: 3000
         })
         return
      }
      else if(from.length > 20){
         setFloatingNotification({
            message: 'el lugar de salida de tu viaje es muy largo',
            status: 'error',
            duration: 3000
         })
         return
      }
      else if(!to || to.length < 3){
         setFloatingNotification({
            message: 'completa el lugar de destino o es muy corto',
            status: 'error',
            duration: 3000
         })
         return
      }
      else if(regex.test(to)){
         setFloatingNotification({
            message: 'el campo de destino no puede ser solo numeros',
            status: 'error',
            duration: 3000
         })
         return
      }
      else if(to.length > 20){
         setFloatingNotification({
            message: 'el lugar de destino de tu viaje es muy largo',
            status: 'error',
            duration: 3000
         })
         return
      }
      else if(!capacity){
         setFloatingNotification({
            message: 'completa la cantidad de lugares disponibles para viajar',
            status: 'error',
            duration: 3000
         })
         return
      }
      else if(capacity >= 11){
         setFloatingNotification({
            message: 'El numero de capacidad puede ser entre 1 a 10 lugares',
            status: 'error',
            duration: 3000
         })
         return
      }
      else if(!price){
         setFloatingNotification({
            message: 'Ingresa un precio a cobrar por persona',
            status: 'error',
            duration: 3000
         })
         return
      }
      else if(price.length >= 5){
         setFloatingNotification({
            message: 'Ingresa un precio menor a 5 caracteres',
            status: 'error',
            duration: 3000
         })
         return
      } 
      else if(!date){
         setFloatingNotification({
            message: 'Ingresa un dia de salida',
            status: 'error',
            duration: 3000
         })
         return
      }
      else if(Number(date.split('-')[0]) !== thisYear){
         setFloatingNotification({
            message: 'El año de la salida tiene que ser el actual',
            status: 'error',
            duration: 3000
         })
         return
      }
      else if(
         Number((date.split('-')[1]) < thisMonth )
         || (Number(date.split('-')[1]) === thisMonth && Number(date.split('-')[2]) < thisDay)){
         setFloatingNotification({
            message: 'la fecha de salida debe ser a futuro',
            status: 'error',
            duration: 3000
         })
         return
      }
      else if(!time){
         setFloatingNotification({
            message: 'Ingresa una hora de salida',
            status: 'error',
            duration: 3000
         })
         return
      }


      setIsLoading(true)

      const { token } = user
      const newTravel = { title, from, to, capacity, price, date }

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