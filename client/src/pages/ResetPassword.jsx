import { useNavigate, useParams } from 'react-router-dom'
import './ResetPassword.css'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Header from '../components/Header'
import TextWithTitle from '../components/TextWithTitle'
import Button from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'
import { resetPassword } from '../services/login'
import ErrorMessage from '../components/ErrorMessage'
import { NotificationContext } from '../context/FloatinNotificationContext'
import eyeClose from '../assets/eye-slash.svg'
import eyeOpen from '../assets/eye-fill.svg'
import { REGEX_PASSWORD } from '../helpers/consts'
import FloatinNotification from '../components/FloatinNotification'

export default function ResetPassword() {
   const { isLoading, setIsLoading, floatingNotification, setFloatingNotification } = useContext(NotificationContext)
   const [showPassword, setShowPassword] = useState(false)
   const { token } = useParams()
   const navigate = useNavigate()
   const { register, handleSubmit, formState: { errors }, watch } = useForm()

   useEffect(() => {
      if (!token) {
         return navigate('/')
      }
   }, [token])

   const handleSubmitResetedPassword = async (data) => {
      setIsLoading(true)
      const { password } = data
      const body = { password, token }

      try {
         const updatedUser = await resetPassword(body)
         console.log({ updatedUser })
         setFloatingNotification({
            message: 'Todo ha salido bien. Ingresá con tu nueva contraseña',
            status: 'success',
            duration: 3000
         })
         navigate('/login')
      } catch (error) {
         console.log(error)
         setFloatingNotification({
            message: 'Lo siento, no hemos podido cambiar tu contraseña',
            status: 'error',
            duration: 3000
         })
      } finally {
         setIsLoading(false)
      }
   }

   const handleClickPassword = () => {
      setShowPassword(!showPassword)
   }
   const passwordType = showPassword ? 'text' : 'password'

   return (
      <>
         <Header />
         <main className='container ResetPassword'>

            <h2 className='subtitle'>Vamos bien! 👍</h2>
            <form onSubmit={handleSubmit(handleSubmitResetedPassword)}>
               <TextWithTitle title='Vamos a recuperar tu cuenta'>
                  <p>Ingresá tu nueva contraseña.</p>
               </TextWithTitle>

               {/* <input {...register('password', {
                  required: 'Por favor, introduce una contraseña',
                  validate: { regex: value => REGEX_PASSWORD.test(value) || 'La contraseña debe tener entre 8 y 16 caracteres, al menos una mayuscula, una minuscula y un numero', }
                  })} 
                  type="password" placeholder='Ingresá tu nueva contraseña'/>
               {errors.password?.message && < ErrorMessage errorMessage={errors.password?.message} />} */}
               <div className="formGroup">
                  <input
                     {...register('password', {
                        required: 'Por favor, introduce una contraseña',
                        validate: { regex: value => REGEX_PASSWORD.test(value) || 'La contraseña debe tener entre 8 y 16 caracteres, al menos una mayuscula, una minuscula y un numero', }
                  })}
                     type={passwordType} placeholder='Escribe tu contraseña' autoComplete='off' />
                  <div className='passwordHide-Show_container' onClick={handleClickPassword}>
                     {showPassword
                        ? <img className='hover' src={eyeClose} alt="ocultar contraseña" />
                        : <img className='hover' src={eyeOpen} alt="mostrar contraseña" />}
                  </div>
                  {errors.password?.message && < ErrorMessage errorMessage={errors.password?.message} />}
               </div>

               <TextWithTitle noTitle>
                  <p>Necesitamos con la ingreses nuevamente.</p>
               </TextWithTitle>

               <input {...register('repeatedPassword', {
                  required: 'Por favor, escribe nuevamente tu contraseña',
                  validate: value => value === watch('password') || 'Las contraseñas no coinciden'
               })}
                  type="password" placeholder='Repetí tu nueva contraseña' />
               {errors.repeatedPassword?.message && < ErrorMessage errorMessage={errors.repeatedPassword?.message} />}
               <Button type='submit' primary disabledButton={isLoading ?? false}>{isLoading ? < LoadingSpinner withoutText /> : 'Cambiar contraseña'}</Button>
            </form>
            {floatingNotification.message && < FloatinNotification message={floatingNotification.message} status={floatingNotification.status} duration={floatingNotification.duration} />}
         </main>

      </>
   )
}
