import './ForgottenPassword.css'
import Header from '../components/Header'
import TextWithTitle from '../components/TextWithTitle'
import Button from '../components/Button'
import { useForm } from 'react-hook-form'
import { REGEX_EMAIL } from '../helpers/consts'
import { useContext } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { askCodeToResetPassword } from '../services/login'
import { NotificationContext } from "../context/FloatinNotificationContext";
import FloatinNotification from '../components/FloatinNotification'
import ErrorMessage from '../components/ErrorMessage'

export default function ForgottenPassword() {
   const { register, handleSubmit, formState: { errors } } = useForm()
   const { isLoading, setIsLoading, floatingNotification, setFloatingNotification, } = useContext(NotificationContext)

   const handleResetPassword = async (data) => {
      setIsLoading(true)
      const { email } = data
         const credentials = { 
            email: email.trim(),
         }
      
      try {
         const results = await askCodeToResetPassword(credentials)
         console.log(results)
         setFloatingNotification({
            message: 'Se ha enviado las instrucciones a seguir al email indicado.',
            status: 'success',
            duration: 3000
         })
      } catch (error) {
         console.log(error)
         setFloatingNotification({
            message: 'Lo siento, ha ocurrido un error. Intente nuevamente',
            status: 'error',
            duration: 3000
         })
      } finally{
         setIsLoading(false)
      }
   }

   return (
      <>
         <Header />
         <main className='container forgottenPassword'>

            <h2 className='subtitle'>Reestablecer contraseña</h2>
            <form onSubmit={handleSubmit(handleResetPassword)}>
               <TextWithTitle title='Vamos a recuperar tu cuenta'>
                  <p>Te enviaremos los pasos a seguir por correo electrónico</p>
               </TextWithTitle>
               <input  
                  {...register('email', {
                     required: 'Completá con tu email',
                     pattern: {
                        value: REGEX_EMAIL,
                        message: 'Debes introducir un email válido'
                     }
                  })}
                  type="email" placeholder='Escribe tu email'
                  />
                  {errors.email?.message && < ErrorMessage errorMessage={errors.email?.message} />}
               <Button type='submit' primary >Recuperar</Button>
               {isLoading && < LoadingSpinner withoutText />}
               {floatingNotification.message &&
               < FloatinNotification
                  message={floatingNotification.message}
                  status={floatingNotification.status}
                  duration={floatingNotification.duration}
               />
            }
               
            </form>
         </main>
      </>
   )
}

