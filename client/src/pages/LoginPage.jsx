import './LoginPage.css'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { NotificationContext } from '../context/FloatinNotificationContext'
import useLoginForm from '../hooks/useLoginForm'
import { useForm } from 'react-hook-form'
import Button from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'
import FloatinNotification from '../components/FloatinNotification'
import eyeClose from '../assets/eye-slash.svg'
import eyeOpen from '../assets/eye-fill.svg'


export default function LoginPage() {
   const { user } = useContext(UserContext)
   const { floatingNotification, isLoading } = useContext(NotificationContext)
   const { register, handleSubmit, formState: { errors } } = useForm()
   const { handleLogin } = useLoginForm();
   const navigate = useNavigate()
   const [showPassword, setShowPassword] = useState(false)

   const handleClickPassword = () => {
      setShowPassword(!showPassword)
   }
   const passwordType = showPassword ? 'text' : 'password'
  
   useEffect(() => {
      if (user !== null) {
         navigate('/')
      }
   }, [user])


   return (
      <main className='container loginPage'>

         <section className='loginPage-section'>

            <form onSubmit={handleSubmit(handleLogin)}>
               <h2>Iniciar sesion</h2>
               <input
                  {...register('username', {
                     required: true
                  })}
                  type="text" placeholder='Escribe tu usuario' autoComplete='off' autoFocus />
                  
               <div className="formGroup">
                  <input
                     {...register('password', {
                        required: true
                     })}
                     type={passwordType} placeholder='Escribe tu contraseña' autoComplete='off' />
                  <div className='passwordHide-Show_container' onClick={handleClickPassword}>
                     {showPassword
                        ? <img src={eyeClose} alt="ocultar contraseña" />
                        : <img src={eyeOpen} alt="mostrar contraseña" />}
                  </div>
               </div>
               <Button type='submit'>Ingresar</Button>

               <Link className='linkToSingUp' to='/singUp'>
                  <p>¿No tienes cuenta? <strong>¡Registrate!</strong></p>
               </Link>

               {isLoading && < LoadingSpinner text='iniciando sesion...' />}
               {floatingNotification.message && < FloatinNotification message={floatingNotification.message} status={floatingNotification.status} duration={floatingNotification.duration} />}
               {errors.username?.type === 'required' && < FloatinNotification message='Debes ingresar un nombre de usuario' />}
               {errors.password?.type === 'required' && < FloatinNotification message='Debes ingresar una contraseña' />}
            </form>

         </section>

      </main>
   )
}

