import './ChangePasswordPage.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { REGEX_PASSWORD } from '../helpers/consts'
import { changePassword } from '../services/login'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NotificationContext } from '../context/FloatinNotificationContext'
import ErrorMessage from '../components/ErrorMessage'
import Button from '../components/Button'
import TextWithTitle from '../components/TextWithTitle'
import Header from '../components/Header'
import LoadingSpinner from '../components/LoadingSpinner'
import FloatinNotification from '../components/FloatinNotification'

export default function ChangePasswordPage() {
   const { user } = useContext(UserContext)
   const { setFloatingNotification, setIsLoading, floatingNotification, isLoading } = useContext(NotificationContext)
   const { register, handleSubmit, formState: { errors }, watch } = useForm()
   const params = useParams()
   const { userId } = params
   const navigate = useNavigate()

   const handleChangePassword = async (data) => {
      setIsLoading(true)
      const { actualPassword, newPassword } = data
      const body = { actualPassword, newPassword }

      const token = user !== null ? user.token : null

      const credential = {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }

      try {
         await changePassword(userId, body, credential)
         setFloatingNotification({message: 'Contraseña cambiada correctamente', status: 'success'})
         setIsLoading(false)
         navigate(`/user/${userId}`)
      } catch (err) {
         console.log(err)
         setFloatingNotification({message: 'Lo siento, no hemos podido cambiar tu contraseña'})
         setIsLoading(false)
      }
   }

   return (
      <>
         < Header />
         <main className='container changePasswordPage'>
            <h2 className='subtitle'>Cambiar contraseña</h2>
            <TextWithTitle title='Pasos para modificarla'>
               <p className='textWithTitle-text'>Te vamos a pedir que ingreses tu contraseña actual</p>
               <p className='textWithTitle-text'>Después ingresá tu nueva contraseña</p>
            </TextWithTitle>

            <form onSubmit={handleSubmit(handleChangePassword)}>
               <input {...register('actualPassword', {
                  required: 'Por favor, introduce una contraseña'
                  })} 
                  type="password" placeholder='Ingresá tu contraseña actual' />
               {errors.actualPassword?.message && < ErrorMessage errorMessage={errors.actualPassword?.message} />}

               <input {...register('newPassword', {
                  required: 'Por favor, introduce una contraseña',
                  validate: { regex: value => REGEX_PASSWORD.test(value) || 'La contraseña debe tener entre 8 y 16 caracteres, al menos una mayuscula, una minuscula y un numero', 
                     samePassword: value => value !== watch('actualPassword') || 'Tu nueva contraseña debe ser distinta a la actual'
                  }
               })} 
                  type="password" placeholder='Ingresá tu nueva contraseña'/>
               {errors.newPassword?.message && < ErrorMessage errorMessage={errors.newPassword?.message} />}

               <input {...register('repeatedNewPassword', {
                  required: 'Por favor, escribe nuevamente tu contraseña',
                  validate: value => value === watch('newPassword') || 'Las contraseñas no coinciden'
               })} 
                  type="password" placeholder='Repetí tu nueva contraseña'/>
               {errors.repeatedNewPassword?.message && < ErrorMessage errorMessage={errors.repeatedNewPassword?.message} />}

               <Button primary type='submit'>Cambiar contraseña</Button>
               <Button onClickFunction={() => {navigate(-1)}} secondary type='button'>Volver atrás</Button>

            </form>
            {isLoading && < LoadingSpinner text='creando viaje...' />}

            {floatingNotification.message &&
               < FloatinNotification
                  message={floatingNotification.message}
                  duration={floatingNotification.duration}
               />
            }
         </main>
      </>
   )
}
