import './UserDetailsPage.css'
import { useContext, useEffect } from 'react'
import { NotificationContext } from '../context/FloatinNotificationContext'
import useGetOneUser from '../hooks/useGetOneUser'
import { useForm } from 'react-hook-form'
import LoadingSpinner from '../components/LoadingSpinner'
import FloatinNotification from '../components/FloatinNotification'
import Button from '../components/Button'
import InputAvatar from '../components/InputAvatar'

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
      setValue('name', account.name)
      setValue('username', account.username)
      setValue('email', account.email)
      setValue('cellphone', account.cellphone)
   }, [account])

   return (
      <main className='container userDetailsPage'>
         <h2 className='title'>Detalles de la cuenta</h2>

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

               <div className="formGroup">
                  <label htmlFor="name">Nombre:</label>
                  <input
                     {...register('name', { required: true })}
                     type="text"
                  />
               </div>

               <div className="formGroup">
                  <label htmlFor="username">Username:</label>
                  <input
                     {...register('username', { required: true })}
                     type="text" />
               </div>
               <div className="formGroup">
                  <label htmlFor="email">Email:</label>
                  <input
                     {...register('email', { required: true })}
                     type="email" />
               </div>
               <div className="formGroup">
                  <label htmlFor="cellphone">Celular:</label>
                  <input
                     {...register('cellphone', { required: true })}
                     type="number" />
               </div>

               <Button type='submit'>Guardar cambios</Button>

            </form>
         }

      </main>
   )
}
