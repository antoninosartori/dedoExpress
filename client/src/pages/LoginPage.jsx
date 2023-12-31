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
import thermoIcon from '../assets/thermo.svg'

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
      window.scrollTo(0, 0)
   }, [])

   useEffect(() => {
      if (user !== null) {
         navigate('/')
      }
   }, [user])
    
   return (
      <main className='container loginPage'>
         
         <header>
            <h1 className='title'>Dedo<span>Express</span></h1>
            <img src={thermoIcon} alt="imagen de mate" />
            <p>Compartí y <span>viajá</span></p>
         </header>

         <form onSubmit={handleSubmit(handleLogin)}>

            <input
               {...register('email', {
                  required: true
               })}
               type="text" placeholder='Escribe tu email' autoComplete='off' />

            <div className="formGroup">
               <input
                  {...register('password', {
                     required: true
                  })}
                  type={passwordType} placeholder='Escribe tu contraseña' autoComplete='off' />
               <div className='passwordHide-Show_container' onClick={handleClickPassword}>
                  {showPassword
                     ? <img className='hover' src={eyeClose} alt="ocultar contraseña" />
                     : <img className='hover' src={eyeOpen} alt="mostrar contraseña" />}
               </div>
            </div>

            <Button primary type='submit' disabledButton={isLoading ?? false}>{isLoading ? < LoadingSpinner withoutText /> : 'Iniciar sesión'}</Button>

            <Link to='/forgotten-password'>
               <p>¿Olvidaste tu contraseña?</p>
            </Link>
         </form>

         <div className='loginPage-toSingUpButtonContainer'>
            <p>¿No tienes una cuenta?</p>
            <Button type='button' secondary>
               <Link to='/singUp'>Crear una cuenta</Link>
            </Button>
         </div>



         {floatingNotification.message && < FloatinNotification message={floatingNotification.message} status={floatingNotification.status} duration={floatingNotification.duration} />}
         {errors.email?.type === 'required' && < FloatinNotification message='Debes ingresar un email' />}
         {errors.password?.type === 'required' && < FloatinNotification message='Debes ingresar una contraseña' />}
      </main>

   )
}

