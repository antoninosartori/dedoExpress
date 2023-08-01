import './UpdateTravelPage.css'
import { useEffect } from 'react'
import useUpdateTravel from '../hooks/useUpdateTravel'
import useGetOneTravel from '../hooks/useGetOneTravel'
import { useForm } from 'react-hook-form'
import { validateDate } from '../helpers/validateDate'
import IconDiv from '../components/IconDiv'
import FloatinNotification from '../components/FloatinNotification'
import Button from '../components/Button'
import chevronDownIcon from '../assets/chevron-down.svg'
import editIcon from '../assets/pencil.svg'
import toIcon from '../assets/to.svg'
import capacityIcon from '../assets/people-fill.svg'
import priceIcon from '../assets/currency-dollar.svg'
import dateTimeIcon from '../assets/time_arrive.svg'

export default function UpdateTravelPage() {
   const { register, handleSubmit, formState: { errors }, setValue } = useForm()
   const { travel } = useGetOneTravel()
   const { handleSumbitUpdateTravel } = useUpdateTravel()

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
                  {...register('from', {
                     required: 'Completa el lugar de salida con una ciudad',
                     maxLength: { value: 30, message: 'La ciudad de salida debe ser menor a 30 caracteres' },
                     minLength: { value: 3, message: 'El nombre de la ciudad de salida debe ser mayor a 3 caracteres' }
                  })}
                  type="text" autoComplete='off' />
            </div>
            {errors.from?.message && < FloatinNotification message={errors.from.message} />}

            < IconDiv icon1={chevronDownIcon} icon2={toIcon} />

            <div className="formGroup">
               <label htmlFor="to">Destino:</label>
               <input
                  {...register('to', {
                     required: 'Completa la ciudad de destino',
                     minLength: { value: 3, message: 'La ciudad de destino debe ser mayor a 3 caracteres' },
                     maxLength: { value: 30, message: 'La ciudad de destino debe ser menor a 30 caracteres' }
                  })}
                  type="text" autoComplete='off' />
            </div>
            {errors.to?.message && < FloatinNotification message={errors.to.message} />}

            < IconDiv icon1={chevronDownIcon} icon2={capacityIcon} />

            <div className="formGroup">
               <label htmlFor="capacity">Lugares disponibles:</label>
               <input
                  {...register('capacity', {
                     required: 'Completa el campo de lugares disponibles',
                     min: { value: 1, message: 'El minimo de lugares disponibles es 1' },
                     max: { value: 9, message: 'El maximo de lugares disponibles es de 9' }
                  })}
                  type="number" autoComplete='off' min={1} />
            </div>
            {errors.capacity?.message && < FloatinNotification message={errors.capacity.message} />}

            < IconDiv icon1={chevronDownIcon} icon2={priceIcon} />

            <div className="formGroup">
               <label htmlFor="price">Precio por persona:</label>
               <input
                  {...register('price', {
                     required: 'Completa el campo del precio por persona',
                     max: { value: 50000, message: 'El precio maximo es de 50.000' },
                     min: 0
                  })}
                  type="number" autoComplete='off' min={0} />
            </div>
            {errors.price?.message && < FloatinNotification message={errors.price.message} />}

            < IconDiv icon1={chevronDownIcon} icon2={dateTimeIcon} />

            <div className="formGroup">
               <label htmlFor="dateTime">Fecha y hora de salida:</label>
               <input
                  {...register('dateTime', {
                     required: 'Por favor, confirma la fecha y hora de salida',
                     validate: value => validateDate(value) || 'Ingresa una fecha futura'
                  })}
                  type="datetime-local" />
            </div>
            {errors.dateTime?.message && < FloatinNotification message={errors.dateTime.message} />}

            <div className="formGroup">
               <Button>Modificar viaje</Button>
            </div>

         </form>
      </main>
   )
}
