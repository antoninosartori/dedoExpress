import './SingUpPage.css'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCreateUser from '../hooks/useCreateUser'
import { NotificationContext } from '../context/FloatinNotificationContext'
import { UserContext } from '../context/UserContext'
import Button from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'
import FloatinNotification from '../components/FloatinNotification'
import defaultAvatar from '../assets/account.svg'


export default function SingUpPage() {
   const { user } = useContext(UserContext)
   const { floatingNotification, isLoading } = useContext(NotificationContext)
   const { 
      handleCreateUser, 
      handleChangeName, 
      handleChangeEmail, 
      handleChangeUsername,
      handleChangePassword, 
      handleChangeRepeatedPassword,
      handleChangeCellphone, 
      handleChangeAvatar, 
      avatarBase64 
   } = useCreateUser()
   const navigate = useNavigate()

   useEffect(() => {
      if (!user === null) {
         navigate('/login')
      }
   }, [])

   return (
      <main className='container singUpPage'>
         <form onSubmit={handleCreateUser}>
            <h2>Vamos a crear tu usuario</h2>
            <input type="text" placeholder='tu nombre' onChange={handleChangeName} autoComplete='off' />
            <input type="email" placeholder='email' onChange={handleChangeEmail} autoComplete='off' />
            <input type="text" placeholder='tu username' onChange={handleChangeUsername} autoComplete='off' />
            <input type="password" placeholder='tu contraseña' onChange={handleChangePassword} autoComplete='off' />
            <input type="password" placeholder='repite tu contraseña' onChange={handleChangeRepeatedPassword} autoComplete='off' />
            <input type="number" placeholder='celular' onChange={handleChangeCellphone} autoComplete='off' />
            <div className='inputFile-container'>
               <input type="file" name="avatar" onChange={handleChangeAvatar} />
               <img src={avatarBase64 ? avatarBase64 : defaultAvatar} alt="avatar de tu usuario" />
            </div>
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