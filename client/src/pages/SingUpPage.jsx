import './SingUpPage.css'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCreateUser from '../hooks/useCreateUser'
import { useForm } from 'react-hook-form'
import { NotificationContext } from '../context/FloatinNotificationContext'
import { UserContext } from '../context/UserContext'
import Button from '../components/Button'
import Header from '../components/Header'
import LoadingSpinner from '../components/LoadingSpinner'
import FloatinNotification from '../components/FloatinNotification'
import InputAvatar from '../components/InputAvatar'
import { REGEX_EMAIL, REGEX_PASSWORD } from '../helpers/consts'
import TextWithTitle from '../components/TextWithTitle'

export default function SingUpPage() {
   const { user } = useContext(UserContext)
   const { floatingNotification, isLoading } = useContext(NotificationContext)
   const { register, handleSubmit, formState: { errors }, watch } = useForm()
   const { handleCreateUser, handleAvatarChange, avatarPreview } = useCreateUser()
   const navigate = useNavigate()

   useEffect(() => {
      if (!user === null) {
         navigate('/login')
      }
   }, [])

   return (
      <>
         <Header />
         <main className='container singUpPage'>
            <h2 className='subtitle'>Crear una cuenta</h2>
            <form onSubmit={handleSubmit(handleCreateUser)}>
               <div className='form-separator'>
                  <input
                     {...register('email', {
                        required: 'El campo del email esta vacio',
                        pattern: {
                           value: REGEX_EMAIL,
                           message: 'Debes introducir un email valido'
                        }
                     })}
                     type="email" placeholder='Ingresá tu correo' autoComplete='off' />
                  {errors.email?.message && < FloatinNotification message={errors.email.message} />}

                  <input
                     {...register('username', {
                        required: 'El campo del username esta vacio',
                        minLength: { value: 3, message: 'El campo del username debe ser mayor a 3 caracteres' },
                        maxLength: { value: 30, message: 'El campo del username debe ser menor a 30 caracteres' }
                     })}
                     type="text" placeholder='Ingresá tu usuario' autoComplete='off' />
                  {errors.username?.message && < FloatinNotification message={errors.username.message} />}

                  <input
                     {...register('password', {
                        required: 'Por favor, introduce una contraseña',
                        validate: value => REGEX_PASSWORD.test(value) || 'La contraseña debe tener entre 8 y 16 caracteres, al menos una mayuscula, una minuscula y un numero'
                     })}
                     type="password" placeholder='Ingresá tu contraseña' autoComplete='off' />
                  {errors.password?.message && < FloatinNotification message={errors.password.message} />}

                  <input
                     {...register('repeatedPassword', {
                        required: 'Por favor, escribe nuevamente tu contraseña',
                        validate: value => value === watch('password') || 'Las contraseñas no coinciden'
                     })}
                     type="password" placeholder='Repetí tu contraseña' autoComplete='off' />
                  {errors.repeatedPassword?.message && < FloatinNotification message={errors.repeatedPassword.message} />}

               </div>

               <div className='form-separator'>
                  <TextWithTitle title='Datos del perfil'>
                     <p className='textWithTitle-text'>Estos datos le servirán a las personas para contactarte cuando publiques un viaje.</p>
                  </TextWithTitle>
                 
                  <input
                     {...register('name', {
                        required: 'El campo del nombre esta vacio',
                        minLength: { value: 3, message: 'El campo del nombre debe ser mayor a 3 caracteres' },
                        maxLength: { value: 30, message: 'El campo del nombre debe ser menor a 30 caracteres' }
                     })}
                     type="text" placeholder='Ingresá tu nombre' autoComplete='off' autoFocus />
                  {errors.name?.message && < FloatinNotification message={errors.name.message} />}

                  <input
                     {...register('cellphone', {
                        required: 'Ingresa un numero de telefono',
                        maxLength: { value: 10, message: 'El numero de telefono no puede tener mas de 10 digitos' },
                        minLength: { value: 10, message: 'El numero de telefono no puede tener menos de 10 digitos' }
                     })}
                     type="number" placeholder='Ingresá tu número de celular' autoComplete='off' />
                  {errors.cellphone?.message && < FloatinNotification message={errors.cellphone.message} />}

                  < InputAvatar register={register} handleAvatarChange={handleAvatarChange} avatarPreview={avatarPreview} />
                  {errors.avatar?.message && < FloatinNotification message={errors.avatar.message} />}

               </div>

               <Button primary type='submit'>Crear cuenta</Button>

               {isLoading && < LoadingSpinner text='creando usuario...' />}
            </form>

            {floatingNotification.message &&
               < FloatinNotification
                  message={floatingNotification.message}
                  status={floatingNotification.status}
                  duration={floatingNotification.duration}
               />
            }
         </main>
      </>
   )
}