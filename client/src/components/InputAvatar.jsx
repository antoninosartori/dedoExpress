import './InputAvatar.css'
import defaultAvatar from '../assets/account.svg'

export default function InputAvatar({ register, handleAvatarChange, avatarPreview }) {
   return (
      <div className='inputFile-container'>
         <input
            {...register('avatar', { required: true })}
            type="file"
            onChange={handleAvatarChange} />
         <img src={avatarPreview ? avatarPreview : defaultAvatar} alt="avatar de tu usuario" />
      </div>
   )
}