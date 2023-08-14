import './UserDetailsPage.css'
import { useContext, useEffect } from 'react'
import { NotificationContext } from '../context/FloatinNotificationContext'
import useGetOneUser from '../hooks/useGetOneUser'
import { useForm } from 'react-hook-form'
import LoadingSpinner from '../components/LoadingSpinner'
import FloatinNotification from '../components/FloatinNotification'
import Header from '../components/Header'
import Button from '../components/Button'
import InputAvatar from '../components/InputAvatar'
import { REGEX_EMAIL } from '../helpers/consts'
import ErrorMessage from '../components/ErrorMessage'
import { Link } from 'react-router-dom'

export default function UserDetailsPage() {
   const { isLoading, floatingNotification } = useContext(NotificationContext)
   const {
      account,
      handleAvatarChange,
      handleSubmitUpdateAccount,
      avatarPreview
   } = useGetOneUser()
   const { register, handleSubmit, formState: { errors }, setValue } = useForm()

   useEffect(() => {
      window.scrollTo(0, 0)
   }, [])

   useEffect(() => {
      setValue('name', account.name)
      setValue('username', account.username)
      setValue('email', account.email)
      setValue('cellphone', account.cellphone)
   }, [account])

   return (
      <>
         < Header />
         <main className='container userDetailsPage'>
            <h2 className='subtitle'>Detalles de la cuenta</h2>

            {isLoading && < LoadingSpinner text='cargando detalles...' />}
            {floatingNotification.message &&
               < FloatinNotification
                  message={floatingNotification.message}
                  status={floatingNotification.status}
                  duration={floatingNotification.duration}
               />
            }

            {
               !isLoading &&
               <form onSubmit={handleSubmit(handleSubmitUpdateAccount)}>

                  <InputAvatar register={register} handleAvatarChange={handleAvatarChange} avatarPreview={avatarPreview} />
                  {errors.avatar?.message && < ErrorMessage errorMessage={errors.avatar?.message} />}

                  <div className="formGroup">
                     <label htmlFor="name">Nombre:</label>
                     <input
                        {...register('name', {
                           required: 'El campo del nombre esta vacio',
                           minLength: { value: 3, message: 'El campo del nombre debe ser mayor a 3 caracteres' },
                           maxLength: { value: 30, message: 'El campo del nombre debe ser menor a 30 caracteres' }
                        })}
                        type="text"
                     />
                  </div>
                  {errors.name?.message && < ErrorMessage errorMessage={errors.name?.message} />}

                  <div className="formGroup">
                     <label htmlFor="username">Username:</label>
                     <input
                        {...register('username', {
                           required: 'El campo del username esta vacio',
                           minLength: { value: 3, message: 'El campo del username debe ser mayor a 3 caracteres' },
                           maxLength: { value: 30, message: 'El campo del username debe ser menor a 30 caracteres' }
                        })}
                        type="text" />
                  </div>
                  {errors.username?.message && < ErrorMessage errorMessage={errors.username?.message} />}

                  <div className="formGroup">
                     <label htmlFor="email">Email:</label>
                     <input
                        {...register('email', {
                           required: 'El campo del email esta vacio',
                           pattern: {
                              value: REGEX_EMAIL,
                              message: 'Debes introducir un email valido'
                           }
                        })}
                        type="email" />
                  </div>
                  {errors.email?.message && <ErrorMessage errorMessage={errors.email?.message} />}

                  <div className="formGroup">
                     <label htmlFor="cellphone">Celular:</label>
                     <input
                        {...register('cellphone', {
                           required: 'Ingresa un numero de telefono',
                           maxLength: { value: 10, message: 'El numero de telefono no puede tener mas de 10 digitos' },
                           minLength: { value: 10, message: 'El numero de telefono no puede tener menos de 10 digitos' }
                        })}
                        type="number" />
                  </div>
                  {errors.cellphone?.message && < ErrorMessage errorMessage={errors.cellphone?.message} />}

                  <Button type='button' secondary>
                     <Link className='changePassword-link' to={`/user/${account?._id}/changePassword`}>Cambiar contraseña</Link>
                  </Button>

                  <Button primary type='submit'>Guardar cambios</Button>
               </form>
            }

         </main>
      </>
   )
}
