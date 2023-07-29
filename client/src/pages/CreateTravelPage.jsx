import './CreateTravelPage.css'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useCreateTravelForm from '../hooks/useCreateTravelForm'
import { NotificationContext } from '../context/FloatinNotificationContext'
import { UserContext } from '../context/UserContext'
import Button from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'
import FloatinNotification from '../components/FloatinNotification'
import IconDiv from '../components/IconDiv'
import fromIcon from '../assets/from.svg'
import toIcon from '../assets/to.svg'
import capacityIcon from '../assets/people-fill.svg'
import priceIcon from '../assets/currency-dollar.svg'
import titleIcon from '../assets/write.svg'
import chevronDown from '../assets/chevron-down.svg'

export default function CreateTravelPage() {
   const { user } = useContext(UserContext)
   const { handleCreateTravel } = useCreateTravelForm()
   const { floatingNotification, isLoading } = useContext(NotificationContext)
   const navigate = useNavigate()
   const { register, handleSubmit, formState: { errors } } = useForm()

   if (user === null) {
      navigate('/login')
   }

   return (
      <main className='container createTravel'>
         {isLoading && < LoadingSpinner text='creando viaje...' />}

         {floatingNotification.message &&
            < FloatinNotification
               message={floatingNotification.message}
               duration={floatingNotification.duration}
            />
         }
         <form onSubmit={handleSubmit(handleCreateTravel)}>

            <img className='header-image' src={titleIcon} alt="icono del form" />
            <h2>Crea tu viaje</h2>

            <div className="formGroup">
               <img className='icon' src={fromIcon} alt="desde donde" />
               <input
                  {...register('from', {
                     required: 'Completa el lugar de salida con una ciudad',
                     maxLength: { value: 30, message: 'La ciudad de salida debe ser menor a 30 caracteres' },
                     minLength: { value: 3, message: 'El nombre de la ciudad de salida debe ser mayor a 3 caracteres' }
                  })} type='text' placeholder='¿De donde salis?' autoComplete='off' />
            </div>
            {errors.from?.message && < FloatinNotification message={errors.from.message} />}

            <IconDiv icon1={chevronDown} justify='center' />

            <div className="formGroup">
               <img className='icon' src={toIcon} alt="hasta donde" />
               <input
                  {...register('to', {
                     required: 'Completa la ciudad de destino',
                     minLength: { value: 3, message: 'La ciudad de destino debe ser mayor a 3 caracteres' },
                     maxLength: { value: 30, message: 'La ciudad de destino debe ser menor a 30 caracteres' }
                  })} type="text" placeholder='¿Donde vas?' autoComplete='off'
               />
            </div>
            {errors.to?.message && < FloatinNotification message={errors.to.message} />}

            <IconDiv icon1={chevronDown} justify='center' />

            <div className="formGroup">
               <img className='icon' src={capacityIcon} alt="cuantos podes llevar" />
               <input
                  {...register('capacity', {
                     required: 'Completa el campo de lugares disponibles',
                     min: { value: 1, message: 'El minimo de lugares disponibles es 1'},
                     max: { value: 9, message: 'El maximo de lugares disponibles es de 9'}
                  })} type="number" placeholder='¿Lugares disponibles?' autoComplete='off' min={1}
               />
            </div>
            {errors.capacity?.message && < FloatinNotification message={errors.capacity.message} />}

            <IconDiv icon1={chevronDown} justify='center' />

            <div className="formGroup">
               <img className='icon' src={priceIcon} alt="precio por persona" />
               <input
                  {...register('price', {
                     required: 'Completa el campo del precio por persona',
                     max: {value: 50000, message: 'El precio maximo es de 50.000'},
                     min: 0
                  })}
                  type="number" placeholder='¿Precio por persona?' autoComplete='off' min={0} />
            </div>
            {errors.price?.message && < FloatinNotification message={errors.price.message} />}

            <IconDiv icon1={chevronDown} justify='center' />

            <div className='formGroup'>
               <input
                  {...register('dateTime', {
                     required: 'Completa la fecha y hora de salida',
                     /* validate */
                  })} type="datetime-local" placeholder='¿Que dia?' autoComplete='off' />
            </div>
            {errors.dateTime?.message && < FloatinNotification message={errors.dateTime.message} />}

            <Button type='submit'>Crear viaje</Button>

         </form>
      </main>
   )
}
