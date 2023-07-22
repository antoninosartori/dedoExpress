import './UserDetailsPage.css'
import { useContext } from 'react'
import { NotificationContext } from '../context/FloatinNotificationContext'
import useGetOneUser from '../hooks/useGetOneUser'
import LoadingSpinner from '../components/LoadingSpinner'
import FloatinNotification from '../components/FloatinNotification'
import Button from '../components/Button'
import Toggable from '../components/Toggable'

export default function UserDetailsPage() {
   const { isLoading, floatingNotification } = useContext(NotificationContext)
   const { account,
      handleChangeCellphone,
      handleChangeEmail,
      handleChangeName,
      handleChangeUsername,
      handleChangeAvatar,
      handleSubmitUpdateAccount,
      name: nameState,
      username: usernameState,
      email: emailState,
      cellphone: cellphoneState,
      avatarBase64
   } = useGetOneUser()
   const { name, username, email, cellphone } = account

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
            <form onSubmit={handleSubmitUpdateAccount}>

               <div className='inputFile-container'>
                  <input type="file" name="avatar" onChange={handleChangeAvatar} />
                  <img src={avatarBase64} alt="avatar de tu usuario" />
               </div>

               <div className="formGroup">
                  <div className='formGroup-accountGroup'>
                     <span className='accountGroup-name'>Nombre:</span>
                     <span className='accountGroup-text'>{name}</span>
                  </div>
                  <Toggable text='cambiar' shownClassName='inputAccount'>
                     <input type="text" name='name' value={nameState} onChange={handleChangeName} placeholder='cambiar nombre' />
                  </Toggable>
               </div>

               <div className="formGroup">
                  <div className='formGroup-accountGroup'>
                     <span className='accountGroup-name'>Username:</span>
                     <span className='accountGroup-text'>{username}</span>
                  </div>
                  <Toggable text='cambiar' shownClassName='inputAccount'>
                     <input type="text" name='username' value={usernameState} onChange={handleChangeUsername} placeholder='cambiar username' />
                  </Toggable>
               </div>
               <div className="formGroup">
                  <div className='formGroup-accountGroup'>
                     <span className='accountGroup-name'>Email:</span>
                     <span className='accountGroup-text'>{email}</span>
                  </div>
                  <Toggable text='cambiar' shownClassName='inputAccount'>
                     <input type="email" name='email' value={emailState} onChange={handleChangeEmail} placeholder='cambiar email' />
                  </Toggable>
               </div>
               <div className="formGroup">
                  <div className='formGroup-accountGroup'>
                     <span className='accountGroup-name'>Celular:</span>
                     <span className='accountGroup-text'>{cellphone}</span>
                  </div>
                  <Toggable text='cambiar' shownClassName='inputAccount'>
                     <input type="number" name='cellphone' value={cellphoneState} onChange={handleChangeCellphone} placeholder='cambiar numero de celular' />
                  </Toggable>
               </div>

               <Button type='submit'>Guardar cambios</Button>


            </form>
         }

      </main>
   )
}
