import './SingUpPage.css'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCreateUser from '../hooks/useCreateUser'
import { useForm } from 'react-hook-form'
import { NotificationContext } from '../context/FloatinNotificationContext'
import { UserContext } from '../context/UserContext'
import Button from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'
import FloatinNotification from '../components/FloatinNotification'
import InputAvatar from '../components/InputAvatar'


export default function SingUpPage() {
   const { user } = useContext(UserContext)
   const { floatingNotification, isLoading } = useContext(NotificationContext)
   const { register, handleSubmit, formState: {errors} } = useForm()
   const { handleCreateUser, handleAvatarChange, avatarPreview } = useCreateUser()
   const navigate = useNavigate()

   useEffect(() => {
      if (!user === null) {
         navigate('/login')
      }
   }, [])

   return (
      <main className='container singUpPage'>
         <form onSubmit={handleSubmit(handleCreateUser)}>
            <h2>Vamos a crear tu usuario</h2>
            <input 
               {...register('name', { required: true })}
               type="text" placeholder='tu nombre' autoComplete='off' />
            <input 
               {...register('email', { required: true })}
               type="email" placeholder='email' autoComplete='off' />
            <input 
               {...register('username', { required: true })}
               type="text" placeholder='tu username' autoComplete='off' />
            <input 
               {...register('password', { required: true })}
               type="password" placeholder='tu contraseña' autoComplete='off' />
            <input 
               {...register('repeatedPassword', {required: true })}
               type="password" placeholder='repite tu contraseña' autoComplete='off' />
            <input 
               {...register('cellphone', { required:true })}
               type="number" placeholder='celular' autoComplete='off' />
            
            < InputAvatar register={register} handleAvatarChange={handleAvatarChange} avatarPreview={avatarPreview} />

            <Button type='submit'>Crear usuario</Button>
            
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
   )
}