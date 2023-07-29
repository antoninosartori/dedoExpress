import './InputAvatar.css'
import defaultAvatar from '../assets/account.svg'
import FloatinNotification from './FloatinNotification'

export default function InputAvatar({ register, handleAvatarChange, avatarPreview }) {
   return (
      <div className='inputFile-container'>
         <input
            {...register('avatar', { required: 'Por favor, ingresa una foto de perfil' })}
            type="file"
            onChange={handleAvatarChange} />
         <img src={avatarPreview ? avatarPreview : defaultAvatar} alt="avatar de tu usuario" />
         
      </div>
   )
}