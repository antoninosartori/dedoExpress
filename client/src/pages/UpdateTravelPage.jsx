import './UpdateTravelPage.css'
import { useContext, useEffect, useState } from 'react'
import useGetOneTravel from '../hooks/useGetOneTravel'
import { useForm } from 'react-hook-form'
import IconDiv from '../components/IconDiv'
import Button from '../components/Button'
import chevronDownIcon from '../assets/chevron-down.svg'
import editIcon from '../assets/pencil.svg'
import toIcon from '../assets/to.svg'
import capacityIcon from '../assets/people-fill.svg'
import priceIcon from '../assets/currency-dollar.svg'
import dateTimeIcon from '../assets/time_arrive.svg'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import useUpdateTravel from '../hooks/useUpdateTravel'
import FloatinNotification from '../components/FloatinNotification'

export default function UpdateTravelPage() {
   /* const { user } = useContext(UserContext) */
   const { register, handleSubmit, formState: { errors }, setValue} = useForm()
   const { travel } = useGetOneTravel()
   const { handleSumbitUpdateTravel } = useUpdateTravel()
   /* const navigate = useNavigate() */
   
   // verificar si el usuario es el mismoq que creo ya que pueden entrar desde la url para modificar un viaje cualquiera
   /* useEffect(() => {
      const userIdFromTravel = travel.user ? travel.user[0]._id : null
      if(user.userId !== userIdFromTravel){
         return navigate('/')
      }
   }, [travel._id]) */
   
   useEffect(() => {
      setValue('from', travel.from)
      setValue('to', travel.to)
      setValue('capacity', travel.capacity)
      setValue('price', travel.price)
   }, [travel._id])

   return (
      <main className='container updateTravelPage'>
         <div className='updateTravel-header'>
            <img className='icon' src={editIcon} alt="editar viaje" />
            <h2 className='title'>Modificar viaje</h2>
         </div>
         
         <form onSubmit={handleSubmit(handleSumbitUpdateTravel)}>
            <div className="formGroup">
               <label htmlFor="from">Lugar de salida:</label>
               <input 
                  {...register('from', { required: true})}
                  type="text"/>
            </div>

            < IconDiv icon1={chevronDownIcon} icon2={toIcon} />
            
            <div className="formGroup">
               <label htmlFor="to">Destino:</label>
               <input 
                  {...register('to', { required: true})}
                  type="text"/>
            </div>
            
            < IconDiv icon1={chevronDownIcon} icon2={capacityIcon} />

            <div className="formGroup">
               <label htmlFor="capacity">Lugares disponibles:</label>
               <input 
                  {...register('capacity', { required: true})}
                  type="number"/>
            </div>

            < IconDiv icon1={chevronDownIcon} icon2={priceIcon} />

            <div className="formGroup">
               <label htmlFor="price">Precio por persona:</label>
               <input 
                  {...register('price', { required: true})}
                  type="number"/>
            </div>

            < IconDiv icon1={chevronDownIcon} icon2={dateTimeIcon} />

            <div className="formGroup">
               <label htmlFor="dateTime">Fecha y hora de salida:</label>
               <input 
                  {...register('dateTime', { required: true})}
                  type="datetime-local"/>
            </div>
            <div className="formGroup">
               <Button>Modificar viaje</Button>
            </div>
         </form>

         {errors.dateTime?.type && < FloatinNotification message='Por favor, confirma la fecha y hora de salida' status='warning' /> }

      </main>
   )
}
