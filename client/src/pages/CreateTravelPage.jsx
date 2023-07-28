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
         {
            errors.from?.type === 'required' 
            || errors.to?.type === 'required'
            || errors.capacity?.type === 'required'
            || errors.price?.type === 'required'
            || errors.dateTime?.type === 'required'
            && < FloatinNotification message='Por favor, completa todos los campos' />
         }
         <form onSubmit={handleSubmit(handleCreateTravel)}>

            <img className='header-image' src={titleIcon} alt="icono del form" />
            <h2>Crea tu viaje</h2>

            <div className="formGroup">
               <img className='icon' src={fromIcon} alt="desde donde" />
               <input
                  {...register('from', {
                     required: true,
                     maxLength: 30,
                     minLength: 3
                  })} type='text' placeholder='¿De donde salis?' autoComplete='off' />
            </div>

            <IconDiv icon1={chevronDown} justify='center' />

            <div className="formGroup">
               <img className='icon' src={toIcon} alt="hasta donde" />
               <input
                  {...register('to', {
                     required: true,
                     maxLength: 30,
                     minLength: 3
                  })} type="text" placeholder='¿Donde vas?' autoComplete='off'
               />
            </div>

            <IconDiv icon1={chevronDown} justify='center' />

            <div className="formGroup">
               <img className='icon' src={capacityIcon} alt="cuantos podes llevar" />
               <input
                  {...register('capacity', {
                     required: true,
                     min: 1,
                     max: 10
                  })} type="number" placeholder='¿Lugares disponibles?' autoComplete='off' min={1}
               />
            </div>

            <IconDiv icon1={chevronDown} justify='center' />

            <div className="formGroup">
               <img className='icon' src={priceIcon} alt="precio por persona" />
               <input
                  {...register('price', {
                     required: true,
                     max: 50000,
                     min: 0
                  })}
                  type="number" placeholder='¿Precio por persona?' autoComplete='off' min={0} />
            </div>

            <IconDiv icon1={chevronDown} justify='center' />

            <div className='formGroup'>
               <input
                  {...register('dateTime', {
                     required: true,
                     /* validate */
                  })} type="datetime-local" placeholder='¿Que dia?' autoComplete='off' />
            </div>

            <Button type='submit'>Crear viaje</Button>

         </form>
      </main>
   )
}
